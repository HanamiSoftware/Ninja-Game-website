// Funzione "Subscribe"

  const form = document.querySelector('.email-form');
  const nameInput = document.querySelector('.name-input');
  const emailInput = document.querySelector('.email-input');
  let cachedFormData = null; // Variabile per memorizzare i dati del form



  // Funzione "Submit"
    form.addEventListener('submit', async function (event) {

        event.preventDefault(); // Prevenire il comportamento predefinito del form
        console.log('submit event fired');
        // Gestione Nome e Email
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        

        // Validazione nome 
        if (!isValidName(name)) {
            showMessage('Please enter a valid name (2-50 characters)', 'danger');
            return;
        }

        // Validazione email
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'danger');
            return;
        }

        cachedFormData = { name, email };
        turnstile.execute();
    });

    async function onTurnstileSuccess(token) {
    console.log(`Challenge Success ${token}`);
    if (!cachedFormData) return; // Verifica se i dati del form sono stati memorizzati
    // Richiesta HTTP
    try {

      const response = await fetch('https://api.ninjagame.it/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
              name: cachedFormData.name,
              email: cachedFormData.email,
              'cf-turnstile-response':token
        }),
      });
      
      // Gestione risposte
      const result = await response.json();
      if (response.ok) {
      // Successo   
        const successMessage = result.message || 'Thank you for subscribing! We will keep you updated.';
        showMessage(successMessage, 'success');
          form.reset(); // Resetta il form
          turnstile.reset(); // Resetta il CAPTCHA

      } else {
      // Gestisce errori lato server        
          let errorMessage = 'An error occurred. Please try again later.';
          turnstile.reset(); // Resetta il CAPTCHA
      
        // Mostra codice di stato (debugging)
        showMessage(`${errorMessage} (Code: ${response.status})`, 'danger');
        console.error('Server error:', response.status, response.statusText);
      }
      
    // Richiesta HTTP Fallita
    } catch (error) {

        // Resetta il CAPTCHA in caso di errore
      turnstile.reset();
      // Gestisce errori di rete o altro
      let errorMessage = 'Unable to connect to the server. Check your connection.';
  
      // Gestisce casi specifici di errore

      showMessage(errorMessage, 'danger');
      console.error('Network error:', error);
    }finally {
        // Resetta i dati del form
        cachedFormData = null;
    }
 }




  // Funzione "Validazione nome"
    function isValidName(name) {
      return name.length >= 2 && name.length <= 50 && /^[A-Za-zÀ-ÿ\s'-]+$/.test(name);
    }


    

  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  

  //Gestione Messaggi e visualizzazione
  function showMessage(message, type) {

    
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
      existingMessage.remove();
    }
   
    
    const messageEl = document.createElement('p');
    messageEl.className = `alert alert-${type} text-${type} message`;
    messageEl.textContent = message;
   
    
    form.insertAdjacentElement('afterend', messageEl);
  }