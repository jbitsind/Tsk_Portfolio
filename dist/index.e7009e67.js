/* ========================== Toggler Style Switcher ========================== */ const switcher = document.querySelector(".style-switcher");
const switcherToggler = document.querySelector(".style-switcher-toggler");
function setSwitcherOpen(isOpen) {
    if (!switcher) return;
    switcher.classList.toggle("open", isOpen);
    // Fallback in case other CSS overrides transforms.
    // (Keeps behavior working even if styles are changed later.)
    switcher.style.transform = isOpen ? "translateX(0)" : "translateX(100%)";
    localStorage.setItem("switcherOpen", isOpen ? "1" : "0");
}
function toggleSwitcher() {
    if (!switcher) return;
    setSwitcherOpen(!switcher.classList.contains("open"));
}
// Primary: direct handler (most reliable).
switcherToggler?.addEventListener("click", (e)=>{
    e.preventDefault();
    e.stopPropagation();
    toggleSwitcher();
});
// Secondary: delegated close + delegated open (covers icon clicks + dynamic DOM).
document.addEventListener("click", (e)=>{
    const target = /** @type {any} */ e.target;
    const toggler = target && typeof target.closest === "function" ? target.closest(".style-switcher-toggler") : null;
    if (toggler) {
        e.preventDefault();
        toggleSwitcher();
        return;
    }
    // Close when clicking outside
    if (switcher && switcher.classList.contains("open") && !switcher.contains(target)) setSwitcherOpen(false);
});
/* ========================== Theme Colors ========================== */ const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
    alternateStyles.forEach((style)=>{
        if (color === style.getAttribute("title")) style.removeAttribute("disabled");
        else style.setAttribute("disabled", "true");
    });
    localStorage.setItem("color", color);
}
// Parcel bundling can scope functions; expose for inline onclick handlers.
window.setActiveStyle = setActiveStyle;
/* ========================== Theme Light and Dark Mode ========================== */ const dayNight = document.querySelector(".day-night");
function applyTheme(theme) {
    if (theme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    const icon = dayNight?.querySelector("i");
    if (icon) {
        icon.classList.toggle("fa-sun", document.body.classList.contains("dark"));
        icon.classList.toggle("fa-moon", !document.body.classList.contains("dark"));
    }
}
dayNight?.addEventListener("click", ()=>{
    const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
});
window.addEventListener("load", ()=>{
    const savedOpen = localStorage.getItem("switcherOpen") === "1";
    setSwitcherOpen(savedOpen);
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
    const savedColor = localStorage.getItem("color") || "color-1";
    setActiveStyle(savedColor);
});

//# sourceMappingURL=index.e7009e67.js.map
