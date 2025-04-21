// Three.js Animation Script
let scene, camera, renderer;
let particles, particleSystem;
let animationFrameId;

// Initialize Three.js scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('bg-canvas'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Create directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create particle background
    createParticles();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// Create particle system for background
function createParticles() {
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 100;
        particlePositions[i + 1] = (Math.random() - 0.5) * 100;
        particlePositions[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x3b82f6,
        size: 0.1,
        transparent: true,
        opacity: 0.7
    });
    
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    animationFrameId = requestAnimationFrame(animate);
    
    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
    }
    
    // Parallax effect on scroll
    const scrollY = window.scrollY;
    if (particles) {
        particles.position.y = scrollY * 0.001;
    }
    
    renderer.render(scene, camera);
}

// Add mouse movement effect for particles
function addMouseInteraction() {
    document.addEventListener('mousemove', (event) => {
        if (!particles) return;
        
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        particles.rotation.x += mouseY * 0.0001;
        particles.rotation.y += mouseX * 0.0001;
    });
}

// Add scroll animations for elements
function addScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (scrollPosition > sectionTop) {
                section.classList.add('animate');
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    addScrollAnimations();
    addMouseInteraction();
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    window.removeEventListener('resize', onWindowResize);
});