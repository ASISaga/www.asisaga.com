/**
 * Gesture Support Module
 * 
 * Provides swipe, drag, and pinch gesture support using Motion library
 * and native touch events.
 * 
 * @see https://motion.dev
 */

/**
 * Swipe Gesture Handler
 */
export class SwipeGesture {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      threshold: options.threshold || 50, // Minimum distance for swipe
      timeout: options.timeout || 500,     // Maximum time for swipe
      onSwipeLeft: options.onSwipeLeft || null,
      onSwipeRight: options.onSwipeRight || null,
      onSwipeUp: options.onSwipeUp || null,
      onSwipeDown: options.onSwipeDown || null,
      ...options
    };
    
    this.startX = 0;
    this.startY = 0;
    this.startTime = 0;
    
    this.init();
  }
  
  init() {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
  }
  
  handleTouchStart(e) {
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
    this.startTime = Date.now();
  }
  
  handleTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const endTime = Date.now();
    
    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    const deltaTime = endTime - this.startTime;
    
    // Check if swipe is valid
    if (deltaTime > this.options.timeout) return;
    
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    // Determine swipe direction
    if (absX > absY && absX > this.options.threshold) {
      // Horizontal swipe
      if (deltaX > 0) {
        this.triggerSwipe('right', deltaX);
      } else {
        this.triggerSwipe('left', Math.abs(deltaX));
      }
    } else if (absY > absX && absY > this.options.threshold) {
      // Vertical swipe
      if (deltaY > 0) {
        this.triggerSwipe('down', deltaY);
      } else {
        this.triggerSwipe('up', Math.abs(deltaY));
      }
    }
  }
  
  triggerSwipe(direction, distance) {
    const callback = this.options[`onSwipe${direction.charAt(0).toUpperCase() + direction.slice(1)}`];
    if (callback && typeof callback === 'function') {
      callback({ direction, distance, element: this.element });
    }
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('swipe', {
      detail: { direction, distance }
    }));
  }
  
  destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
  }
}

/**
 * Drag Gesture Handler
 */
export class DragGesture {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      axis: options.axis || 'both', // 'x', 'y', or 'both'
      bounds: options.bounds || null,
      onDragStart: options.onDragStart || null,
      onDrag: options.onDrag || null,
      onDragEnd: options.onDragEnd || null,
      snapBack: options.snapBack !== false,
      ...options
    };
    
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.initialTransform = { x: 0, y: 0 };
    
    this.init();
  }
  
  init() {
    this.element.style.cursor = 'grab';
    this.element.addEventListener('mousedown', this.handleStart.bind(this));
    this.element.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
  }
  
  handleStart(e) {
    e.preventDefault();
    this.isDragging = true;
    this.element.style.cursor = 'grabbing';
    
    const point = e.touches ? e.touches[0] : e;
    this.startX = point.clientX;
    this.startY = point.clientY;
    
    // Get current transform
    const transform = window.getComputedStyle(this.element).transform;
    if (transform !== 'none') {
      const matrix = new DOMMatrix(transform);
      this.initialTransform = { x: matrix.m41, y: matrix.m42 };
    }
    
    if (this.options.onDragStart) {
      this.options.onDragStart({ element: this.element });
    }
    
    document.addEventListener('mousemove', this.handleMove.bind(this));
    document.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
    document.addEventListener('mouseup', this.handleEnd.bind(this));
    document.addEventListener('touchend', this.handleEnd.bind(this));
  }
  
  handleMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    
    const point = e.touches ? e.touches[0] : e;
    const deltaX = point.clientX - this.startX;
    const deltaY = point.clientY - this.startY;
    
    this.currentX = this.initialTransform.x + deltaX;
    this.currentY = this.initialTransform.y + deltaY;
    
    // Apply axis constraints
    let x = this.options.axis === 'y' ? this.initialTransform.x : this.currentX;
    let y = this.options.axis === 'x' ? this.initialTransform.y : this.currentY;
    
    // Apply bounds if specified
    if (this.options.bounds) {
      const bounds = this.options.bounds;
      x = Math.max(bounds.left || -Infinity, Math.min(bounds.right || Infinity, x));
      y = Math.max(bounds.top || -Infinity, Math.min(bounds.bottom || Infinity, y));
    }
    
    this.element.style.transform = `translate(${x}px, ${y}px)`;
    
    if (this.options.onDrag) {
      this.options.onDrag({ x, y, deltaX, deltaY, element: this.element });
    }
  }
  
  handleEnd(e) {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.element.style.cursor = 'grab';
    
    if (this.options.onDragEnd) {
      this.options.onDragEnd({ x: this.currentX, y: this.currentY, element: this.element });
    }
    
    // Snap back to original position if enabled
    if (this.options.snapBack && window.Motion && window.Motion.animate) {
      const { animate } = window.Motion;
      animate(
        this.element,
        { transform: `translate(${this.initialTransform.x}px, ${this.initialTransform.y}px)` },
        { duration: 0.3, ease: "easeOut" }
      );
    }
    
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('touchmove', this.handleMove);
    document.removeEventListener('mouseup', this.handleEnd);
    document.removeEventListener('touchend', this.handleEnd);
  }
  
  destroy() {
    this.element.removeEventListener('mousedown', this.handleStart);
    this.element.removeEventListener('touchstart', this.handleStart);
    this.element.style.cursor = '';
  }
}

