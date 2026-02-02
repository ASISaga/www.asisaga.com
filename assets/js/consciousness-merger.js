// Consciousness merging visualization with optimized performance
function initializeConsciousnessMerger() {
  const merger = document.querySelector('.consciousness-merger');
  if (merger) {
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
document.addEventListener('DOMContentLoaded', initializeConsciousnessMerger);
