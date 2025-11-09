// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const testimonialCarousel = document.querySelector('.testimonials-carousel');
const contactForm = document.querySelector('#contact-form');

// Video Modal Elements
const videoModal = document.querySelector('#videoModal');
const watchDemoBtn = document.querySelector('#watchDemoBtn');
const heroPlayButton = document.querySelector('#heroPlayButton');
const videoPreviewContainer = document.querySelector('.video-preview-container');
const closeModal = document.querySelector('.close-modal');
const videoIframe = document.querySelector('#videoModal iframe');

// Navigation Toggle
navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            navMenu?.classList.remove('active');
            window.scrollTo({
                top: target.offsetTop - navbar.offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.1 });

// Add animation attributes to elements
document.querySelectorAll('section').forEach(section => {
    section.setAttribute('data-animate', '');
    animateOnScroll.observe(section);
});

document.querySelectorAll('.feature-card, .step, .use-case, .testimonial').forEach(element => {
    element.setAttribute('data-animate', '');
    animateOnScroll.observe(element);
});

// Testimonials Carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const prevButton = document.querySelector('.carousel-controls .prev');
const nextButton = document.querySelector('.carousel-controls .next');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
        if (i === index) {
            testimonial.classList.add('carousel-fade');
        }
    });
}

// Initialize first testimonial
if (testimonials.length > 0) {
    showTestimonial(0);
}

// Previous testimonial
prevButton?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Next testimonial
nextButton?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Auto-advance testimonials
setInterval(() => {
    if (testimonials.length > 1) {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
}, 5000);

// Contact Form Handling
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
        // Here you would typically send the data to your server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', data);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thanks for your message! We\'ll get back to you soon.';
        successMessage.style.cssText = `
            background: #4CAF50;
            color: white;
            padding: 1rem;
            border-radius: var(--button-radius);
            margin-top: 1rem;
        `;
        
        contactForm.appendChild(successMessage);
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
    } catch (error) {
        console.error('Error submitting form:', error);
    }
});

// Initialize animations on page load
// Video Modal Handling
const openVideoModal = () => {
    const videoId = '5tZn6lqABsY';
    videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    videoModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
};

watchDemoBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openVideoModal();
});

// Add click handlers for video preview
videoPreviewContainer?.addEventListener('click', () => {
    openVideoModal();
});

heroPlayButton?.addEventListener('click', () => {
    openVideoModal();
});

closeModal?.addEventListener('click', () => {
    videoModal.style.display = 'none';
    videoIframe.src = ''; // Stop video playback
    document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside the video
videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        videoIframe.src = '';
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'block') {
        videoModal.style.display = 'none';
        videoIframe.src = '';
        document.body.style.overflow = '';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to hero section elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.querySelector('h1')?.classList.add('fade-in-down');
        heroContent.querySelector('p')?.classList.add('fade-in-up');
        heroContent.querySelector('.cta-buttons')?.classList.add('fade-in-up');
    }
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.classList.add('slide-in-right');
    }
    
    // Add stagger animations to lists
    document.querySelectorAll('.features-grid, .steps, .use-cases-grid')
        .forEach(grid => grid.classList.add('stagger-fade-in'));
    
    // Add bounce animation to social links
    document.querySelectorAll('.social-links a')
        .forEach(link => link.classList.add('bounce-hover'));
});