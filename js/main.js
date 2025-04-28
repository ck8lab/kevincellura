document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it and show an alert
            console.log({name, email, subject, message});
            
            alert('Grazie per il tuo messaggio! Ti risponderò al più presto.');
            contactForm.reset();
        });
    }
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.section-header, .service-card, .skill, .contact-item');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // Add animate class to sections on scroll
    const sections = document.querySelectorAll('section');
    
    const animateSections = function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateSections);
    animateSections(); // Initial check
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tech Sphere interactive effects
    const techIcons = document.querySelectorAll('.tech-icon');
    if (techIcons.length > 0) {
        // Add hover effect to make icons pop out
        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = this.style.transform.replace('scale(1)', '') + ' scale(1.2)';
                this.style.zIndex = '10';
                this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.4)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' scale(1.2)', '');
                this.style.zIndex = '1';
                this.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
            });
        });
        
        // Add pause animation on hover over the sphere container
        const techSphere = document.querySelector('.tech-sphere');
        const techSphereContainer = document.querySelector('.tech-sphere-container');
        
        if (techSphereContainer && techSphere) {
            techSphereContainer.addEventListener('mouseenter', function() {
                techSphere.style.animationPlayState = 'paused';
            });
            
            techSphereContainer.addEventListener('mouseleave', function() {
                techSphere.style.animationPlayState = 'running';
            });
        }
    }
});

// Email direct send functionality
const sendMailBtn = document.getElementById('sendMailBtn');
if (sendMailBtn) {
    sendMailBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Per favore, compila tutti i campi');
            return;
        }
        
        const mailtoLink = `mailto:k3vin.cellura@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Nome: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
        
        window.location.href = mailtoLink;
    });
}

// Fix per il problema di rendering della tech sphere
document.addEventListener('DOMContentLoaded', function() {
    // Forza un reflow per correggere eventuali problemi di rendering
    const techSphere = document.querySelector('.tech-sphere');
    if (techSphere) {
        // Trigger reflow
        void techSphere.offsetWidth;
        
        // Assicurati che tutti gli elementi abbiano un corretto z-index
        const techIcons = document.querySelectorAll('.tech-icon');
        techIcons.forEach((icon, index) => {
            // Forza un reflow anche sulle icone
            void icon.offsetWidth;
        });
    }
});


renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('bg-canvas'),
    alpha: true,
    antialias: true
});

// Aggiungi alla fine del file main.js
document.addEventListener('DOMContentLoaded', function() {
    // Carica lo script di Pacman
    const pacmanScript = document.createElement('script');
    pacmanScript.src = 'js/pacman.js';
    document.body.appendChild(pacmanScript);
});