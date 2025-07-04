    const form = document.querySelector('.email-form');
    const formContainer = document.querySelector('.form-container');
    const nameInput = document.querySelector('.name-input');
    const emailInput = document.querySelector('.email-input');
    let cachedFormData = null; // Variabile per memorizzare i dati del form

//listener per verifica della validazione lato server
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    if (params.get("verified") === "true") {
        const mainContainer = document.querySelector('main');
        const alert = document.createElement("div");
        alert.className = "alert alert-success alert-dismissible fade show";
        alert.role = "alert";
        alert.innerHTML = `
        <strong>Registrazione completata!</strong> Ora sei iscritto alla newsletter di Ninja Game.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
        mainContainer.prepend(alert);

        // Pulizia URL dalla query string (evita ripetizione al refresh)
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

    // Funzione di gestione del CAPTCHA Turnstile e del modulo di iscrizione
    form.addEventListener('submit', async function (event) {

        event.preventDefault(); // Prevenire il comportamento predefinito del form
        console.log('submit event fired');
        // Gestione Nome e Email
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const btnSubmit = form.querySelector('#btnSubmit');
        

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
        btnSubmit.disabled = true; // Disabilita il pulsante di invio per evitare invii multipli
        btnSubmit.textContent = 'Submitting...'; // Cambia il testo del pulsante
    });

    async function onTurnstileSuccess(token) {
    if (!cachedFormData) return; // Verifica se i dati del form sono stati memorizzati
    // Richiesta HTTP
    try {

      const response = await fetch('https://api.ninjagame.it/subscribe', {
        method: 'POST',
        headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
        },
          body:
              'Name=' + encodeURIComponent(cachedFormData.name) + '&Email=' + encodeURIComponent(cachedFormData.email) + '&cf-turnstile-response=' + encodeURIComponent(token)
        ,
      });
      
      // Gestione risposte
      const result = await response.json();
      if (response.ok && result.success) {
      // Successo   
          const successMessage = result.message;
          showMessage(`${successMessage}`, 'success');
          form.reset(); // Resetta il form
          turnstile.reset(); // Resetta il CAPTCHA

      } else {
          // Gestisce errori lato server        
          let errorMessage = result.message;
          turnstile.reset(); // Resetta il CAPTCHA
      
          // Mostra codice di stato (debugging)
          showMessage(`${errorMessage} : ${result.statusCode}: ${result.data}`, 'danger');
      }
      
    } catch (ex) {

        // Resetta il CAPTCHA in caso di errore
        turnstile.reset();
        showMessage(`${ex.message} : ${errorMessage} : ${result.statusCode}: ${result.data}`, 'danger');

    }finally {
        // Resetta i dati del form
        cachedFormData = null;
        btnSubmit.disabled = false; // Riabilita il pulsante di invio
        btnSubmit.textContent = 'Send me updates'; // Ripristina il testo del pulsante
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

        const messageElementContainer = document.createElement('div');
        messageElementContainer.className = 'message-container row';
        const messageEl = document.createElement('p');
        messageEl.className = `col-md-12 mt-4 alert alert-${type} text-${type} message`;
        messageEl.textContent = message;
        messageElementContainer.appendChild(messageEl);
   

      form.appendChild(messageElementContainer);
  }