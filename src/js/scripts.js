// // document.addEventListener("DOMContentLoaded", () => {
// // Auto-scroll settings
// const scrollSpeed = 1; // pixels per scroll increment
// const scrollInterval = 50; // ms between each scroll increment
// const autoScrollDuration = 20000; // total auto-scroll time in ms (20 seconds)

// // Function to automatically scroll an element
// function autoScrollElement(element) {
//     let scrollTimer = setInterval(() => {
//         // If the element is scrolled to the bottom, reset to top
//         if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
//             element.scrollTop = 0;
//         } else {
//             element.scrollTop += scrollSpeed;
//         }
//     }, scrollInterval);

//     // Stop auto-scrolling after the designated duration
//     setTimeout(() => {
//         clearInterval(scrollTimer);
//     }, autoScrollDuration);
// }

// // Observer options: trigger when 50% of the element is visible
// const observerOptions = {
//     root: null, // viewport
//     threshold: 0.5
// };

// // Create the Intersection Observer
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             autoScrollElement(entry.target);
//         }
//     });
// }, observerOptions);

// // Observe both Education and Experience sections
// document.querySelectorAll('.about .about-content .education, .about .about-content .experience')
//     .forEach(el => observer.observe(el));

// /*==================================Typing Animation ==================================*/
// var typed = new Typed(".typing", {
//     strings: ["Machine Learning Engineer", "Data Scientist", "Software Engineer", "Creative Technologist"],
//     typeSpeed: 150,
//     backSpeed: 60,
//     loop: true
// });


// /*====================== Message Sending =========================*/
// const form = document.getElementById('contact-form');
// form.addEventListener('submit', async function(e) {
//     e.preventDefault();

//     // Get the submit button and disable it to prevent multiple submissions
//     const btn = this.querySelector('button[type="submit"]');
//     btn.disabled = true;

//     // Read values from form inputs
//     const name = document.querySelector('input[name="user_name"]').value;
//     const email = document.querySelector('input[name="user_email"]').value;
//     const subject = document.querySelector('input[name="subject"]').value;
//     const message = document.querySelector('textarea[name="message"]').value;

//     try {
//         const res = await fetch("http://localhost:3000/send", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name, email, subject, message })
//         });
//         const text = await res.text();
//         alert(text);

//         // Clear the form inputs after a successful submission
//         this.reset();
//     } catch (err) {
//         alert("Message failed to send.");
//     } finally {
//         // Re-enable the button regardless of outcome
//         btn.disabled = false;
//     }
// });


// /*====================== Open modal when "Read More" button is clicked =========================*/
// document.querySelectorAll('.read-more').forEach(function(button) {
//     button.addEventListener('click', function(event) {
//         event.preventDefault();
//         var modalId = this.getAttribute('data-modal');
//         document.getElementById(modalId).style.display = 'block';
//     });
// });

// // Close modal when the close element is clicked
// document.querySelectorAll('.modal .close').forEach(function(closeBtn) {
//     closeBtn.addEventListener('click', function() {
//         var modalId = this.getAttribute('data-modal');
//         document.getElementById(modalId).style.display = 'none';
//     });
// });

// // Optional: Close modal if user clicks outside the modal content
// window.addEventListener('click', function(event) {
//     document.querySelectorAll('.modal').forEach(function(modal) {
//         if (event.target === modal) {
//             modal.style.display = 'none';
//         }
//     });
// });

// /*====================== Smooth Scrolling =========================*/
// document.addEventListener('DOMContentLoaded', function() {
//     const navLinks = document.querySelectorAll('.nav li a');
//     const sections = document.querySelectorAll('section');

//     const options = {
//         threshold: 0.5 // Trigger when 50% of the section is visible
//     };

//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 // Remove active class from all links
//                 navLinks.forEach(link => link.classList.remove('active'));
//                 // Get the ID of the visible section
//                 const id = entry.target.getAttribute('id');
//                 // Add active class to corresponding nav link
//                 document.querySelector(`.nav li a[href="#${id}"]`).classList.add('active');
//             }
//         });
//     }, options);

