const sections = document.querySelectorAll('.section');

sections.forEach((section) => section.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.14 });

sections.forEach((section) => observer.observe(section));
