// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navItems = document.querySelector('.nav-items');

mobileMenuBtn.addEventListener('click', () => {
    navItems.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navItems.classList.contains('active')) {
        navItems.classList.remove('active');
    }
});

// Smooth scroll for enrollment button
document.querySelector('.enroll-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.content-right').scrollIntoView({
        behavior: 'smooth'
    });
});

// Enhanced navbar shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

function startTimer(targetDate, display) {
    const interval = setInterval(function () {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            display.textContent = "00:00:00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        display.innerHTML = 
            (days < 10 ? "0" + days : days) + "d " + 
            (hours < 10 ? "0" + hours : hours) + "h " + 
            (minutes < 10 ? "0" + minutes : minutes) + "m " + 
            (seconds < 10 ? "0" + seconds : seconds) + "s";
    }, 1000);
}

window.onload = function () {
    const targetDate = new Date("Jan 1, 2025 00:00:00").getTime();
    const display = document.querySelector('#timer');
    startTimer(targetDate, display);
};




document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-button');
    const cards = document.querySelectorAll('.highlight-card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            // Show selected card and scroll to it
            const sectionId = button.getAttribute('data-section');
            cards.forEach(card => {
                if (card.id === sectionId) {
                    card.classList.add('active');
                    card.scrollIntoView({ behavior: 'smooth' });
                } else {
                    card.classList.remove('active');
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.highlight-card');

    function removeActiveClass(elements) {
        elements.forEach(element => element.classList.remove('active'));
    }

    function addActiveClass(element) {
        element.classList.add('active');
    }

    function handleButtonClick(event) {
        const button = event.currentTarget;

        // Remove active class from all buttons and sections
        removeActiveClass(buttons);
        removeActiveClass(sections);

        // Add active class to the clicked button and corresponding section
        addActiveClass(button);
        const sectionId = button.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        addActiveClass(section);

        // Scroll to the active section
        section.scrollIntoView({ behavior: 'smooth' });
    }

    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});


document.querySelector('.apply-btn').addEventListener('click', function() {
            alert('Application process initiated!');
        });

        // Add hover effect for steps
        const steps = document.querySelectorAll('.step');
        steps.forEach(step => {
            step.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f8f9fa';
            });
            step.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'white';
            });
        });

document.querySelectorAll('.module-header').forEach(header => {
            header.addEventListener('click', function() {
                const module = this.closest('.module');
                const content = module.querySelector('.module-content');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Toggle aria-expanded
                this.setAttribute('aria-expanded', !isExpanded);
                
                // Toggle content visibility
                content.hidden = isExpanded;
                
                // Toggle active class
                module.classList.toggle('active');
            });

            // Handle keyboard navigation
            header.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        

// Utility function to generate random ID
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// Class to manage the career services functionality
class CareerServicesManager {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.initializeIntersectionObserver();
        this.initializeAnimations();
    }

    initializeElements() {
        this.serviceCards = document.querySelectorAll('.service-card');
        this.ctaButton = document.querySelector('.cta-button');
        this.successMessage = document.getElementById('successMessage');
        
        // Add IDs to cards for tracking
        this.serviceCards.forEach(card => {
            card.id = generateId();
            this.addCardInteractivity(card);
        });
    }

    attachEventListeners() {
        // CTA Button interaction
        this.ctaButton.addEventListener('click', () => this.handleCtaClick());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

        // Add scroll to top functionality
        this.createScrollToTopButton();

        // Add service card click handlers
        this.serviceCards.forEach(card => {
            card.addEventListener('click', () => this.handleCardClick(card));
        });
    }

    initializeIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        this.serviceCards.forEach(card => {
            this.observer.observe(card);
        });
    }

    initializeAnimations() {
        // Add hover animations
        this.serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCard(card);
            });
        });
    }

    animateCard(card) {
        const icon = card.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }

    handleCtaClick() {
        this.showSuccessMessage();
        this.trackEngagement('cta_click');
        
        // Simulate form submission
        setTimeout(() => {
            this.hideSuccessMessage();
        }, 3000);
    }

    showSuccessMessage() {
        this.successMessage.classList.add('show');
        this.successMessage.setAttribute('aria-hidden', 'false');
    }

    hideSuccessMessage() {
        this.successMessage.classList.remove('show');
        this.successMessage.setAttribute('aria-hidden', 'true');
    }

    handleCardClick(card) {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        card.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);

        this.trackEngagement('card_click', card.id);
    }

    handleKeyboardNavigation(e) {
        if (e.key === 'Escape') {
            this.hideSuccessMessage();
        }
    }

    createScrollToTopButton() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.classList.add('scroll-top-button');
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });

        document.body.appendChild(scrollButton);
    }

    addCardInteractivity(card) {
        // Add focus states for accessibility
        card.setAttribute('tabindex', '0');
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

        // Add keyboard interaction
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleCardClick(card);
            }
        });
    }

    trackEngagement(action, elementId = null) {
        // Simple engagement tracking
        const engagementData = {
            action,
            elementId,
            timestamp: new Date().toISOString(),
            page: 'career-services'
        };

        console.log('Engagement tracked:', engagementData);
        // In a real application, you would send this to your analytics service
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const careerServices = new CareerServicesManager();

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading state for CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', () => {
        ctaButton.classList.add('loading');
        setTimeout(() => {
            ctaButton.classList.remove('loading');
        }, 1500);
    });

    // Add responsive navigation handling
    const handleResize = () => {
        const isMobile = window.innerWidth < 768;
        document.body.classList.toggle('mobile', isMobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
});

// Add CSS for new JavaScript features
const style = document.createElement('style');
style.textContent = `
    .scroll-top-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .scroll-top-button.visible {
        opacity: 1;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .cta-button.loading {
        position: relative;
        pointer-events: none;
    }

    .cta-button.loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        margin: -10px 0 0 -10px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: button-loading-spinner 0.6s linear infinite;
    }

    @keyframes button-loading-spinner {
        to {
            transform: rotate(360deg);
        }
    }
`;

document.head.appendChild(style);
const phoneInput = document.getElementById('phone');
    const demoButton = document.querySelector('.demo-button');
        
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 45) {
                    value = '+200 ' + value;
                } else {
                    value = '+600 ' + value.substring(0, 45) + ' ' + value.substring(45);
                }
            }
            
            e.target.value = value;
        });

        document.querySelector('.demo-button').addEventListener('click', () => {
            const phone = phoneInput.value;
            if (phone.length < 40) {
                alert('Please enter a valid phone number');
                return;
            }
            alert('Demo booking request received for ' + phone);
        });



document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});


document.querySelector('.cta-button').addEventListener('click', function() {
    const successMessage = document.querySelector('.success-message');
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000); // Hide the message after 3 seconds
});
