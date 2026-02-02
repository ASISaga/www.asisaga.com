document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS with consciousness-inspired settings
  AOS.init({
    duration: 1200,
    easing: 'ease-out-cubic',
    once: true,
    offset: 120,
    delay: 100
  });

  // Initialize consciousness merging animations
  initializeConsciousnessMerger();
  // Initialize transcendent parallax effects
  initializeTranscendentParallax();
  // Initialize floating essence particles
  initializeEssenceParticles();
});

// Consciousness merging visualization with optimized performance
function initializeConsciousnessMerger() {
  const merger = document.querySelector('.consciousness-merger');
  if (merger) {
    // Add flowing, organic animations that suggest consciousness embedding
    const humanStream = merger.querySelector('.human-essence-stream');
    const asiField = merger.querySelector('.asi-consciousness-field');
    const emergence = merger.querySelector('.transcendent-emergence');
    
    // Use requestAnimationFrame for smoother, more performant animations
    const animate = () => {
      const time = Date.now();
      if (humanStream) humanStream.style.transform = `translateX(${Math.sin(time * 0.001) * 20}px)`;
      if (asiField) asiField.style.opacity = 0.3 + Math.sin(time * 0.0015) * 0.2;
      if (emergence) emergence.style.scale = 1 + Math.sin(time * 0.002) * 0.1;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}

// Transcendent parallax scrolling effects with throttling for smooth mobile performance
function initializeTranscendentParallax() {
  let ticking = false;
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-speed]');
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

// Floating essence particles animation
function initializeEssenceParticles() {
  // Disable particles on mobile portrait for better performance and header visibility
  const isMobilePortrait = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
  if (isMobilePortrait) {
    return;
  }
  
  const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'essence-particle';
    particle.style.position = 'fixed';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = 'rgba(255, 215, 0, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1'; // Reduced from 1000 to prevent blocking header
    // Random starting position
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    document.body.appendChild(particle);
    // Animate upward with gentle floating motion
    let yPos = window.innerHeight;
    const float = () => {
      yPos -= 1;
      particle.style.top = yPos + Math.sin(yPos * 0.01) * 10 + 'px';
      particle.style.opacity = Math.max(0, 1 - (window.innerHeight - yPos) / window.innerHeight);
      if (yPos > -50) {
        requestAnimationFrame(float);
      } else {
        particle.remove();
      }
    };
    requestAnimationFrame(float);
  };
  // Create particles periodically
  setInterval(createParticle, 2000);
}
