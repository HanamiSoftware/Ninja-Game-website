/*!
 * sakuraAnimation.js
 * Plugin jQuery per animazione lettera-per-lettera con luce pulsante.
 * Testo di default: 「桜の季節へようこそ」
 * 
 * Licenza: MIT
 * Autore: Hanami Software
 */

; (function ($) {
    'use strict';

    /**
     * Costruttore della classe SakuraAnimation
     * @param {HTMLElement} element - Elemento DOM da animare
     * @param {Object} options - Opzioni di configurazione
     */
    function SakuraAnimation(element, options) {
        this.$element = $(element);
        this.settings = $.extend({}, $.fn.sakuraAnimation.defaults, options);
        this._init();
    }

    SakuraAnimation.prototype = {
        /**
         * Inizializza il plugin
         */
        _init: function () {
            this.text = this.settings.text;
            this.speed = this.settings.speed;
            this.glowColor = this.settings.glowColor;
            this.targetFadeIn = this.settings.targetFadeIn ? $(this.settings.targetFadeIn) : null;
            this.onComplete = this.settings.onComplete;
            this.fontSize = this.settings.fontSize;
            this.delayToFadein = this.settings.delayToFadein;

            this.currentIndex = 0;
            this.letters = [];
            this.startTime = null;
            this.animationId = null;

            this._prepareText();
            this._startAnimation();
        },

        /**
         * Prepara il testo dividendo in span lettere con classe e style
         */
        _prepareText: function () {
            this.$element.empty();
            for (let char of this.text) {
                let $span = $('<span></span>').text(char).css({
                    opacity: 0,
                    color: '#fff',
                    textShadow: 'none',
                    transition: 'opacity 0.3s ease',
                    fontSize: this.settings.fontSize
                });
                this.letters.push($span);
                this.$element.append($span);
            }
        },

        /**
         * Calcola valore luminosità pulsante con funzione coseno
         * @param {number} t - Tempo in millisecondi
         * @returns {number} - Valore tra 0 e 1
         */
        _calcGlowIntensity: function (t) {
            // Pulsazione lenta con oscillazione coseno da 0 a 1, moltiplicata per 0.5 e spostata a 0.5 per rimanere positiva
            return 0.5 + 0.5 * Math.cos(t / 500);
        },

        /**
         * Calcola velocità dinamica in base al tempo trascorso dall'inizio (smoothing sqrt e log)
         * @param {number} elapsed - Tempo trascorso in ms
         * @returns {number} velocità modificata
         */
        _calcDynamicSpeed: function (elapsed) {
            // Esempio combinato sqrt e log per velocità adattiva
            return this.speed * (1 + Math.sqrt(elapsed / 1000)) / (1 + Math.log(elapsed / 1000 + 1));
        },

        /**
         * Funzione di animazione, chiamata via requestAnimationFrame
         * @param {DOMHighResTimeStamp} timestamp 
         */
        _animate: function (timestamp) {
            if (!this.startTime) this.startTime = timestamp;
            let elapsed = timestamp - this.startTime;

            // Mostra lettera corrente
            if (this.currentIndex < this.letters.length) {
                let dynamicSpeed = this._calcDynamicSpeed(elapsed) * 1000; // convert sec a ms

                // Se è passato abbastanza tempo mostro la lettera successiva
                if (elapsed > dynamicSpeed * this.currentIndex) {
                    let $letter = this.letters[this.currentIndex];
                    $letter.css('opacity', 1);
                    this.currentIndex++;
                }
            }

            // Aggiorna glow pulsante su tutte le lettere già mostrate
            let glowIntensity = this._calcGlowIntensity(elapsed);
            let glowStrength = glowIntensity * 15; // 0-15px spread
            for (let i = 0; i < this.currentIndex; i++) {
                this.letters[i].css('textShadow', `0 0 ${glowStrength}px ${this.glowColor}`);
            }

            if (this.currentIndex < this.letters.length) {
                this.animationId = requestAnimationFrame(this._animate.bind(this));
            } else {
                this._finishAnimation();
            }
        },

        /**
         * Termina l'animazione con fadeout/fadein e callback/evento
         */
        _finishAnimation: function () {
            let self = this;
                // Dopo la transizione, esegui il fade out
            this.$element.delay(this.settings.delayToFadein).fadeOut(600, function () {
                    if (self.targetFadeIn) {
                        self.targetFadeIn.fadeIn(600);
                    }
                    if (typeof self.onComplete === 'function') {
                        self.onComplete.call(self.$element[0]);
                    }
                    self.$element.trigger('sakuraAnimationComplete');
                });
        },

        /**
         * Avvia l'animazione
         */
        _startAnimation: function () {
            this.animationId = requestAnimationFrame(this._animate.bind(this));
        }
    };

    /**
     * Plugin jQuery sakuraAnimation
     * @param {Object} options - Opzioni per personalizzare l'animazione
     */
    $.fn.sakuraAnimation = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_sakuraAnimation')) {
                $.data(this, 'plugin_sakuraAnimation', new SakuraAnimation(this, options));
            }
        });
    };

    /**
     * Default options
     */
    $.fn.sakuraAnimation.defaults = {
        text: "桜の季節へようこそ",
        speed: 0.05,           // secondi per lettera
        fontSize: '3rem',
        glowColor: '#FB4E41',
        delayToFadein: 1000, // millisecondi prima di eseguire fadeIn su targetFadeIn
        targetFadeIn: null,
        onComplete: null
    };

})(jQuery);