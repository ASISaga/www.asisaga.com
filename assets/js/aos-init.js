// AOS initialization
function initializeAOS() {
  if (window.AOS) {
    AOS.init({
      duration: 1200,
      easing: 'ease-out-cubic',
      once: true,
      offset: 120,
      delay: 100
    });
  }
}
document.addEventListener('DOMContentLoaded', initializeAOS);
