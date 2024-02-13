/**
@brief basic single page that can toggle and smoothly transition between a 
    light mode and a dark mode upon clicking the toggle button
    - Switches the text on the button
    - Rotates the icons in clockwise circle
    - Changes CSS styling to add or remove the dark mode styles

    Assuming that starting in light mode

    Note: if click faster than the transitions, animations get jumpy due to setTimeouts()
        and toggle button still trying to process previous event delay

@author Em Nam
@date 02/13/2024
 */

const LIGHT_BUTTON_TEXT = "Swap to Dark Theme";
const DARK_BUTTON_TEXT = "Swap to Light Theme";
const BUTTON_TEXT = Array(DARK_BUTTON_TEXT, LIGHT_BUTTON_TEXT);
const FULL_REVOLUTION = 360;

const sunMoonContainer = document.getElementsByClassName("sun-moon-container")[0];
const toggleBtn = document.getElementsByClassName("theme-toggle-button")[0];
const toggleBtnText = document.getElementById("toggle-button-text");
const toggleIcon = document.getElementById("toggle");

toggleBtn.addEventListener("click", toggleTheme);

//Set toggle button text upon loading
document.addEventListener("DOMContentLoaded", () => {
    toggleBtnText.innerHTML = LIGHT_BUTTON_TEXT;
})

/**
 * @brief switches the styles, text, and amount of rotation each time the theme
        is toggled between the light and the dark mode
 */
function toggleTheme() {

    const currRotation = parseInt(getComputedStyle(sunMoonContainer).getPropertyValue('--rotation'));
    sunMoonContainer.style.setProperty('--rotation', currRotation + 180);
    const currentlyDark = currRotation % FULL_REVOLUTION;  //0 if full rev (currently light), 180 if dark
    const index = -1 * currentlyDark / 100;     //convert state to index (0 if switching to dark, -1.8 if switching to light)

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
    setTimeout(() => {
         toggleBtnText.innerHTML = BUTTON_TEXT.at(index);
    }, delay/2);    

    document.body.classList.toggle("dark");

}