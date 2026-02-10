// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.carousel-dots');

// Create dots for carousel
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

// Show specific slide
function showSlide(n) {
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Wrap around if necessary
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Move carousel
function moveCarousel(direction) {
    showSlide(currentSlide + direction);
}

// Go to specific slide
function goToSlide(n) {
    showSlide(n);
}

// Auto play carousel
function autoPlayCarousel() {
    moveCarousel(1);
}

// Initialize carousel
createDots();
let autoPlay = setInterval(autoPlayCarousel, 5000);

// Pause auto play on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlay);
});

carousel.addEventListener('mouseleave', () => {
    autoPlay = setInterval(autoPlayCarousel, 5000);
});

// Tab switching functionality
function switchTab(tabIndex) {
    const tabs = document.querySelectorAll('.tab');
    
    // Remove active class from all tabs
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    tabs[tabIndex].classList.add('active');
    
    // Here you can add logic to filter/change content based on tab
    // For example:
    if (tabIndex === 0) {
        // Show all manga
        console.log('Showing all manga');
    } else if (tabIndex === 1) {
        // Show read manga
        console.log('Showing read manga');
    }
}

// Mobile menu toggle (optional)
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Search functionality (optional)
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    // Add your search logic here
    console.log('Search clicked');
    // You can show a search modal or redirect to search page
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Lazy loading for images (optional performance improvement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add click handlers for manga cards
document.querySelectorAll('.manga-card, .manga-card-large').forEach(card => {
    card.addEventListener('click', function() {
        // Add your navigation logic here
        console.log('Manga card clicked');
        // For example: window.location.href = '/manga-detail.html';
    });
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveCarousel(-1);
    } else if (e.key === 'ArrowRight') {
        moveCarousel(1);
    }
});

// Add animation on scroll
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

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

console.log('Website loaded successfully!');