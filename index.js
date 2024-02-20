/**
@brief basic single page that can toggle and smoothly transition between a 
    light mode and a dark mode upon clicking the toggle button
    - Switches the text on the button
    - Rotates the icons in clockwise circle
    - Changes CSS styling to add or remove the dark mode styles
    - Stores theme in local storage so refreshing keeps saved theme

@author Em Nam
@date 02/20/2024
 */

const BUTTON_TEXT = {
    "LIGHT_TEXT": "Swap to Dark Theme",
    "DARK_TEXT": "Swap to Light Theme"
}
const FULL_REVOLUTION = 360;

const sunMoonContainer = document.getElementsByClassName("sun-moon-container")[0];
const toggleBtn = document.getElementsByClassName("theme-toggle-button")[0];
const toggleBtnText = document.getElementById("toggle-button-text");
const toggleIcon = document.getElementById("toggle");

toggleBtn.addEventListener("click", toggleTheme);
let darkTheme = localStorage.getItem("darkTheme");

//Set toggle button text upon loading 
document.addEventListener("DOMContentLoaded", () => {
    if (darkTheme === "enabled") {
        setDarkTheme(0);
    } else {
        setLightTheme(0);
    }
})

/**
 * sets the light theme text on toggle button, removes localStorage variable, 
        and removes css dark class
 * @param {int} delay delay of transition in ms
 */
function setLightTheme(delay) {
    setTimeout(() => {
        toggleBtnText.innerHTML = BUTTON_TEXT["LIGHT_TEXT"];
        localStorage.setItem("darkTheme", null);
        document.body.classList.remove("dark"); 
    }, delay/2);    

}

/**
 * sets the dark theme text on toggle button, localStorage variable, and css 
        dark class
 * @param {int} delay delay of transition in ms
 */
function setDarkTheme(delay) {
    setTimeout(() => {
        toggleBtnText.innerHTML = BUTTON_TEXT["DARK_TEXT"];
        localStorage.setItem("darkTheme", "enabled");
        document.body.classList.add("dark"); 
    }, delay/2);    
}


/**
 * @brief switches the styles, text, and amount of rotation each time the theme
        is toggled between the light and the dark mode
 */
function toggleTheme() {

    //sets new rotation value by adding half rev so always moves in cw direction
    const currRotation = parseInt(getComputedStyle(sunMoonContainer).getPropertyValue('--rotation'));
    sunMoonContainer.style.setProperty('--rotation', currRotation + FULL_REVOLUTION/2);

    let delay = getComputedStyle(document.body).getPropertyValue('--animiation-transition');
    delay = delay.replace(/\D/g,'');     //convert to ms int

    //force animation to trigger before removing it after completion
    toggleBtnText.classList.add("fade-in-animation");
    toggleIcon.classList.add("fade-in-animation");
    setTimeout(() => {
        toggleBtnText.classList.remove("fade-in-animation");
        toggleIcon.classList.remove("fade-in-animation");
    }, delay);
    
    //switch button text when faded (div 2 because that's when opacity 0 (at 50%, halfway through transition))
    console.log(`storage before cond: ${localStorage.getItem("darkTheme")}`);
    darkTheme = localStorage.getItem("darkTheme");
    if (darkTheme === "enabled") {
        setLightTheme(delay);
    } else {
        setDarkTheme(delay);
    } 

}