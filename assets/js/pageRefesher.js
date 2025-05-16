const backToTopBtn = document.querySelector('.back-to-top');

// Back to Top Button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('active');
    document.querySelector('.header').classList.add('scrolled');
  } else {
    backToTopBtn.classList.remove('active');
    document.querySelector('.header').classList.remove('scrolled');
  }
});

backToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});