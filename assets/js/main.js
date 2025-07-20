// Navigation and Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a nav link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-progress, .project-card, .about-image, .info-item');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
        document.querySelector('.header').classList.add('scrolled');
    } else {
        backToTopBtn.classList.remove('active');
        document.querySelector('.header').classList.remove('scrolled');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Projects Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    // Get alert elements
    const successAlert = document.querySelector('.alert-success');
    const errorAlert = document.querySelector('.alert-error');
    const alertCloseBtns = document.querySelectorAll('.alert-close');

    // Close alert function
    const closeAlert = (alert) => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.style.display = 'none';
        }, 300);
    };

    // Show alert function
    const showAlert = (alert) => {
        alert.style.display = 'flex';
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            closeAlert(alert);
        }, 5000);
    };

    // Close buttons event listeners
    alertCloseBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            closeAlert(this.closest('.alert'));
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.textContent = '');

        // Validate Name
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            nameInput.nextElementSibling.textContent = 'Name is required';
            isValid = false;
        }

        // Validate Email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailInput.nextElementSibling.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.nextElementSibling.textContent = 'Please enter a valid email';
            isValid = false;
        }

        // Validate Subject
        const subjectInput = document.getElementById('subject');
        if (subjectInput.value.trim() === '') {
            subjectInput.nextElementSibling.textContent = 'Subject is required';
            isValid = false;
        }

        // Validate Message
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') {
            messageInput.nextElementSibling.textContent = 'Message is required';
            isValid = false;
        }

        // If form is valid, submit it
        if (isValid) {
            try {
                // For Netlify Forms
                const formData = new FormData(contactForm);

                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                // Submit to Netlify
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    // Show success alert
                    showAlert(successAlert);
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error alert
                    showAlert(errorAlert);
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                // Show error alert
                showAlert(errorAlert);
                console.error('Error:', error);
            } finally {
                // Reset button state
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            }
        }
    });
}

// Set current year in footer
const currentYear = document.getElementById('current-year');
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Background Music Player (optional)
document.addEventListener('DOMContentLoaded', function () {
    // Wait for window load to ensure all resources are loaded
    window.addEventListener('load', function () {
        // Create audio element programmatically
        const bgMusic = new Audio();
        // Use a direct URL to your audio file
        bgMusic.src = ''; // add your music track link
        bgMusic.loop = true;
        bgMusic.volume = 0.2; // 20% volume (adjust as needed)

        // Try to play automatically (may not work in all browsers due to autoplay policies)
        const playPromise = bgMusic.play();

        // Handle autoplay restrictions
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay was prevented, we'll try again after user interaction
                console.log('Autoplay prevented:', error);

                // Set up a one-time interaction handler
                const handleUserInteraction = function () {
                    bgMusic.play();
                    // Remove the event listeners after first interaction
                    document.removeEventListener('click', handleUserInteraction);
                    document.removeEventListener('touchstart', handleUserInteraction);
                    document.removeEventListener('keydown', handleUserInteraction);
                };

                // Listen for various types of user interactions
                document.addEventListener('click', handleUserInteraction);
                document.addEventListener('touchstart', handleUserInteraction);
                document.addEventListener('keydown', handleUserInteraction);
            });
        }
    });
});