document.addEventListener("DOMContentLoaded", () => {
    const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
    const dayNight = document.querySelector(".day-night");
    const alternateStyles = document.querySelectorAll('link[rel="alternate stylesheet"][title]');

    // Toggle panel
    styleSwitcherToggle.addEventListener("click", () => {
        document.querySelector(".style-switcher").classList.toggle("open");
    });

    // Light/dark toggle
    dayNight.addEventListener("click", () => {
        // …
    });

    // Color picks
    window.setActiveStyle = function(color) {
        alternateStyles.forEach(style => {
            style.title === color ?
                style.removeAttribute("disabled") :
                style.setAttribute("disabled", "true");
        });
    };
});