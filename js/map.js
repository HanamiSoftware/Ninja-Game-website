// map.js
(function () {
    'use strict';

    // --- Dati simulati ---
    const events = [
        { lat: 41.9, lng: 12.49, time: 1710000000 },  // Roma
        { lat: 52.52, lng: 13.40, time: 1710000020 }, // Berlino
        { lat: 40.71, lng: -74.00, time: 1710000100 },// New York
        { lat: 34.05, lng: -118.24, time: 1710000150 }, // Los Angeles
        { lat: 35.68, lng: 139.75, time: 1710000155 }, //Tokio
        { lat: 46.94809, lng: 7.44744, time: 1773000005100 } // Berna
    ];

    // --- Utility: Haversine distance (km) ---
    function distanceKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // --- Calcolo velocità e colori ---
    function propagationSpeed(prev, current) {
        const dist = distanceKm(prev.lat, prev.lng, current.lat, current.lng);
        const time = Math.max(1, current.time - prev.time); // protezione divisione per 0
        return dist / time; // km/s
    }

    function speedColor(speed) {
        if (speed < 1) return "#0000ff";
        if (speed < 5) return "#00ff00";
        return "#0000FF";
    }

    function spreadLevel(distance) {
        if (distance < 1000) return "Regionale";
        if (distance < 5000) return "Internazionale";
        return "Mondiale";
    }

    // --- Inizializzazione mappa ---
    const map = L.map('map', { zoomControl: false }).setView([20, 0], 2);
    const bounds = L.latLngBounds(events.map(e => [e.lat, e.lng]));
    if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] });
    }

    // Outline dei continenti (geojson)
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
        .then(res => res.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    color: '#ffffff',
                    weight: 1,
                    fillOpacity: 0
                },
            }).addTo(map);
        })
        .catch(() => { /* silenzia errori di rete */ });

    // --- Stato globale ---
    let previous = null;
    let totalDistance = 0;

    // Pulses animati: manteniamo un singolo RAF loop per tutte le pulse
    const pulses = [];

    function startPulseAnimationLoop() {
        let rafId = null;

        function tick(now) {
            if (pulses.length === 0) {
                rafId = requestAnimationFrame(tick); // continuiamo comunque per semplicità
                return;
            }

            for (let i = pulses.length - 1; i >= 0; i--) {
                const p = pulses[i];
                const elapsed = now - p.start;
                const t = Math.min(1, elapsed / p.duration);
                const radius = p.startR + (p.maxR - p.startR) * t;
                const opacity = p.startOpacity * (1 - t);

                p.layer.setRadius(radius);
                p.layer.setStyle({
                    opacity: opacity,
                    fillOpacity: opacity
                });

                if (t >= 1) {
                    try { map.removeLayer(p.layer); } catch (e) { /* ignorare */ }
                    pulses.splice(i, 1);
                }
            }

            rafId = requestAnimationFrame(tick);
        }

        rafId = requestAnimationFrame(tick);
    }

    startPulseAnimationLoop();

    // Disegna un punto e avvia una pulse animata
    function drawPoint(lat, lng, options = {}) {
        const base = {
            dotRadius: 3,
            dotColor: "#fa4d41",
            pulseStartR: 6,
            pulseMaxR: 30,
            pulseOpacity: 0.6,
            pulseDuration: 3600 // ms
        };
        const cfg = Object.assign({}, base, options);

        // punto centrale (fisso)
        L.circleMarker([lat, lng], {
            radius: cfg.dotRadius,
            color: cfg.dotColor,
            weight: 2,
            fillColor: cfg.dotColor,
            fillOpacity: 1
        }).addTo(map);

        // pulse (layer animato)
        const pulseLayer = L.circleMarker([lat, lng], {
            radius: cfg.pulseStartR,
            color: cfg.dotColor,
            weight: 2,
            fillColor: cfg.dotColor,
            fillOpacity: cfg.pulseOpacity,
            opacity: cfg.pulseOpacity
        }).addTo(map);

        pulses.push({
            layer: pulseLayer,
            start: performance.now(),
            duration: cfg.pulseDuration,
            startR: cfg.pulseStartR,
            maxR: cfg.pulseMaxR,
            startOpacity: cfg.pulseOpacity
        });
    }

    function drawLine(prev, curr) {
        const speed = propagationSpeed(prev, curr);
        const color = speedColor(speed);

        totalDistance += distanceKm(prev.lat, prev.lng, curr.lat, curr.lng);

        const spreadEl = document.getElementById('spread');
        const levelEl = document.getElementById('level');
        if (spreadEl) {
            spreadEl.innerText = `Diffusione Globale: ${Math.round(totalDistance)} km`;
        }
        if (levelEl) {
            levelEl.innerText = `Livello di Propagazione: ${spreadLevel(totalDistance)}`;
        }

        L.polyline.antPath([[prev.lat, prev.lng], [curr.lat, curr.lng]], {
            color: color,
            weight: 3,
            opacity: 0.7
        }).addTo(map);
    }

    // --- Replay / Emissione punti ---
    // Qui si emettono i punti in sequenza (una versione più realistica rispetto a sparare tutti insieme)
    (function playEventsSequentially() {
        let i = 0;
        const tickMs = 1200;

        const interval = setInterval(() => {
            const event = events[i % events.length];
            drawPoint(event.lat, event.lng);
            if (previous) {
                //drawLine(previous, event);
            }
            previous = event;
            i++;
            // se vuoi interrompere dopo una passata:
            //if (i >= events.length) clearInterval(interval);
        }, tickMs);
    })();

})();