# 🥷 Ninja Game – Sito Ufficiale

[![Deploy Status](https://img.shields.io/badge/deploy-automatic-green?style=flat-square)](#)
[![AWS Serverless](https://img.shields.io/badge/backend-AWS_Lambda_|_API_Gateway_|_DynamoDB_|_Aurora-yellow?style=flat-square&logo=amazon-aws)](#)

Benvenuti nel repository del sito ufficiale di **Ninja Game**, un gioco indie in sviluppo. Il sito rappresenta il centro nevralgico della nostra community e offre accesso a contenuti esclusivi, funzionalità interattive e aggiornamenti sullo sviluppo.

---

## 🌐 Architettura e Tecnologie

Il sito sfrutta un'infrastruttura **completamente serverless** su AWS per garantire scalabilità, affidabilità e costi contenuti.

### 🔸 Frontend
- **Hosting:** Amazon S3 + CloudFront
- **Tecnologie:** HTML, CSS, JavaScript
- **Deploy:** Manuale o automatico via CI/CD (GitHub Actions, opzionale)

### 🔸 Backend Serverless su AWS
- **Amazon API Gateway** – Espone gli endpoint REST
- **AWS Lambda** – Business logic serverless
- **Amazon DynamoDB** – Database NoSQL per dati temporanei e sessioni
- **Amazon Aurora MySQL** – Database relazionale per contenuti persistenti

---

## 🔐 Sicurezza

- Endpoint accessibili solo tramite chiamate controllate da client autorizzati
- Header o token custom per endpoint protetti
- Il backend è **invisibile all’utente finale**, con chiamate gestite da script interni non documentati pubblicamente

---

## 📁 Struttura del Repository

```plaintext
/
├── index.html           # Pagina principale del sito
├── assets/              # Immagini, font e risorse multimediali
├── css/                 # Fogli di stile
├── js/                  # Script JavaScript, incl. chiamate alle API AWS
├── README.md            # Questo file
```

## Collaborazioni
- Attualmente il repository è privato e lo sviluppo è interno. Tuttavia puoi:
- Aprire una Issue per segnalare bug
- Proporre miglioramenti o nuove funzionalità
- Seguire il progetto per rimanere aggiornato

## Licenza
Questo progetto è coperto da licenza proprietaria. Tutti i diritti riservati a Ninja Game.
È vietata la distribuzione, modifica o utilizzo non autorizzato del codice.

## Contatti
Per proposte di collaborazione o richieste:

🌐 https://ninjagame.it

📩 Email: info@hanamisoftware.com
Ninja Game © 2025 – All rights reserved.

