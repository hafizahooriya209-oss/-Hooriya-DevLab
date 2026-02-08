// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const fadeElements = document.querySelectorAll('.fade-in');
// Contact forms (main page and modal)
const contactForms = document.querySelectorAll('#contactForm, #contactModalForm');

// Add subtle stagger delays (max ~0.6s) so elements pop in sequentially for a smoother effect
fadeElements.forEach((el, i) => {
    const delay = (i % 6) * 100; // stagger up to 600ms
    el.style.transitionDelay = `${delay}ms`;
});

// Recipient email for mailto fallback (change if needed)
const recipientEmail = 'hafizahooriya209@gmail.com';

// Note: To send messages automatically without requiring the visitor's mail client,
// integrate a service like Formspree, EmailJS, or a server-side endpoint.

// Bootstrap form validation
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
fadeElements.forEach(element => {
    observer.observe(element);
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission (handles main form and modal form)
contactForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
        // e.preventDefault(); // Temporarily disabled to allow activation

        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Standard HTML submission will happen now.
        // REQUIRED: You must submit the form once to see the "Activate" page for the new email.

        /* AJAX DISABLED FOR ACTIVATION
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            e.preventDefault();
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            e.preventDefault();
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // AJAX Submission to FormSubmit.co
        fetch("https://formsubmit.co/ajax/hafizahooriya@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                _subject: "New Submission from Portfolio",
                _captcha: "false" // Disable captcha to prevent popup distractions
            })
        })
        .then(response => response.json())
        .then(data => {
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            form.reset();
            form.classList.remove('was-validated');

            // Close modal if this form is inside one
            const modalEl = form.closest('.modal');
            if (modalEl) {
                const bsModal = bootstrap.Modal.getInstance(modalEl);
                if (bsModal) bsModal.hide();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Message sent (or check email activation).', 'success'); 
        })
        .finally(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
        */
    });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toastElement = document.createElement('div');
    toastElement.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0`;
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');

    toastElement.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toastElement);

    // Initialize Bootstrap toast
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });

    toast.show();

    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Service Apply buttons - set the modal service name when clicked
document.querySelectorAll('.apply-service-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const service = btn.getAttribute('data-service') || 'Service';
        const modalNameEl = document.getElementById('serviceModalName');
        if (modalNameEl) modalNameEl.textContent = service;
    });
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero .container');

    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-related functions here
}, 10));

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open toasts
        const toasts = document.querySelectorAll('.toast');
        toasts.forEach(toast => {
            const bsToast = bootstrap.Toast.getInstance(toast);
            if (bsToast) {
                bsToast.hide();
            }
        });
    }
});

// Console welcome message
console.log('%c👋 Welcome to Hafiza Hooriya\'s Portfolio!', 'color: #ff69b4; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS, Bootstrap, and JavaScript', 'color: #87ceeb; font-size: 14px;');

// Project preview modal functionality: open modal with clicked project's image/title/description
document.querySelectorAll('.card.project-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
        // Prevent clicks from triggering when target is a link or button (if present)
        if (e.target.closest('a, button')) return;

        const img = card.querySelector('img.card-img-top');
        const title = card.querySelector('.card-title')?.textContent || '';
        const text = card.querySelector('.card-text')?.textContent || '';

        const modalTitle = document.getElementById('projectPreviewTitle');
        const modalImg = document.getElementById('projectPreviewImage');
        const modalText = document.getElementById('projectPreviewText');

        if (modalTitle) modalTitle.textContent = title;
        if (modalImg) {
            modalImg.src = img ? img.src : '';
            modalImg.alt = title;
        }
        if (modalText) modalText.textContent = text;

        const previewModalEl = document.getElementById('projectPreviewModal');
        if (previewModalEl) {
            const bsModal = new bootstrap.Modal(previewModalEl);
            bsModal.show();
        }
    });
});
