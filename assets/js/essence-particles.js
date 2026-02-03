/**
 * Floating essence particles animation using Motion library
 */

function initializeEssenceParticles() {
  // Disable particles on mobile portrait for better performance and header visibility
  const isMobilePortrait = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
  if (isMobilePortrait) {
    return;
  }
  
  // Wait for Motion to be available
  if (!window.Motion || !window.Motion.animate) {
    console.warn('Motion library not loaded yet');
    return;
  }
  
  const { animate } = window.Motion;
  
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
    
    // Animate with Motion library
    const startY = window.innerHeight;
    const endY = -50;
    const duration = (startY - endY) / 60; // ~60px per second
    
    animate(
      particle,
      {
        y: [0, -(startY + 50)],
        x: [0, Math.sin(startY * 0.01) * 10],
        opacity: [0, 1, 1, 0]
      },
      {
        duration: duration,
        ease: "linear",
        onComplete: () => {
          particle.remove();
        }
      }
    );
  };
  
  setInterval(createParticle, 2000);
}

// Wait for Motion library to load
function waitForMotion() {
  if (window.Motion) {
    initializeEssenceParticles();
  } else {
    setTimeout(waitForMotion, 100);
  }
}

document.addEventListener('DOMContentLoaded', waitForMotion);

export { initializeEssenceParticles };
