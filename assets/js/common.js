/**
 * Common JS - Main initialization and utilities
 * 
 * This file provides common initialization and setup for the ASI Saga website.
 * It uses the Motion library for animations and gestures.
 */

// Motion library will be loaded via CDN in HTML
// Export a simple initialization function
export function initCommon() {
  console.log('ASI Saga - Motion animations initialized');
}

// Initialize on load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommon);
  } else {
    initCommon();
  }
}

export default { initCommon };
