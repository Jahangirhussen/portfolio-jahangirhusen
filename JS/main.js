
document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll (nav links)
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href'))
              ?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 2. Active-on-scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - section.clientHeight / 3;
      if (pageYOffset >= top) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );
    });
  });

  // 3. Resume PDF (guard with a null-check)
  const resumeForm = document.getElementById('resumeForm');
  if (resumeForm) {
    const pdfContainer = document.getElementById('pdfContainer');
    const resumeIframe = document.getElementById('resumeIframe');
    const resumeUrl = 'Images/JAHANGIR_HUSSEN_Resume (1).pdf';
    resumeForm.addEventListener('submit', e => {
      e.preventDefault();
      if (resumeIframe && pdfContainer) {
        resumeIframe.src = resumeUrl;
        pdfContainer.style.display = 'block';
      }
    });
  }

  // 4. Timeline animations (guard)
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
      });
    }, { threshold: 0.3 });
    timelineItems.forEach(item => observer.observe(item));
  }

  // 5. Expanding timeline content
  document.querySelectorAll('.timeline-content').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      const desc = item.querySelector('.description');
      if (desc) {
        desc.style.maxHeight =
          desc.style.maxHeight === '0px'
            ? `${desc.scrollHeight}px`
            : '0px';
      }
    });
  });

  // 6. Progress bars
  const skills = [
    { id: "ml-progress", percent: 75, label: "ml-percent" },
    { id: "ds-progress", percent: 68, label: "ds-percent" },
    { id: "programming-progress", percent: 88, label: "programming-percent" }
  ];

  skills.forEach(skill => {
    const fill = document.getElementById(skill.id);
    const label = document.getElementById(skill.label);
    let current = 0;
    const interval = setInterval(() => {
      if (current >= skill.percent) {
        clearInterval(interval);
      } else {
        current++;
        fill.style.width = current + "%";
        label.textContent = current + "%";
      }
    }, 20);
  });

  // 8. Finally, init AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
});


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
});

document.querySelectorAll(".card").forEach(card => {
  card.classList.add("fade-init");
  observer.observe(card);
});


const nameText = "Jahangir Hussen";
const typedName = document.getElementById("typedName");
let index = 0;

function typeEffect() {
  if (index < nameText.length) {
    typedName.textContent += nameText.charAt(index);
    index++;
    setTimeout(typeEffect, 150); // typing speed
  } else {
    typedName.innerHTML += '<span class="cursor">|</span>';
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);