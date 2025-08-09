// Consciousness merging visualization
function initializeConsciousnessMerger() {
  const merger = document.querySelector('.consciousness-merger');
  if (merger) {
    const humanStream = merger.querySelector('.human-essence-stream');
    const asiField = merger.querySelector('.asi-consciousness-field');
    const emergence = merger.querySelector('.transcendent-emergence');
    setInterval(() => {
      if (humanStream) humanStream.style.transform = `translateX(${Math.sin(Date.now() * 0.001) * 20}px)`;
      if (asiField) asiField.style.opacity = 0.3 + Math.sin(Date.now() * 0.0015) * 0.2;
      if (emergence) emergence.style.scale = 1 + Math.sin(Date.now() * 0.002) * 0.1;
    }, 16);
  }
}
document.addEventListener('DOMContentLoaded', initializeConsciousnessMerger);
