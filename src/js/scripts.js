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
// Supports two patterns:
// - data-modal="modal-id" => open a modal
// - data-link="/path"     => navigate to another page
(function() {
    const readMoreButtons = document.querySelectorAll('.btn.read-more');
    const modals = document.querySelectorAll('.modal');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'block';
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'none';
    }

    readMoreButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const modalId = btn.getAttribute('data-modal');
            const targetUrl = btn.getAttribute('data-link');

            if (modalId) {
                e.preventDefault();
                openModal(modalId);
                return;
            }

            if (targetUrl) {
                e.preventDefault();
                if (targetUrl && targetUrl !== 'null') {
                    // Open target page inside an iframe modal (AJAX modal) instead of navigating away
                    const ajaxModalId = 'ajax-modal';
                    let ajaxModal = document.getElementById(ajaxModalId);

                    function createAjaxModal(url) {
                        const modal = document.createElement('div');
                        modal.id = ajaxModalId;
                        modal.className = 'modal';
                        modal.style.display = 'block';

                        modal.innerHTML = `
                            <div class="modal-content">
                                <button class="back" type="button">Back</button>
                                <button class="close" data-modal="${ajaxModalId}" aria-label="Close">&times;</button>
                                <div class="iframe-wrap">
                                    <iframe src="${url}" frameborder="0" allowfullscreen></iframe>
                                </div>
                            </div>`;

                        document.body.appendChild(modal);

                        // wire events for newly created controls
                        const backBtn = modal.querySelector('.back');
                        const closeBtn = modal.querySelector('.close');
                        const iframe = modal.querySelector('iframe');

                        backBtn.addEventListener('click', () => { modal.style.display = 'none'; });
                        closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });

                        // backdrop click closes
                        modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.style.display = 'none'; });

                        // ESC key closes
                        const escHandler = (ev) => { if (ev.key === 'Escape') modal.style.display = 'none'; };
                        document.addEventListener('keydown', escHandler);

                        // remove modal from DOM when hidden to keep DOM clean
                        const observer = new MutationObserver(() => {
                            if (modal.style.display === 'none') {
                                document.removeEventListener('keydown', escHandler);
                                observer.disconnect();
                                try { modal.remove(); } catch (err) {}
                            }
                        });
                        observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
                    }

                    if (!ajaxModal) {
                        createAjaxModal(targetUrl);
                    } else {
                        // reuse existing modal by updating iframe src and showing it
                        const iframe = ajaxModal.querySelector('iframe');
                        if (iframe) iframe.src = targetUrl;
                        ajaxModal.style.display = 'block';
                    }
                } else {
                    console.error('Invalid URL:', targetUrl);
                }
            }
        });
    });

    // Ensure every modal has a visible Back button (insert if missing)
    modals.forEach((modal) => {
        const content = modal.querySelector('.modal-content');
        if (content && !content.querySelector('.back')) {
            const backBtn = document.createElement('button');
            backBtn.className = 'back';
            backBtn.type = 'button';
            backBtn.textContent = 'Back';
            content.insertBefore(backBtn, content.firstChild);
        }
    });

    // Close on clicking the X
    document.querySelectorAll('.modal .close').forEach((closeBtn) => {
        closeBtn.addEventListener('click', () => {
            const modalId = closeBtn.getAttribute('data-modal');
            if (modalId) closeModal(modalId);
        });
    });

    // Close on backdrop click
    modals.forEach((modal) => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal when clicking on the sidebar (outside visible overlay)
    const aside = document.querySelector('.aside');
    if (aside) {
        aside.addEventListener('click', () => {
            modals.forEach((m) => { if (m.style.display === 'block') m.style.display = 'none'; });
        });
    }

    // Add listeners for any 'Back' buttons inside modal-content
    document.querySelectorAll('.modal-content .back').forEach((backBtn) => {
        backBtn.addEventListener('click', () => {
            // find closest modal ancestor and hide it
            const modal = backBtn.closest('.modal');
            if (modal) modal.style.display = 'none';
        });
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        modals.forEach((modal) => {
            if (modal.style.display === 'block') modal.style.display = 'none';
        });
    });
})();

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
});