// Floating essence particles animation
function initializeEssenceParticles() {
  const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'essence-particle';
    particle.style.position = 'fixed';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = 'rgba(255, 215, 0, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    document.body.appendChild(particle);
    let yPos = window.innerHeight;
    const float = () => {
      yPos -= 1;
      particle.style.top = yPos + Math.sin(yPos * 0.01) * 10 + 'px';
      particle.style.opacity = Math.max(0, 1 - (window.innerHeight - yPos) / window.innerHeight);
      if (yPos > -50) {
        requestAnimationFrame(float);
      } else {
        particle.remove();
      }
    };
    requestAnimationFrame(float);
  };
  setInterval(createParticle, 2000);
}
document.addEventListener('DOMContentLoaded', initializeEssenceParticles);
