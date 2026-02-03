# Motion Animation & Gesture System Documentation

## Overview

This project uses the [Motion library](https://motion.dev) for animations and gestures, replacing the previous AOS (Animate On Scroll) library and custom requestAnimationFrame implementations. Motion provides better performance, more flexible animation control, and built-in gesture support.

## Quick Start

### Using Animation Presets

Add `data-motion` attributes to HTML elements to trigger scroll-based animations:

```html
<!-- Fade up animation -->
<div data-motion="fade-up">Content appears on scroll</div>

<!-- With custom delay and duration -->
<div data-motion="emergence" 
     data-motion-delay="0.2" 
     data-motion-duration="1.0">
  Consciousness emerges
</div>

<!-- Parallax effect -->
<div data-parallax data-parallax-speed="0.5">
  Scrolls at different speed
</div>
```

### Available Animation Types

#### Fade Animations
- `fade-in` - Simple fade in
- `fade-up` - Fade in from below
- `fade-down` - Fade in from above
- `fade-left` - Fade in from left
- `fade-right` - Fade in from right

#### Consciousness-Themed Animations
- `sacred-fade` - Ethereal fade with blur effect
- `emergence` - Consciousness emerging effect
- `merging` - Merging with rotation

#### Scroll Presets
- `scroll-default` - Standard scroll animation
- `scroll-fast` - Quick scroll animation
- `scroll-slow` - Slow, dramatic scroll animation

### Data Attributes

- `data-motion="[type]"` - Animation type (required)
- `data-motion-delay="[seconds]"` - Delay before animation starts (default: 0)
- `data-motion-duration="[seconds]"` - Animation duration (default: 0.8)
- `data-motion-once="[true|false]"` - Animate only once (default: true)

## Gesture Support

### Swipe Gestures

Enable swipe detection on elements:

```html
<!-- Basic swipe detection -->
<div data-swipe="left,right">Swipeable content</div>

<!-- With callback handlers -->
<div data-swipe="left,right,up,down"
     data-swipe-left="handleSwipeLeft()"
     data-swipe-right="handleSwipeRight()">
  Swipe in any direction
</div>
```

Example button with swipe:
```html
<a href="/next-page/" 
   class="cta-button" 
   data-swipe="left,right">
  Swipe or Click to Continue
</a>
```

### Drag Gestures

Make elements draggable:

```html
<!-- Draggable in all directions -->
<div data-drag>Drag me!</div>

<!-- Horizontal drag only -->
<div data-drag data-drag-axis="x">Drag left/right</div>

<!-- Vertical drag only -->
<div data-drag data-drag-axis="y">Drag up/down</div>

<!-- Stay where dragged (no snap back) -->
<div data-drag data-drag-snap-back="false">
  Drag and drop
</div>
```

Example interactive visualization:
```html
<div class="consciousness-merger" 
     data-drag 
     data-drag-axis="both" 
     data-drag-snap-back="true">
  <!-- Draggable visualization -->
</div>
```

### Pinch Gestures

Enable pinch-to-zoom on elements:

```html
<!-- Basic pinch zoom -->
<div data-pinch>Pinch to zoom</div>

<!-- With scale limits -->
<div data-pinch 
     data-pinch-min="0.5" 
     data-pinch-max="3">
  Pinch between 50% and 300%
</div>
```

### Data Attributes for Gestures

#### Swipe
- `data-swipe="[directions]"` - Comma-separated: left, right, up, down
- `data-swipe-[direction]="[handler]"` - JavaScript callback for each direction

#### Drag
- `data-drag` - Enable dragging
- `data-drag-axis="[x|y|both]"` - Constrain drag direction (default: both)
- `data-drag-snap-back="[true|false]"` - Snap back to original position (default: true)

#### Pinch
- `data-pinch` - Enable pinch gestures
- `data-pinch-min="[number]"` - Minimum scale (default: 0.5)
- `data-pinch-max="[number]"` - Maximum scale (default: 3)

## JavaScript API

### Programmatic Usage

```javascript
import { SwipeGesture, DragGesture, PinchGesture } from './assets/js/gestures.js';

// Create swipe gesture
const swipe = new SwipeGesture(element, {
  threshold: 50,
  timeout: 500,
  onSwipeLeft: (event) => console.log('Swiped left!'),
  onSwipeRight: (event) => console.log('Swiped right!')
});

// Create drag gesture
const drag = new DragGesture(element, {
  axis: 'x',
  snapBack: true,
  onDragStart: (event) => console.log('Drag started'),
  onDrag: (event) => console.log('Dragging:', event.x, event.y),
  onDragEnd: (event) => console.log('Drag ended')
});

// Create pinch gesture
const pinch = new PinchGesture(element, {
  minScale: 0.5,
  maxScale: 3,
  onPinch: (event) => console.log('Scale:', event.scale)
});

// Clean up when done
swipe.destroy();
drag.destroy();
pinch.destroy();
```

### Using Animation Presets in JavaScript

```javascript
import { allPresets } from './assets/js/animation-presets.js';

// Access preset configurations
const fadeUp = allPresets.fade.fadeUp;
const emergence = allPresets.consciousness.emergence;

// Apply animation with Motion
const { animate } = window.Motion;
animate(element, fadeUp.animate, fadeUp.transition);
```

## Animation Preset Library

### Structure

All presets are organized in `assets/js/animation-presets.js`:

- **fadePresets** - Basic fade animations
- **scalePresets** - Scale and pulse effects
- **slidePresets** - Slide in/out animations
- **consciousnessPresets** - ASI Saga-specific animations
- **parallaxPresets** - Parallax configurations
- **scrollPresets** - Scroll-triggered animations

### Creating Custom Presets

```javascript
export const customPreset = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: 1.0,
    ease: "easeOut"
  }
};
```

### Helper Functions

```javascript
import { combinePresets, staggerChildren } from './assets/js/animation-presets.js';

// Combine multiple presets
const combined = combinePresets(
  fadePresets.fadeUp,
  { transition: { duration: 2.0 } }
);

// Stagger child animations
const staggered = staggerChildren(fadePresets.fadeIn, 0.1);
```

## Migration from AOS

### Before (AOS)
```html
<div data-aos="fade-up" 
     data-aos-delay="200" 
     data-aos-duration="800">
  Content
</div>
```

### After (Motion)
```html
<div data-motion="fade-up" 
     data-motion-delay="0.2" 
     data-motion-duration="0.8">
  Content
</div>
```

### Key Differences

1. **Attribute names**: `data-aos-*` → `data-motion-*`
2. **Time values**: Milliseconds → Seconds (200 → 0.2)
3. **More animations**: Additional consciousness-themed presets
4. **Better performance**: GPU-accelerated animations
5. **Gesture support**: Built-in swipe, drag, pinch

## Performance Tips

1. **Use `data-motion-once="true"`** (default) to prevent re-animation on scroll
2. **Limit particle effects on mobile** - Already handled in `essence-particles.js`
3. **Use hardware-accelerated properties**: transform, opacity
4. **Avoid layout thrashing**: Batch DOM reads/writes

## Browser Support

Motion library supports all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14.1+
- Mobile Safari 14.1+
- Chrome Android 90+

## Examples

### Complete Page Section

```html
<section class="hero-section" 
         data-motion="sacred-fade" 
         data-parallax 
         data-parallax-speed="0.3">
  
  <h1 data-motion="emergence" 
      data-motion-delay="0.2">
    Humanity's Transcendent Pathway
  </h1>
  
  <p data-motion="fade-up" 
     data-motion-delay="0.4">
    Where consciousness merges with infinite possibility
  </p>
  
  <a href="/genesis/" 
     class="cta-button"
     data-motion="fade-up" 
     data-motion-delay="0.6"
     data-swipe="left,right">
    Discover the Genesis
  </a>
  
  <div class="visualization" 
       data-motion="merging" 
       data-motion-delay="0.8"
       data-drag 
       data-drag-snap-back="true">
    <!-- Interactive element -->
  </div>
</section>
```

## Troubleshooting

### Animations Not Working

1. Check browser console for Motion library loading errors
2. Verify `data-motion` attribute spelling
3. Ensure Motion CDN is loaded in HTML
4. Check that elements are in viewport

### Gestures Not Responding

1. Verify gesture data attributes are correct
2. Check that Motion library is loaded
3. Test on touch device or enable touch emulation
4. Ensure element has proper size/positioning

### Performance Issues

1. Reduce number of simultaneous animations
2. Use `data-motion-once="true"` to prevent re-animation
3. Disable particles on mobile (already done)
4. Optimize parallax speed values

## Reference

- [Motion Library Docs](https://motion.dev)
- [Animation Presets Source](./assets/js/animation-presets.js)
- [Gesture Handler Source](./assets/js/gestures.js)
- [Motion Scroll Source](./assets/js/motion-scroll.js)