/**
 * Pinch Gesture Handler (for zoom/scale)
 */
export class PinchGesture {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      minScale: options.minScale || 0.5,
      maxScale: options.maxScale || 3,
      onPinchStart: options.onPinchStart || null,
      onPinch: options.onPinch || null,
      onPinchEnd: options.onPinchEnd || null,
      ...options
    };
    
    this.isPinching = false;
    this.initialDistance = 0;
    this.currentScale = 1;
    
    this.init();
  }
  
  init() {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }
  
  getDistance(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  handleTouchStart(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      this.isPinching = true;
      this.initialDistance = this.getDistance(e.touches[0], e.touches[1]);
      
      if (this.options.onPinchStart) {
        this.options.onPinchStart({ element: this.element });
      }
    }
  }
  
  handleTouchMove(e) {
    if (this.isPinching && e.touches.length === 2) {
      e.preventDefault();
      
      const currentDistance = this.getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / this.initialDistance;
      
      // Apply scale constraints
      this.currentScale = Math.max(
        this.options.minScale,
        Math.min(this.options.maxScale, scale)
      );
      
      this.element.style.transform = `scale(${this.currentScale})`;
      
      if (this.options.onPinch) {
        this.options.onPinch({ scale: this.currentScale, element: this.element });
      }
    }
  }
  
  handleTouchEnd(e) {
    if (this.isPinching && e.touches.length < 2) {
      this.isPinching = false;
      
      if (this.options.onPinchEnd) {
        this.options.onPinchEnd({ scale: this.currentScale, element: this.element });
      }
      
      // Optionally reset scale
      if (this.options.resetOnEnd && window.Motion && window.Motion.animate) {
        const { animate } = window.Motion;
        animate(
          this.element,
          { transform: 'scale(1)' },
          { duration: 0.3, ease: "easeOut" }
        );
        this.currentScale = 1;
      }
    }
  }
  
  destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchmove', this.handleTouchMove);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
  }
}

/**
 * Initialize gestures on elements with data attributes
 */
export function initializeGestures() {
  // Swipe gestures
  document.querySelectorAll('[data-swipe]').forEach(element => {
    const directions = element.getAttribute('data-swipe').split(',');
    const options = {};
    
    directions.forEach(dir => {
      const handler = element.getAttribute(`data-swipe-${dir.trim()}`);
      if (handler) {
        options[`onSwipe${dir.charAt(0).toUpperCase() + dir.slice(1).trim()}`] = 
          new Function('event', handler);
      }
    });
    
    new SwipeGesture(element, options);
  });
  
  // Drag gestures
  document.querySelectorAll('[data-drag]').forEach(element => {
    const axis = element.getAttribute('data-drag-axis') || 'both';
    const snapBack = element.getAttribute('data-drag-snap-back') !== 'false';
    
    new DragGesture(element, { axis, snapBack });
  });
  
  // Pinch gestures
  document.querySelectorAll('[data-pinch]').forEach(element => {
    const minScale = parseFloat(element.getAttribute('data-pinch-min') || '0.5');
    const maxScale = parseFloat(element.getAttribute('data-pinch-max') || '3');
    
    new PinchGesture(element, { minScale, maxScale });
  });
}

// Auto-initialize on DOM ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGestures);
  } else {
    initializeGestures();
  }
}

export default {
  SwipeGesture,
  DragGesture,
  PinchGesture,
  initializeGestures
};
