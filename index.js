/**
@brief basic single page that can toggle and smoothly transition between a 
    light mode and a dark mode upon clicking the toggle button
    - Switches the text on the button
    - Rotates the icons in clockwise circle
    - Changes CSS styling to add or remove the dark mode styles

    Assuming that starting in light mode

@author Em Nam
@date 02/12/2024
 */

 /**
  * 
  TODO:
  - smooth transition of button text (fade text in and then out??, use color or opacity?)
 - include icon in the fade-in transition

 - transition does not work on the first click of the button
  */

const LIGHT_BUTTON_TEXT = "Swap to Dark Theme";
const DARK_BUTTON_TEXT = "Swap to Light Theme";

const FULL_REVOLUTION = 360;

const BUTTON_TEXT = Array(DARK_BUTTON_TEXT, LIGHT_BUTTON_TEXT);
const sunMoonContainer = document.getElementsByClassName("sun-moon-container")[0];
const toggleBtn = document.getElementsByClassName("theme-toggle-button")[0];
const toggleBtnText = document.getElementById("toggle-button-text");

toggleBtn.addEventListener("click", toggleTheme);

//Set toggle button text upon loading
document.addEventListener("DOMContentLoaded", () => {
    toggleBtnText.innerHTML = LIGHT_BUTTON_TEXT;
})

function toggleTheme() {

    console.log(document.body.classList);

    const currRotation = parseInt(getComputedStyle(sunMoonContainer).getPropertyValue('--rotation'));
    sunMoonContainer.style.setProperty('--rotation', currRotation + 180);

    const currentlyDark = currRotation % FULL_REVOLUTION;  //0 if full rev (currently light), 180 if dark
    const index = -1 * currentlyDark / 100;     //convert state to index (0 if switching to dark, -1.8 if switching to light)

    let delay = getComputedStyle(document.body).getPropertyValue('--animiation-transition');
    delay = delay.replace(/\D/g,'') * 1000 * (3/4);     //convert to ms int at a fraction of given delay


    toggleBtnText.classList.add("fade-in-animation");
    setTimeout(() => {
        toggleBtnText.classList.remove("fade-in-animation");
    }, delay);
    
    setTimeout(() => {
         toggleBtnText.innerHTML = BUTTON_TEXT.at(index);
    }, delay/2);

   

    // //replace text in the btn's span
    // setTimeout(() => {
    //     toggleBtnText.innerHTML = BUTTON_TEXT.at(index);
    // }, delay);




    document.body.classList.toggle("dark");

}