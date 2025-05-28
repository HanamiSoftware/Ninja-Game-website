
---

## Tecnologie utilizzate

- **HTML5**
- **CSS3**
- **Font**: [Viga](https://fonts.google.com/specimen/Viga) (titoli), [Zen Kaku Gothic New](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New) (testi)
- **Immagini**: PNG con trasparenza + SVG per logo e icone social
- **Mobile-first design** con media query fino a 768px

---

## � Linee guida per l’implementazione

### Background
- Gradiente radiale rosso al centro su sfondo --background-neutral-primary (`#121212`).
- Due alberi di ciliegio posizionati:
  - `top-left`: in alto a sinistra.
  - `bottom-right`: in basso a destra.
- Le immagini si ridimensionano su mobile per evitare sovrapposizioni.

### Componenti principali
- **Logo** SVG centrato in alto.
- **Titolo** `COMING SOON` in --heading-desktop-h1 (Viga - 56px).
- **Sottotitolo** con messaggio teaser in --text-regular-medium (Zen Kaku Gothic New - 16px).
- **Form email** con input e bottone.
- **Link social** in fondo.
- **Footer** con testo "HANAMI SOFTWARE – Contact us" in --tagline.

---

## Responsive
Il layout si adatta automaticamente su dispositivi mobili:
- Gli alberi si ridimensionano (`max-width: 45vw`).
- Il form diventa verticale.
- Il logo e il titolo si scalano per migliorare la leggibilità.

---

## Task futuri (opzionali)

- [ ] Collegare il form a un servizio (es. Mailchimp, Firebase, Formspree).
- [ ] Aggiungere effetti di fade-in / scroll reveal.
- [ ] Gestione accessibilità (es. `aria-label` e focus states).

---


