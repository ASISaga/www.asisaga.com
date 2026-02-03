/**
 * Motion Scroll Animation System
 * 
 * Replaces AOS (Animate On Scroll) with Motion library for better performance
 * and more flexible animation control.
 * 
 * @see https://motion.dev
 */

import { scrollPresets, fadePresets, consciousnessPresets } from './animation-presets.js';

/**
 * Initialize scroll-triggered animations
 */
export function initializeScrollAnimations() {
  // Wait for Motion to be available
  if (!window.Motion || !window.Motion.animate || !window.Motion.inView) {
    console.warn('Motion library not loaded yet');
    return;
  }
  
  const { animate, inView } = window.Motion;
  
  // Find all elements with data-motion attribute
  const elements = document.querySelectorAll('[data-motion]');
  
  elements.forEach(element => {
    const animationType = element.getAttribute('data-motion');
    const delay = parseFloat(element.getAttribute('data-motion-delay') || '0');
    const duration = parseFloat(element.getAttribute('data-motion-duration') || '0.8');
    const once = element.getAttribute('data-motion-once') !== 'false';
    
    // Get the appropriate animation preset
    const animation = getAnimationPreset(animationType);
    
    if (!animation) {
      console.warn(`Unknown animation type: ${animationType}`);
      return;
    }
    
    // Set initial state
    if (animation.initial) {
      Object.assign(element.style, convertToStyles(animation.initial));
    }
    
    // Setup scroll trigger
    inView(
      element,
      ({ target }) => {
        // Animate to final state
        const finalState = animation.animate || animation.whileInView;
        const transition = {
          ...animation.transition,
          duration: duration,
          delay: delay
        };
        
        animate(
          target,
          convertToStyles(finalState),
          transition
        );
        
        return (leave) => {
          // Optional: Reset on leave if not "once"
          if (!once && animation.initial) {
            animate(
              target,
              convertToStyles(animation.initial),
              { duration: 0.3 }
            );
          }
        };
      },
      { 
        margin: animation.viewport?.margin || "0px 0px -100px 0px"
      }
    );
  });
}

/**
 * Get animation preset by name
 * @param {string} type - Animation type
 * @returns {Object} Animation configuration
 */
function getAnimationPreset(type) {
  const presets = {
    // Fade animations
    'fade-in': fadePresets.fadeIn,
    'fade-up': fadePresets.fadeUp,
    'fade-down': fadePresets.fadeDown,
    'fade-left': fadePresets.fadeLeft,
    'fade-right': fadePresets.fadeRight,
    
    // Consciousness animations
    'sacred-fade': consciousnessPresets.sacredFade,
    'emergence': consciousnessPresets.emergence,
    'merging': consciousnessPresets.merging,
    
    // Scroll presets
    'scroll-default': scrollPresets.default,
    'scroll-fast': scrollPresets.fast,
    'scroll-slow': scrollPresets.slow
  };
  
  return presets[type] || fadePresets.fadeUp;
}

/**
 * Convert animation values to CSS styles
 * @param {Object} values - Animation values
 * @returns {Object} CSS style object
 */
function convertToStyles(values) {
  const styles = {};
  
  Object.entries(values).forEach(([key, value]) => {
    switch (key) {
      case 'opacity':
        styles.opacity = value;
        break;
      case 'scale':
        styles.transform = `${styles.transform || ''} scale(${value})`.trim();
        break;
      case 'x':
        const xValue = typeof value === 'number' ? `${value}px` : value;
        styles.transform = `${styles.transform || ''} translateX(${xValue})`.trim();
        break;
      case 'y':
        const yValue = typeof value === 'number' ? `${value}px` : value;
        styles.transform = `${styles.transform || ''} translateY(${yValue})`.trim();
        break;
      case 'rotate':
        styles.transform = `${styles.transform || ''} rotate(${value}deg)`.trim();
        break;
      case 'filter':
        styles.filter = value;
        break;
    }
  });
  
  return styles;
}

/**
 * Initialize parallax scrolling with Motion
 * @param {string} selector - Element selector
 * @param {Object} options - Parallax options
 */
export function initializeParallax(selector = '[data-parallax]', options = {}) {
  // Wait for Motion to be available
  if (!window.Motion || !window.Motion.scroll || !window.Motion.animate) {
    console.warn('Motion library not loaded yet');
    return;
  }
  
  const { scroll, animate } = window.Motion;
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    const speed = parseFloat(element.getAttribute('data-parallax-speed') || options.speed || '0.5');
    
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

/**
 * Apply continuous animation (like pulse or glow)
 * @param {HTMLElement} element - Element to animate
 * @param {Object} animation - Animation configuration
 */
export function applyContinuousAnimation(element, animation) {
  // Wait for Motion to be available
  if (!window.Motion || !window.Motion.animate) {
    console.warn('Motion library not loaded yet');
    return;
  }
  
  const { animate } = window.Motion;
  
  if (animation.animate) {
    animate(
      element,
      animation.animate,
      animation.transition
    );
  }
}

/**
 * Initialize all Motion-based scroll and parallax animations
 */
export function initializeMotionScroll() {
  // Wait for DOM to be ready and Motion to be available
  const init = () => {
    if (window.Motion) {
      initializeScrollAnimations();
      initializeParallax();
    } else {
      setTimeout(init, 100);
    }
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

// Auto-initialize if this script is loaded
if (typeof window !== 'undefined') {
  initializeMotionScroll();
}

export default {
  initializeScrollAnimations,
  initializeParallax,
  applyContinuousAnimation,
  initializeMotionScroll
};
