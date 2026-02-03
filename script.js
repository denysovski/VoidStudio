// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const navLinks = document.querySelectorAll('.nav-link');

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const tooltip = document.querySelector('.hover-tooltip');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const cursorOffsetY = 4;
const tooltipOffsetX = 160;
const tooltipOffsetY = -40;
const tooltipEdgePadding = 20;

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor follow
function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = (cursorY + cursorOffsetY) + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add data-text attribute to all text-stroke elements for the fade effect
document.querySelectorAll('.text-stroke').forEach(el => {
    if (!el.getAttribute('data-text')) {
        el.setAttribute('data-text', el.textContent);
    }
});

// Hover effects for custom cursor and tooltips
const hoverableElements = document.querySelectorAll('a, button, .product-image-wrapper, .stockist-item, .process-step, .gallery-item');
hoverableElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Tooltip functionality for text-stroke elements
const textStrokeElements = document.querySelectorAll('.text-stroke[data-tooltip]');
textStrokeElements.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        const tooltipText = el.getAttribute('data-tooltip');
        const title = el.getAttribute('data-text') || el.textContent;
        
        tooltip.querySelector('h4').textContent = title;
        tooltip.querySelector('p').textContent = tooltipText;
        tooltip.classList.add('active');
        cursor.classList.add('hover');
    });
    
    el.addEventListener('mousemove', (e) => {
        const rect = tooltip.getBoundingClientRect();
        const maxLeft = window.innerWidth - rect.width - tooltipEdgePadding;
        const desiredLeft = e.clientX + tooltipOffsetX;
        const left = Math.min(Math.max(desiredLeft, tooltipEdgePadding), maxLeft);

        tooltip.style.left = left + 'px';
        tooltip.style.top = (e.clientY + tooltipOffsetY) + 'px';
    });
    
    el.addEventListener('mouseleave', () => {
        tooltip.classList.remove('active');
        cursor.classList.remove('hover');
    });
});

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    });
});

// Smooth scroll for desktop nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navigation scroll effect
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '-50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

// Parallax effect for background elements (optional enhancement)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for section numbers
    const sectionNumbers = document.querySelectorAll('.section-number');
    sectionNumbers.forEach(num => {
        const speed = 0.3;
        num.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Parallax for editorial background
    const editorialBg = document.querySelector('.editorial-bg img');
    if (editorialBg) {
        const editorialSection = document.querySelector('.editorial-section');
        const rect = editorialSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.5;
            const yPos = -(rect.top * speed);
            editorialBg.style.transform = `translateY(${yPos}px)`;
        }
    }
});

// Smooth reveal for hero section on load
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-section .fade-in-up, .hero-section .scale-in');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, index * 150);
    });
});

// Add hover effect for product images
const productImages = document.querySelectorAll('.product-image');
productImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Prevent body scroll on resize when menu is open
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add stagger animation for info grid items
const infoItems = document.querySelectorAll('.info-item');
infoItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.15}s`;
});

// Enhanced link animations
const brutalLinks = document.querySelectorAll('.link-brutal');
brutalLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Stockist items hover effect
const stockistItems = document.querySelectorAll('.stockist-item');
stockistItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Process steps hover effect
const processSteps = document.querySelectorAll('.process-step');
processSteps.forEach(step => {
    step.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
    });
    
    step.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
});

// Prevent body scroll on resize when menu is open
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Thank you for subscribing to the void.');
            newsletterForm.reset();
        }
    });
}

// Add lazy loading for images (performance optimization)
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
            
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Add glitch effect on logo hover (optional aesthetic enhancement)
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', function() {
        this.style.textShadow = '2px 2px rgba(255,255,255,0.1), -2px -2px rgba(255,255,255,0.1)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
}

// Detect scroll direction and hide/show nav
let prevScrollPos = window.pageYOffset;
window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    
    if (prevScrollPos > currentScrollPos) {
        nav.style.transform = 'translateY(0)';
    } else if (currentScrollPos > 100) {
        // Uncomment to hide nav on scroll down
        // nav.style.transform = 'translateY(-100%)';
    }
    
    prevScrollPos = currentScrollPos;
});

console.log('VOID - Exist in the void. Website loaded successfully.');
