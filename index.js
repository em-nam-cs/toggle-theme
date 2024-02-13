/**
@brief basic single page that can toggle and smoothly transition between a 
    light mode and a dark mode upon clicking the toggle button
    - Switches the text on the button
    - Rotates the icons in clockwise circle
    - Changes CSS styling to add or remove the dark mode styles

@author Em Nam
@date 02/12/2024
 */

const LIGHT_BUTTON_TEXT = "Swap to Dark Theme";
const DARK_BUTTON_TEXT = "Swap to Light Theme";

const FULL_REVOLUTION = 360;

const BUTTON_TEXT = Array(DARK_BUTTON_TEXT, LIGHT_BUTTON_TEXT);
const sunMoonContainer = document.getElementsByClassName("sun-moon-container")[0];
const toggleBtn = document.getElementsByClassName("theme-toggle-button")[0];

toggleBtn.addEventListener("click", toggleTheme);

document.addEventListener("DOMContentLoaded", () => {
    toggleBtn.children[1].innerHTML = LIGHT_BUTTON_TEXT;
})

// currElement.innerHTML = BUTTON_TEXT[-1 * currState / 100]; //ON load put text

function toggleTheme() {
    const currRotation = parseInt(getComputedStyle(sunMoonContainer).getPropertyValue('--rotation'));
    sunMoonContainer.style.setProperty('--rotation', currRotation + 180);

    const currentlyDark = currRotation % FULL_REVOLUTION;  //0 if full rev (currently light), 180 if dark
    const index = -1 * currentlyDark / 100;     //convert state to index (0 if switching to dark, -1.8 if switching to light)

    let delay = getComputedStyle(document.body).getPropertyValue('--transition-delay');
    delay = delay.replace(/\D/g,'') * 1000 / 3;     //convert to ms int at a fraction of given delay (otherwise too slow)

    for (i = 0; i < toggleBtn.children.length; i++) {
        const currElement = toggleBtn.children[i]

        //replace text in the btn's span
        if (currElement.tagName == "SPAN") {
            setTimeout(() => {
                currElement.innerHTML = BUTTON_TEXT.at(index);
            }, delay);

        }
    }

    document.body.classList.toggle("dark");

}