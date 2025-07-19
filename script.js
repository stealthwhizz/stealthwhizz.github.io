function toggleProject(element) {
    // Close all other projects
    const allProjects = document.querySelectorAll('.project');
    allProjects.forEach(project => {
        if (project !== element) {
            project.classList.remove('active');
        }
    });
    
    // Toggle current project
    element.classList.toggle('active');
}

// Add staggered animation delays
const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.2}s`;
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add parallax effect to glow
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const glow = document.querySelector('.glow');
    if (glow) {
        glow.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add intersection observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
});

sections.forEach(section => {
    observer.observe(section);
});

// Add typing animation completion handler
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        // Remove the typewriter effect after animation completes
        setTimeout(() => {
            typewriterElement.style.borderRight = 'none';
        }, 4500); // Adjust timing based on your animation duration
    }
});

// Enhanced project interaction for better UX
document.querySelectorAll('.project').forEach(project => {
    // Add keyboard accessibility
    project.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleProject(this);
        }
    });
    
    // Add tabindex for keyboard navigation
    project.setAttribute('tabindex', '0');
});

// Smooth fade-in animations for skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.opacity = '0';
    tag.style.animation = 'fadeInUp 0.5s ease forwards';
});

// Create fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add click effect to contact links
document.querySelectorAll('.contact-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 136, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimization: Throttle scroll events
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const glow = document.querySelector('.glow');
    if (glow) {
        glow.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);