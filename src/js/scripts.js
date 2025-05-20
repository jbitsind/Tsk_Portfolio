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

    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1500,
    loop: true

});

/*====================== Message Sending (Contact Form) =========================*/
// Ensure EmailJS is initialized and the form is present before proceeding
// This is a good practice to avoid errors in case the script runs before the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize EmailJS (replace with your own Public Key)
    emailjs.init("K8NKPzrcDuJYdKrB2"); // :contentReference[oaicite:0]{index=0}

    // 2. Grab the form and guard against missing element
    const form = document.getElementById("contact-form");
    if (!form) return;

    // 3. Attach a single submit handler
    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        // 4. Disable button to prevent double submits
        const btn = this.querySelector('button[type="submit"]');
        btn.disabled = true;

        try {
            // 5. Send the form via EmailJS (replace service/template IDs)
            await emailjs.sendForm(
                "service_7z03nir", // your Service ID
                "template_cl4kre9", // your Template ID
                this // the form element
            );
            alert("Message sent successfully!"); // success feedback
            this.reset(); // clear the form
        } catch (err) {
            console.error("EmailJS error:", err);
            alert("Failed to send message. Please try again later."); // error feedback
        } finally {
            btn.disabled = false; // re-enable button
        }
    });
});


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


// Animate each bar to its data-percent on scroll
document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".skill-bar");
    const options = { threshold: 0.3 };
    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.getAttribute("data-percent");
                bar.querySelector(".skill-fill").style.width = percent + "%";
                observer.unobserve(bar);
            }
        });
    }, options);
    bars.forEach(b => obs.observe(b));
}); /* Hide all category bodies by default */
.skill - category.category - body {
    max - height: 0;
    overflow: hidden;
    transition: max - height 0.4 s ease;
}

/* When open, allow body to expand */
.skill - category.open.category - body {
    max - height: 500 px; /* big enough to show all skills */
}

/* Style the header to indicate clickable */
.category - header {
        display: flex;
        justify - content: space - between;
        align - items: center;
        cursor: pointer;
        margin - bottom: 10 px;
    }
    .category - header.chevron {
        transition: transform 0.3 s ease;
    }

/* Rotate chevron when open */
.skill - category.open.category - header.chevron {
    transform: rotate(180 deg);
}

/* (Include previous skill-bar, skill-fill, etc., styles here) */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".skill-category .category-header").forEach(header => {
        header.addEventListener("click", () => {
            const category = header.parentElement;
            // Toggle open class
            category.classList.toggle("open");
            // Close siblings if you want only one open at a time:
            document.querySelectorAll(".skill-category").forEach(cat => {
                if (cat !== category) cat.classList.remove("open");
            });
        });
    });
});