document.addEventListener('DOMContentLoaded', () => {
    const alertButton = document.getElementById('alert-button');
    const confirmButton = document.getElementById('confirm-button');
    const promptButton = document.getElementById('prompt-button');
    const saferButton = document.getElementById('safer-button');
    const outputBox = document.getElementById('outputBox');

    const popupDialog = document.getElementById('popupDialog');
    const okButton = document.getElementById('confirm');
    const cancelButton = document.getElementById('cancel');
    const dialogText = document.getElementById('dialogText');
    const textInput  = document.getElementById('textInput');
    
    saferButton.hidden = true;

    // If a browser doesn't support the dialog, then hide the
    // dialog contents by default.
    if (typeof popupDialog.showModal !== 'function') {
        popupDialog.hidden = true;
        /* a fallback script to allow this dialog/form to function
        for legacy browsers that do not support <dialog>
        could be provided here.
        */
    }


    /** Alert button */
    alertButton.addEventListener('click', () => {
        cancelButton.hidden = true;
        textInput.hidden = true;
        dialogText.innerHTML = "Alert button is pushed!";
        if (typeof popupDialog.showModal === "function") {
            popupDialog.showModal();
        } else {
            outputBox.value = "Sorry, the <dialog> API is not supported by this browser.";
            // could insert the native dialog code here!!!
        }
    });

    okButton.addEventListener('click', () => {
        console.log("Ok added");
    });

    cancelButton.addEventListener('click', () => {
        console.log("Cancel added");
    });
    

    confirmButton.addEventListener('click', () => {
        cancelButton.hidden = false;
        textInput.hidden = true;
        okButton.innerHTML = "Yes";
        cancelButton.innerHTML = "No";
        dialogText.innerHTML = "Confirm Button is pushed. Yes or No?";

        if (typeof popupDialog.showModal === "function") {
            
            // okButton.removeEventListener('click', () => {
            //     console.log("Ok added");
            // });
            // cancelButton.removeEventListener('click', () => {
            //     console.log("Cancel added");
            // });

            okButton.addEventListener('click', () => {
                outputBox.innerHTML = "Confirm result: true";
            });
        
            cancelButton.addEventListener('click', () => {
                outputBox.innerHTML = "Confirm result: false";
            });
            
            popupDialog.showModal();
        } else {
            outputBox.value = "Sorry, the <dialog> API is not supported by this browser.";
            // could insert the native dialog code here!!!
        }
    });

    promptButton.addEventListener('click', () => {
        cancelButton.hidden = false;
        textInput.hidden = false;
        okButton.innerHTML = "OK";
        cancelButton.innerHTML = "Cancel";
        dialogText.innerHTML = "What do you want to say?";

        if (typeof popupDialog.showModal === "function") {
            okButton.addEventListener('click', () => {
                let user_input = textInput.value;
                if (user_input) {
                    let clean_input = DOMPurify.sanitize(user_input, {ALLOWED_TAGS: ['b', 'i'], ALLOWED_ATTR: ['style']});
                    outputBox.innerHTML = `Prompt result: ${clean_input}`;
                } else {
                    outputBox.innerHTML = "Prompt result: User didn't enter anything.";
                }
            });
        
            cancelButton.addEventListener('click', () => {
                outputBox.innerHTML = "Prompt result: User didn't enter anything.";
            });

            popupDialog.showModal();
        } else {
            outputBox.value = "Sorry, the <dialog> API is not supported by this browser.";
            // could insert the native dialog code here!!!
        }
    });

    // saferButton.addEventListener('click', () => {
    //     let user_input = prompt("What is your name?");
    //     console.log(user_input);
    //     let clean_input = DOMPurify.sanitize(user_input, {ALLOWED_TAGS: ['b', 'i'], ALLOWED_ATTR: ['style']});
    //     console.log(clean_input);
    //     if(user_input) {
    //         result.innerHTML = `Prompt result: ${clean_input}`;
    //     }
    //     else {
    //         result.innerHTML = "Prompt result: User didn't enter anything.";
    //     }
    // });

})

// <b onmouseover = "alert('Ehhhhh')">Roll me</b>