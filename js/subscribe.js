// Funzione "Subscribe"
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.email-form');
  const nameInput = document.querySelector('.name-input');
  const emailInput = document.querySelector('.email-input');




  // Funzione "Submit"
  form.addEventListener('submit', async function(event) {

    event.preventDefault();
  
    


    // Gestione Nome e Email
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    // Validazione nome 
    if (!isValidName(name)) {
      showMessage('Per favore, inserisci un nome valido (2-50 caratteri)', 'error');
      return;
    }
   
    // Validazione email
    if (!isValidEmail(email)) {
      showMessage('Per favore, inserisci un indirizzo email valido', 'error');
      return;
    }

    


    // Richiesta HTTP
    try {

      // timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      // richiesta fetch
      const response = await fetch('https://api.ninjagame.it/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: name,
          email: email,
        })
      });
     
      clearTimeout(timeoutId);




      // Gestione risposte

      if (response.ok) {
      // Successo
        const result = await response.json();
              
        const successMessage = result.message || 'Grazie per l\'iscrizione! Ti terremo aggiornato.';
        showMessage(successMessage, 'success');
        nameInput.value = '';
        emailInput.value = '';

      } else {
      // Gestisce errori lato server        
        let errorMessage = 'Si è verificato un errore. Riprova più tardi.';

        try {
          const errorResult = await response.json();

          // Usa il messaggio di errore dal server se disponibile
          if (errorResult.message) {
            errorMessage = errorResult.message;
          }
        } catch {
          // messaggio di default
        }
      
        // Mostra codice di stato (debugging)
        showMessage(`${errorMessage} (Codice: ${response.status})`, 'error');
        console.error('Errore dal server:', response.status, response.statusText);
      }
      
    // Richiesta HTTP Fallita
    } catch (error) {

      // Gestisce errori di rete o altro
      let errorMessage = 'Impossibile connettersi al server. Controlla la tua connessione.';
  
      // Gestisce casi specifici di errore
      if (error.name === 'AbortError') {
        errorMessage = 'Connessione scaduta. Riprova più tardi.';
      } else if (!navigator.onLine) {
        errorMessage = 'Nessuna connessione internet disponibile.';
      }

      showMessage(errorMessage, 'error');
      console.error('Errore di rete:', error);
    }
  });




  // Funzione "Validazione nome"
    function isValidName(name) {
      return name.length >= 2 && name.length <= 50 && /^[A-Za-zÀ-ÿ\s'-]+$/.test(name);
    }


    

  // Funzione "Validazione email"
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
 

  

  // Funzione "Messaggio"
  function showMessage(message, type) {

    // Rimuove messaggi precedenti
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
      existingMessage.remove();
    }
   
    // Crea nuovo elemento div messaggio con relativa classe
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
   
    // Inserisce il messaggio dopo il form
    form.insertAdjacentElement('afterend', messageEl);
  }
});