/**
 * PREMIUM PHOTOGRAPHY WEBSITE - MAIN JAVASCRIPT
 * Premium Interactions & Animations
 * Author: Santhosh Sharuk
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavbar();
    initHero();
    initTestimonials();
    initVideoModal();
    initScrollAnimations();
    initParallax();
    initParticles();
    initAOS();
});

// ============================================
// CUSTOM CURSOR
// ============================================

function initCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    
    animateOutline();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .feature-card, .pricing-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '48px';
            cursorOutline.style.height = '48px';
            cursorOutline.style.background = 'rgba(255, 107, 53, 0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '32px';
            cursorOutline.style.height = '32px';
            cursorOutline.style.background = 'transparent';
        });
    });
}

// ============================================
// NAVBAR
// ============================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// HERO SECTION
// ============================================

function initHero() {
    const heroPlayButton = document.getElementById('heroPlayButton');
    const watchDemoBtn = document.getElementById('watchDemoBtn');
    const videoPreviewContainer = document.querySelector('.video-preview-container');
    
    if (heroPlayButton) {
        heroPlayButton.addEventListener('click', openYouTubeVideo);
    }
    
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openYouTubeVideo();
        });
    }
    
    if (videoPreviewContainer) {
        videoPreviewContainer.addEventListener('click', openYouTubeVideo);
        videoPreviewContainer.style.cursor = 'pointer';
    }
}

function openYouTubeVideo() {
    window.open('https://youtu.be/5tZn6lqABsY', '_blank');
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================

function initTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        let next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        let prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play
    setInterval(nextSlide, 5000);
}

// ============================================
// VIDEO MODAL
// ============================================

function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const iframe = modal ? modal.querySelector('iframe') : null;
    
    if (closeModal) {
        closeModal.addEventListener('click', closeVideoModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = modal ? modal.querySelector('iframe') : null;
    
    if (modal && iframe) {
        const videoSrc = 'https://www.youtube.com/embed/5tZn6lqABsY?autoplay=1';
        iframe.src = videoSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = modal ? modal.querySelector('iframe') : null;
    
    if (modal && iframe) {
        iframe.src = '';
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (!parallaxElements.length) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// PARTICLE EFFECT
// ============================================

function initParticles() {
    const particleContainers = document.querySelectorAll('.hero-particles, .cta-particles');
    
    particleContainers.forEach(container => {
        if (!container) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 107, 53, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(particle);
        }
    });
}

// ============================================
// SIMPLE AOS (Animate On Scroll)
// ============================================

function initAOS() {
    // Already handled in initScrollAnimations
    // This function is for backwards compatibility
}

// ============================================
// SMOOTH SCROLL TO TOP
// ============================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function
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

// Throttle function
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

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c Premium Photography Website ', 'background: linear-gradient(135deg, #FF6B35 0%, #FF8555 100%); color: white; font-size: 16px; padding: 10px 20px; font-weight: bold; border-radius: 4px;');
console.log('%c Designed & Developed by Santhosh Sharuk ', 'color: #FF6B35; font-size: 12px; padding: 5px 0;');

