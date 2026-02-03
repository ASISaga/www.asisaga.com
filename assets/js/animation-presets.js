/**
 * Animation Presets Library
 * 
 * Reusable Motion animation configurations for ASI Saga website.
 * Uses the Motion library for smooth, performant animations.
 * 
 * @see https://motion.dev
 */

// Import Motion utilities
// Note: Motion is loaded via CDN or bundler, utilities available globally

/**
 * Fade Animations
 */
export const fadePresets = {
  // Basic fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  // Fade in with delay
  fadeInDelayed: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
  },
  
  // Fade up
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  
  // Fade down
  fadeDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  
  // Fade left
  fadeLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  
  // Fade right
  fadeRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

/**
 * Scale Animations
 */
export const scalePresets = {
  // Scale up
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  // Scale down
  scaleDown: {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  // Pulse (continuous)
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

/**
 * Slide Animations
 */
export const slidePresets = {
  // Slide from left
  slideFromLeft: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  // Slide from right
  slideFromRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  // Slide from top
  slideFromTop: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  // Slide from bottom
  slideFromBottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

/**
 * Consciousness-Themed Animations
 * Special animations for ASI Saga's consciousness-merging theme
 */
export const consciousnessPresets = {
  // Sacred fade - ethereal appearance
  sacredFade: {
    initial: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    transition: { duration: 1.2, ease: "easeOut" }
  },
  
  // Emergence - like consciousness emerging
  emergence: {
    initial: { opacity: 0, scale: 0.5, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { 
      duration: 1.0,
      ease: [0.34, 1.56, 0.64, 1] // Custom spring-like ease
    }
  },
  
  // Transcendent glow
  transcendentGlow: {
    animate: {
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.02, 1]
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  // Consciousness flow
  consciousnessFlow: {
    animate: {
      x: [0, 20, 0],
      opacity: [0.3, 0.5, 0.3]
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  // Merging effect
  merging: {
    initial: { opacity: 0, scale: 0.8, rotate: -5 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
    },
    transition: { 
      duration: 1.4,
      ease: "easeOut"
    }
  }
};

/**
 * Parallax Presets
 */
export const parallaxPresets = {
  // Slow parallax
  slow: {
    speed: 0.2
  },
  
  // Medium parallax
  medium: {
    speed: 0.5
  },
  
  // Fast parallax
  fast: {
    speed: 0.8
  }
};

/**
 * Scroll Animation Presets
 * Configurations for scroll-triggered animations
 */
export const scrollPresets = {
  // Default scroll animation
  default: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  
  // Fast scroll
  fast: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -50px 0px" },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  
  // Slow scroll
  slow: {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -150px 0px" },
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

/**
 * Helper function to combine presets
 * @param {...Object} presets - Animation preset objects to merge
 * @returns {Object} Combined animation configuration
 */
export function combinePresets(...presets) {
  return Object.assign({}, ...presets);
}

/**
 * Helper function to create staggered children animation
 * @param {Object} childPreset - Animation preset for children
 * @param {number} staggerDelay - Delay between each child (default: 0.1)
 * @returns {Object} Stagger configuration
 */
export function staggerChildren(childPreset, staggerDelay = 0.1) {
  return {
    animate: {
      transition: {
        staggerChildren: staggerDelay
      }
    },
    ...childPreset
  };
}

/**
 * All presets combined for easy access
 */
export const allPresets = {
  fade: fadePresets,
  scale: scalePresets,
  slide: slidePresets,
  consciousness: consciousnessPresets,
  parallax: parallaxPresets,
  scroll: scrollPresets
};

export default allPresets;
