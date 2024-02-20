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

 /**
  * 
  todo:
  - have button text based on a diction/key-value pairs so better indexing
  - 
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
    console.log(`storage before init: ${localStorage.getItem("darkTheme")}`);
    setLightTheme();
    // if (darkTheme === "enabled") {
    //     setDarkTheme();
    // } else {
    //     setLightTheme();
    // }
})


function setLightTheme(delay) {
    console.log("SEt light");
    
    console.log(`storage before set L: ${localStorage.getItem("darkTheme")}`);
    setTimeout(() => {
        toggleBtnText.innerHTML = BUTTON_TEXT["LIGHT_TEXT"];
        localStorage.setItem("darkTheme", null);
        document.body.classList.remove("dark"); 
        console.log(`storage after set L: ${localStorage.getItem("darkTheme")}`);
    }, delay/2);    

}

function setDarkTheme(delay) {
    console.log("SEt dark");
    console.log(`storage before set D: ${localStorage.getItem("darkTheme")}`);
    setTimeout(() => {
        toggleBtnText.innerHTML = BUTTON_TEXT["DARK_TEXT"];
        localStorage.setItem("darkTheme", "enabled");
        document.body.classList.add("dark"); 
        console.log(`storage before set D: ${localStorage.getItem("darkTheme")}`);
    }, delay/2);    
}


/**
 * @brief switches the styles, text, and amount of rotation each time the theme
        is toggled between the light and the dark mode
 */
function toggleTheme() {

    const currRotation = parseInt(getComputedStyle(sunMoonContainer).getPropertyValue('--rotation'));
    sunMoonContainer.style.setProperty('--rotation', currRotation + 180);
    // const currentlyDark = currRotation % FULL_REVOLUTION;  //0 if full rev (currently light), 180 if dark

    currentTheme = localStorage.getItem("darkTheme");

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
    let darkTheme = localStorage.getItem("darkTheme");
    if (darkTheme === "enabled") {  //make this so it makes better sense and matches start up if()
        setLightTheme(delay);
    } else {
        setDarkTheme(delay);
    } 

    // document.body.classList.toggle("dark"); 
    //I want this outsid eof the timeout, but I also want it in the helper function so I can
    //set the mode on init and appropriate styles

}