document.addEventListener('DOMContentLoaded', () => {
    const alertButton = document.getElementById('alert-button');
    const confirmButton = document.getElementById('confirm-button');
    const promptButton = document.getElementById('prompt-button');
    const saferButton = document.getElementById('safer-button');
    const result = document.getElementById('button-result');
    

    // alertButton.addEventListener('click', alertPressed);
    alertButton.addEventListener('click', () => {
        alert("Alert Button is pushed.");
        result.textContent = " ";
    });

    confirmButton.addEventListener('click', () => {
        result.innerHTML = " ";
        let button = confirm("Confirm Button is pushed. Yes or No?");
        
        if(button) {
            result.innerHTML = `Confirm result: ${button}`;
        }
        else {
            result.innerHTML = `Confirm result: ${button}`;
        }
    });

    promptButton.addEventListener('click', () => {
        let user_input = prompt("What is your name?");
        if(user_input) {
            result.innerHTML = `Prompt result: ${user_input}`;
            // if using result.textContent
        }
        else {
            result.innerHTML = "Prompt result: User didn't enter anything.";
        }
    });

    saferButton.addEventListener('click', () => {
        let user_input = prompt("What is your name?");
        console.log(user_input);
        let clean_input = DOMPurify.sanitize(user_input, {ALLOWED_TAGS: ['b', 'i'], ALLOWED_ATTR: ['style']});
        console.log(clean_input);
        if(user_input) {
            result.innerHTML = `Prompt result: ${clean_input}`;
        }
        else {
            result.innerHTML = "Prompt result: User didn't enter anything.";
        }
    });

})

// <b onmouseover = "alert('Ehhhhh')">Roll me</b>