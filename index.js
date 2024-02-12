

const sunMoonContainer = document.getElementsByClassName("sun-moon-container")[0];

document.getElementsByClassName("theme-toggle-button")[0].addEventListener("click", toggleTheme);

function toggleTheme() {
    document.body.classList.toggle("dark");
    const currRotation = parseInt(getComputedStyle(sunMoonContainer).getPropertyValue('--rotation'));
    sunMoonContainer.style.setProperty('--rotation', currRotation + 180);
    
}