// /* ========================== Toggler Style Switcher ========================== */
// const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
// styleSwitcherToggle.addEventListener("click", () => {
//         document.querySelector(".style-switcher").classList.toggle("open");

//     })
//     // Close style-switcher on scroll
// window.addEventListener("scroll", () => {
//         if (document.querySelector(".style-switcher").classList.contains("open")) {
//             document.querySelector(".style-switcher").classList.remove("open");
//         }
//     })
//     /* ========================== Theme Colors ========================== */
// const alternateStyles = document.querySelectorAll(".alternate-style");

// function setActiveStyle(color) {
//     alternateStyles.forEach((style) => {
//         if (color === style.getAttribute("title")) {
//             style.removeAttribute("disabled");
//         } else {
//             style.setAttribute("disabled", "true");
//         }
//     })
// }
// /* ========================== Theme Light and Dark Mode ========================== */
// const dayNight = document.querySelector(".day-night");
// dayNight.addEventListener("click", () => {
//     dayNight.querySelector("i").classList.toggle("fa-sun");
//     dayNight.querySelector("i").classList.toggle("fa-moon");
//     document.body.classList.toggle("dark");

//     // Save the current theme in local storage
//     if (document.body.classList.contains("dark")) {
//         localStorage.setItem("theme", "dark");
//     } else {
//         localStorage.setItem("theme", "light");
//     }
// })
// window.addEventListener("load", () => {
//     if (document.body.classList.contains("dark")) {
//         dayNight.querySelector("i").classList.add("fa-sun");
//     } else {
//         dayNight.querySelector("i").classList.add("fa-moon");
//     }
// })





document.addEventListener("DOMContentLoaded", () => {
    const switcher = document.querySelector(".style-switcher");
    const toggler = switcher.querySelector(".style-switcher-toggler");
    const dayNight = switcher.querySelector(".day-night");
    const icon = dayNight.querySelector("i");
    const alternateStyles = document.querySelectorAll('link[rel="alternate stylesheet"][title]');

    // 1) open/close panel
    toggler.addEventListener("click", () => {
        switcher.classList.toggle("open");
        toggler.querySelector("i").classList.toggle("fa-spin");
    });

    // close on scroll
    window.addEventListener("scroll", () => {
        if (switcher.classList.contains("open")) {
            switcher.classList.remove("open");
            toggler.querySelector("i").classList.remove("fa-spin");
        }
    });

    // 2) theme-color dots
    /* ========================== Theme Colors ========================== */
    const alternateStyles = document.querySelectorAll(".alternate-style");

    const colorDots = document.querySelectorAll(".color-dot");
    colorDots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const color = dot.getAttribute("data-color");
            setActiveStyle(color);
        });
    });

    function setActiveStyle(color) {
        alternateStyles.forEach((style) => {
            if (color === style.getAttribute("title")) {
                style.removeAttribute("disabled");
            } else {
                style.setAttribute("disabled", "true");
            }
        })
    }

    // 3) light ↔ dark toggle
    dayNight.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        icon.classList.toggle("fa-moon", !isDark);
        icon.classList.toggle("fa-sun", isDark);
        localStorage.setItem("theme-mode", isDark ? "dark" : "light");
    });

    // 4) on load: restore dark/light
    const saved = localStorage.getItem("theme-mode");
    if (saved === "dark") {
        document.body.classList.add("dark");
        icon.classList.replace("fa-moon", "fa-sun");
    } else {
        icon.classList.add("fa-moon");
    }
});