/**
 * Consciousness merging visualization using Motion library
 */

function initializeConsciousnessMerger() {
  const merger = document.querySelector('.consciousness-merger');
  if (!merger) return;
  
  // Wait for Motion to be available
  if (!window.Motion || !window.Motion.animate) {
    console.warn('Motion library not loaded yet');
    return;
  }
  
  const { animate } = window.Motion;
  const humanStream = merger.querySelector('.human-essence-stream');
  const asiField = merger.querySelector('.asi-consciousness-field');
  const emergence = merger.querySelector('.transcendent-emergence');
  
  // Animate human essence stream with flowing motion
  if (humanStream) {
    animate(
      humanStream,
      {
        x: [0, 20, 0]
      },
      {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    );
  }
  
  // Animate ASI consciousness field with pulsing opacity
  if (asiField) {
    animate(
      asiField,
      {
        opacity: [0.3, 0.5, 0.3]
      },
      {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    );
  }
  
  // Animate transcendent emergence with gentle scaling
  if (emergence) {
    animate(
      emergence,
      {
        scale: [1, 1.1, 1]
      },
      {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    );
  }
}

// Wait for Motion library to load
function waitForMotion() {
  if (window.Motion) {
    initializeConsciousnessMerger();
  } else {
    setTimeout(waitForMotion, 100);
  }
}

document.addEventListener('DOMContentLoaded', waitForMotion);

export { initializeConsciousnessMerger };