//     sections.forEach(section => {
//         observer.observe(section);
//     });
// });
// /*====================== Scroll to section on nav link click =========================*/
// document.addEventListener("DOMContentLoaded", function() {
//     const sections = document.querySelectorAll("section");
//     const navLinks = document.querySelectorAll(".nav li a");

//     window.addEventListener("scroll", () => {
//         let currentSection = "";
//         sections.forEach(section => {
//             const sectionTop = section.offsetTop;
//             // Adjust 60 if needed to account for fixed header height
//             if (pageYOffset >= sectionTop - 60) {
//                 currentSection = section.getAttribute("id");
//             }
//         });
//         navLinks.forEach(link => {
//             link.classList.remove("active");
//             if (link.getAttribute("href") === "#" + currentSection) {
//                 link.classList.add("active");
//             }
//         });
//     });
// });
// /*====================== Read More button redirection =========================*/
// document.querySelectorAll('.btn.read-more').forEach(function(btn) {
//     btn.addEventListener('click', function() {
//         window.location.href = btn.getAttribute('data-link');
//     });
// });
// /*======= Ensure every button has a valid data-link attribute =====*/
// document.querySelectorAll('.btn.read-more').forEach(function(btn) {
//     btn.addEventListener('click', function() {
//         var targetUrl = btn.getAttribute('data-link');
//         if (targetUrl && targetUrl !== "null") { // Check for valid URL
//             window.location.href = targetUrl;
//         } else {
//             console.error('Invalid URL:', targetUrl);
//         }
//     });
// });document.addEventListener("DOMContentLoaded", function() {
/*====================== Auto-scroll =========================*/
const scrollSpeed = 1; // pixels per scroll increment
const scrollInterval = 50; // ms between each scroll increment
const autoScrollDuration = 20000; // total auto-scroll time in ms (20 seconds)

function autoScrollElement(element) {
    let scrollTimer = setInterval(() => {
        if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
            element.scrollTop = 0;
        } else {
            element.scrollTop += scrollSpeed;
        }
    }, scrollInterval);
    setTimeout(() => {
        clearInterval(scrollTimer);
    }, autoScrollDuration);
}

const observerOptions = {
    root: null,
    threshold: 0.5 // Trigger when 50% of the element is visible
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            autoScrollElement(entry.target);
        }
    });
}, observerOptions);

// Observe the Education and Experience sections inside .about-content
document.querySelectorAll('.about .about-content .education, .about .about-content .experience')
    .forEach(el => scrollObserver.observe(el));

/*====================== Typing Animation =========================*/
var typed = new Typed(".typing", {
    strings: ["Machine Learning Engineer", "Data Scientist", "Software Engineer", "Creative Technologist"],
    typeSpeed: 150,
    backSpeed: 60,
    loop: true
});

/*====================== Message Sending (Contact Form) =========================*/
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        btn.disabled = true;

        const name = document.querySelector('input[name="user_name"]').value;
        const email = document.querySelector('input[name="user_email"]').value;
        const subject = document.querySelector('input[name="subject"]').value;
        const message = document.querySelector('textarea[name="message"]').value;

        try {
            const res = await fetch("http://localhost:3000/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message })
            });
            const text = await res.text();
            alert(text);
            // Clear the form upon successful submission
            this.reset();
        } catch (err) {
            alert("Message failed to send.");
        } finally {
            btn.disabled = false;
        }
    });
}

/*====================== Read More Button Redirection =========================*/
// Bind redirection only to buttons that have a valid data-link attribute.
document.querySelectorAll('.btn.read-more').forEach(function(btn) {
    // Make sure the button has a data-link attribute before adding an event listener.
    if (btn.getAttribute('data-link')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var targetUrl = btn.getAttribute('data-link');
            if (targetUrl && targetUrl !== "null") {
                window.location.href = targetUrl;
            } else {
                console.error('Invalid URL:', targetUrl);
            }
        });
    }
});

/*====================== Smooth Scrolling & Active Navigation =========================*/
const navLinks = document.querySelectorAll('.nav li a');
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav li a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});