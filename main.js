import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const exploreBtn = document.getElementById('exploreBtn');
  
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const btnText = exploreBtn.querySelector('span');
      if (btnText.innerText === 'Start Building') {
        btnText.innerText = 'Ready to code!';
        exploreBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
        exploreBtn.style.boxShadow = '0 10px 25px -5px rgba(34, 197, 94, 0.4)';
        
        setTimeout(() => {
          btnText.innerText = 'Start Building';
          exploreBtn.style.background = '';
          exploreBtn.style.boxShadow = '';
        }, 2000);
      }
    });
  }
});
