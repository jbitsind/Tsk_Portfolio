document.addEventListener("DOMContentLoaded", () => {
    // 1️⃣ Panel open/close
    // Add event listener to the style switcher toggle button
    // and toggle the open class on the style switcher panel    
    const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
    styleSwitcherToggle.addEventListener("click", () =>
        document.querySelector(".style-switcher").classList.toggle("open")
    );

    // 2️⃣ Close panel on scroll
    // Add event listener to the window object to close the panel when scrolling
    // This is useful for mobile devices where the panel might be open by default
    window.addEventListener("scroll", () => {
        const panel = document.querySelector(".style-switcher");
        if (panel.classList.contains("open")) panel.classList.remove("open");
    });

    // 3️⃣ Theme color switching
    // Get all alternate stylesheets and set the active style
    // based on the selected color
    const alternateStyles = document.querySelectorAll(
        'link[rel="alternate stylesheet"][title]'
    );
    window.setActiveStyle = (color) => {
        alternateStyles.forEach((style) => {
            if (style.getAttribute("title") === color) style.removeAttribute("disabled");
            else style.setAttribute("disabled", "true");
        });
    };

    // 4️⃣ Light / dark mode toggle
    // Add event listener to the day-night toggle button
    // and toggle the dark class on the body element
    const dayNight = document.querySelector(".day-night");
    dayNight.addEventListener("click", () => {
        const icon = dayNight.querySelector("i");
        document.body.classList.toggle("dark");
        icon.classList.toggle("fa-moon");
        icon.classList.toggle("fa-sun");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("light") ? "light" : "dark"
        );
    });


    // 5️⃣ Restore saved theme on load
    // Check if the theme is saved in localStorage and apply it

    window.addEventListener("load", () => {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            document
                .querySelector(".day-night i")
                .classList.replace("fa-moon", "fa-sun");
        }
    });
});