/* ========================== Style Switcher ========================== */

// Toggle the style switcher panel
const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler ? .addEventListener("click", () => {
    document.querySelector(".style-switcher") ? .classList.toggle("open");
});

// Close style-switcher on scroll
window.addEventListener("scroll", () => {
    document.querySelector(".style-switcher.open") ? .classList.remove("open");
});

/* ========================== Theme Colors ========================== */
const alternateStyles = document.querySelectorAll('link[rel="alternate stylesheet"][title]');
const colorButtons = document.querySelectorAll(".style-switcher .colors span");

// Activate the chosen color stylesheet
function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        style.getAttribute("title") === color ?
            style.removeAttribute("disabled") :
            style.setAttribute("disabled", "true");
    });
    localStorage.setItem("color-theme", color);
}

// Wire up color buttons
colorButtons.forEach(btn => {
    const color = btn.getAttribute("title");
    btn.addEventListener("click", () => setActiveStyle(color));
});

/* ========================== Light & Dark Mode ========================== */
const dayNightToggle = document.querySelector(".day-night");
dayNightToggle ? .addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    dayNightToggle.querySelector("i")
        .classList.toggle(isDark ? "fa-sun" : "fa-moon");
    localStorage.setItem("theme-mode", isDark ? "dark" : "light");
});

/* ========================== Restore Settings on Load ========================== */
window.addEventListener("load", () => {
    // Restore color theme
    const savedColor = localStorage.getItem("color-theme");
    if (savedColor) setActiveStyle(savedColor);

    // Restore light/dark mode
    const savedMode = localStorage.getItem("theme-mode");
    if (savedMode === "dark") {
        document.body.classList.add("dark");
        dayNightToggle ? .querySelector("i") ? .classList.add("fa-sun");
    } else {
        document.body.classList.remove("dark");
        dayNightToggle ? .querySelector("i") ? .classList.add("fa-moon");
    }
});