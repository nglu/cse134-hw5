/**
 * 
 * [Checked] This part of the homework should be its own page with the filename of webcomponent.html
 * 
 * [Checked] All of the code to make button-count work must be written inside of a class titled 
 * ButtonCount inside a file titled ButtonCount.js
 * 
 * [Checked] The element button-count must be defined in the custom elements registry 
 * (this should be a single line of code underneath your class)
 * 
 * [Checked] <button-count> must be an autonomous custom element (Links to an external site.), meaning 
 * it should extend HTMLElement, not any other element.
 * 
 * [Checked] All of the markup inside of button-count must be inside of the Shadow DOM (i.e. attached to a shadow root)
 * 
 */

class ButtonCount extends HTMLElement {
    constructor() {
        // Always call super() first
        // This inlcudes all those global attrs (style id title class) and all those onmouseclick etc.
        super();

        // Create a button element
        let btn = document.createElement('button');
        btn.innerHTML = 'Send &hearts; - ';

        // Styling the button
        btn.style.border = 'none';
        btn.style.backgroundColor = 'lightpink';
        btn.style.padding = '15px';
        btn.style.borderRadius = '5px';
        btn.style.letterSpacing = '0.1rem'

        // Create an output to hold the count
        let heartCount = document.createElement('output');
        heartCount.textContent = 0; // Can you tell why it's textContent instead of innerHTML?
        btn.append(heartCount);
        btn.setAttribute("count", 0);
        // the "count" attribute is on the button element
        // is there a way to attache this attr to the button-count element??
        /**
         * this.setAttribute("try", 1);
         * 
         * this.setAttribute doesn't work tho. It does... but there's an error
         * You haven't added the button-count element into the DOM tree yet
         * but you already want to set an attribute for it. Basically, you're
         * adding attr to a non-existence element. Hence, browsers will throw
         * this error: 
         *      Uncaught DOMException: Failed to construct 'CustomElement': The result must not have attributes
         * ^
         * https://stackoverflow.com/questions/43836886/failed-to-construct-customelement-error-when-javascript-file-is-placed-in-head
         * 
         * Mdn has some examples on how to do this, but it's a bit confusing on how to do so
         */

        
        // add the slot in
        let slot = document.createElement('slot');
        btn.append(slot);

        // Update the count when the button is clicked
        btn.addEventListener('click', () => {
            let currVal = Number(heartCount.textContent);    // parse into Number cause it's a string, or you can just let browser handle it (no judgy, but really? You've learned better)
            heartCount.textContent = currVal + 1;
            btn.setAttribute("count", currVal + 1);
            // btn.count = currVal + 1;         // wrong
        });

        // Attach and open up shadow tree and add the button to it
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(btn);

        console.log(this);
    }
}

// Define the custom element
customElements.define('button-count', ButtonCount);