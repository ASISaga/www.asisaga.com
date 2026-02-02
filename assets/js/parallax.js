// Transcendent parallax scrolling effects with throttling for smooth mobile performance
function initializeTranscendentParallax() {
  let ticking = false;
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-speed]');
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}
document.addEventListener('DOMContentLoaded', initializeTranscendentParallax);
