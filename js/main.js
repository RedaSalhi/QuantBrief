// main.js - Shared JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Subscribe form handling (if present on page)
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (email && email.includes('@')) {
                // Show loading state
                const button = this.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                button.textContent = 'Subscribing...';
                button.disabled = true;
                
                // Simulate API call (replace with actual implementation)
                setTimeout(() => {
                    alert('Thank you for subscribing! You\'ll be notified when we launch.');
                    this.querySelector('input[type="email"]').value = '';
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1000);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Animation on scroll observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .value-card, .team-member, .newsletter-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Mobile menu toggle (for future implementation)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Newsletter preview interaction
    const newsletterMockup = document.querySelector('.newsletter-mockup');
    if (newsletterMockup) {
        newsletterMockup.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        newsletterMockup.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }

    // Lazy loading for images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Performance monitoring (simple)
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
            
            // Send to analytics if needed
            // analytics.track('page_load_time', { time: loadTime });
        });
    }

    // Error handling for external resources
    window.addEventListener('error', function(e) {
        console.warn('Resource loading error:', e.target.src || e.target.href);
    });

    // Simple analytics placeholder (replace with actual implementation)
    function trackEvent(eventName, properties = {}) {
        // Replace with your analytics implementation
        console.log('Event tracked:', eventName, properties);
        
        // Example implementations:
        // gtag('event', eventName, properties);
        // analytics.track(eventName, properties);
        // mixpanel.track(eventName, properties);
    }

    // Track navigation clicks
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('navigation_click', {
                page: this.textContent.trim(),
                url: this.href
            });
        });
    });

    // Track CTA clicks
    document.querySelectorAll('.cta-button, .btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', {
                text: this.textContent.trim(),
                location: this.closest('section')?.className || 'unknown'
            });
        });
    });

    // Newsletter signup tracking
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function() {
            trackEvent('newsletter_signup_attempt');
        });
    }
});

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for use in other scripts
window.quantBrief = {
    trackEvent,
    debounce,
    throttle
};
