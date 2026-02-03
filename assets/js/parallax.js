/**
 * Transcendent parallax scrolling using Motion library
 */

function initializeTranscendentParallax() {
  // Wait for Motion to be available
  if (!window.Motion || !window.Motion.scroll || !window.Motion.animate) {
    console.warn('Motion library not loaded yet');
    return;
  }
  
  const { scroll, animate } = window.Motion;
  const parallaxElements = document.querySelectorAll('[data-speed]');
  
  parallaxElements.forEach(element => {
    const speed = parseFloat(element.dataset.speed || '0.5');
    
    // Use Motion's scroll-linked animation
    scroll(
      animate(element, {
        transform: [`translateY(0px)`, `translateY(${speed * 100}px)`]
      }),
      { 
        target: element,
        offset: ["start end", "end start"]
      }
    );
  });
}

// Wait for Motion library to load
function waitForMotion() {
  if (window.Motion) {
    initializeTranscendentParallax();
  } else {
    setTimeout(waitForMotion, 100);
  }
}

document.addEventListener('DOMContentLoaded', waitForMotion);

export { initializeTranscendentParallax };
