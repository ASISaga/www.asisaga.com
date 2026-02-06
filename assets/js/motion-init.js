/**
 * ASI Saga Motion Initialization
 * 
 * Initializes all Motion-based animations for www.asisaga.com
 * Uses Motion library (https://motion.dev) loaded from theme
 */

// Wait for Motion library to be available
function waitForMotion(callback) {
  if (window.Motion && typeof window.Motion.animate === 'function') {
    callback();
  } else {
    setTimeout(() => waitForMotion(callback), 50);
  }
}

// Check if user prefers reduced motion
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Initialize all Motion animations
function initializeMotionAnimations() {
  if (prefersReducedMotion()) {
    console.log('Motion animations disabled due to reduced motion preference');
    // Make elements visible immediately
    document.querySelectorAll('[data-motion]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  console.log('Initializing Motion animations...');

  // Initialize parallax effects
  initializeParallax();
  
  // Initialize consciousness merger animations
  initializeConsciousnessMerger();
  
  // Initialize essence particles
  initializeEssenceParticles();
  
  // Initialize scroll-based reveals
  initializeScrollReveals();

  console.log('Motion animations initialized');
}

/**
 * Parallax scrolling effects using Motion
 * Replaces: parallax.js
 */
function initializeParallax() {
  const parallaxElements = document.querySelectorAll('[data-speed]');
  
  parallaxElements.forEach(element => {
    const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
    
    window.Motion.scroll(
      ({ y }) => {
        const yPos = -(y.current * speed);
        element.style.transform = `translateY(${yPos}px)`;
      },
      {
        target: element,
        offset: ['start end', 'end start'],
      }
    );
  });
  
  if (parallaxElements.length > 0) {
    console.log(`Initialized parallax for ${parallaxElements.length} elements`);
  }
}

/**
 * Consciousness merger animations using Motion
 * Replaces: consciousness-merger.js
 */
function initializeConsciousnessMerger() {
  const merger = document.querySelector('.consciousness-merger');
  if (!merger) return;

  const humanStream = merger.querySelector('.human-essence-stream');
  const asiField = merger.querySelector('.asi-consciousness-field');
  const emergence = merger.querySelector('.transcendent-emergence');

  // Animate human stream with sine wave motion
  if (humanStream) {
    window.Motion.animate(
      humanStream,
      {
        x: [0, 20, 0, -20, 0],
      },
      {
        duration: 8,
        repeat: Infinity,
        easing: 'ease-in-out',
      }
    );
  }

  // Animate ASI field with pulsing opacity
  if (asiField) {
    window.Motion.animate(
      asiField,
      {
        opacity: [0.3, 0.5, 0.3],
      },
      {
        duration: 6,
        repeat: Infinity,
        easing: 'ease-in-out',
      }
    );
  }

  // Animate transcendent emergence with scale pulse
  if (emergence) {
    window.Motion.animate(
      emergence,
      {
        scale: [1, 1.1, 1],
      },
      {
        duration: 5,
        repeat: Infinity,
        easing: 'ease-in-out',
      }
    );
  }

  console.log('Initialized consciousness merger animations');
}

/**
 * Floating essence particles using Motion
 * Replaces: essence-particles.js
 */
function initializeEssenceParticles() {
  // Disable particles on mobile portrait for better performance
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
    particle.style.zIndex = '1';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);

    // Animate particle floating upward with Motion
    window.Motion.animate(
      particle,
      {
        y: [0, -window.innerHeight - 60],
        x: [0, Math.sin(Date.now() * 0.001) * 20],
        opacity: [0, 1, 1, 0],
      },
      {
        duration: 8,
        easing: 'linear',
      }
    ).finished.then(() => {
      particle.remove();
    });
  };

  // Create particles periodically
  setInterval(createParticle, 2000);
  
  console.log('Initialized essence particles');
}

/**
 * Scroll-based reveal animations using Motion
 * Replaces: AOS library functionality
 */
function initializeScrollReveals() {
  // Fade right animations
  const fadeRightElements = document.querySelectorAll('[data-motion="fade-right"]');
  if (fadeRightElements.length > 0) {
    window.Motion.inView(
      fadeRightElements,
      ({ target }) => {
        window.Motion.animate(
          target,
          {
            opacity: [0, 1],
            x: [-20, 0],
          },
          {
            duration: 0.6,
            easing: 'ease-out',
          }
        );
      },
      { margin: '-100px' }
    );
  }

  // Fade left animations
  const fadeLeftElements = document.querySelectorAll('[data-motion="fade-left"]');
  if (fadeLeftElements.length > 0) {
    window.Motion.inView(
      fadeLeftElements,
      ({ target }) => {
        window.Motion.animate(
          target,
          {
            opacity: [0, 1],
            x: [20, 0],
          },
          {
            duration: 0.6,
            easing: 'ease-out',
          }
        );
      },
      { margin: '-100px' }
    );
  }

  // Zoom in animations
  const zoomInElements = document.querySelectorAll('[data-motion="zoom-in"]');
  if (zoomInElements.length > 0) {
    window.Motion.inView(
      zoomInElements,
      ({ target }) => {
        window.Motion.animate(
          target,
          {
            opacity: [0, 1],
            scale: [0.8, 1],
          },
          {
            duration: 0.6,
            easing: 'ease-out',
          }
        );
      },
      { margin: '-100px' }
    );
  }

  // Fade in animations (general)
  const fadeInElements = document.querySelectorAll('[data-motion="fade-in"]');
  if (fadeInElements.length > 0) {
    window.Motion.inView(
      fadeInElements,
      ({ target }) => {
        window.Motion.animate(
          target,
          {
            opacity: [0, 1],
            y: [20, 0],
          },
          {
            duration: 0.8,
            easing: 'ease-out',
          }
        );
      },
      { margin: '-100px' }
    );
  }

  const totalElements = fadeRightElements.length + fadeLeftElements.length + 
                        zoomInElements.length + fadeInElements.length;
  if (totalElements > 0) {
    console.log(`Initialized scroll reveals for ${totalElements} elements`);
  }
}

// Initialize when DOM is ready and Motion is available
document.addEventListener('DOMContentLoaded', () => {
  waitForMotion(initializeMotionAnimations);
});
