// Transcendent parallax scrolling effects
function initializeTranscendentParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-speed]');
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}
document.addEventListener('DOMContentLoaded', initializeTranscendentParallax);
