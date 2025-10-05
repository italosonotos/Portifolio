// ====================================
// MENU MOBILE TOGGLE
// ====================================
const burgerCheckbox = document.getElementById('burger');
const menuLista = document.getElementById('lista');

if (burgerCheckbox) {
  burgerCheckbox.addEventListener('change', () => {
    menuLista.style.display = burgerCheckbox.checked ? 'block' : 'none';
    
    // Prevenir scroll quando menu está aberto (mobile)
    document.body.style.overflow = burgerCheckbox.checked ? 'hidden' : '';
  });
}

// Fechar menu ao clicar em um link (mobile)
const menuLinks = document.querySelectorAll('#lista a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 600 && burgerCheckbox) {
      burgerCheckbox.checked = false;
      menuLista.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});

// Fechar menu ao clicar fora dele
document.addEventListener('click', (e) => {
  if (window.innerWidth < 600 && burgerCheckbox && burgerCheckbox.checked) {
    if (!menuLista.contains(e.target) && !burgerCheckbox.contains(e.target)) {
      burgerCheckbox.checked = false;
      menuLista.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});

// ====================================
// SCROLL SUAVE PARA SEÇÕES
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ====================================
// HEADER COM EFEITO DE SCROLL
// ====================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Adicionar sombra no header ao rolar
  if (currentScroll > 50) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ====================================
// ANIMAÇÕES DE ENTRADA (Intersection Observer)
// ====================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Adicionar classe inicial aos elementos que serão animados
const animatedElements = document.querySelectorAll(`
  .skill-item,
  .project-card,
  .info-card,
  .timeline-item,
  .contact-item,
  .soft-skill
`);

animatedElements.forEach(el => {
  el.classList.add('fade-in-element');
  fadeInObserver.observe(el);
});

// Adicionar estilos de animação dinamicamente
const style = document.createElement('style');
style.textContent = `
  .fade-in-element {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .fade-in-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Delay progressivo para elementos em grid */
  .skills__grid .skill-item:nth-child(1) { transition-delay: 0s; }
  .skills__grid .skill-item:nth-child(2) { transition-delay: 0.1s; }
  .skills__grid .skill-item:nth-child(3) { transition-delay: 0.2s; }
  .skills__grid .skill-item:nth-child(4) { transition-delay: 0.3s; }
  .skills__grid .skill-item:nth-child(5) { transition-delay: 0.4s; }
  .skills__grid .skill-item:nth-child(6) { transition-delay: 0.5s; }
  .skills__grid .skill-item:nth-child(7) { transition-delay: 0.6s; }

  .projects__grid .project-card:nth-child(1) { transition-delay: 0s; }
  .projects__grid .project-card:nth-child(2) { transition-delay: 0.15s; }
  .projects__grid .project-card:nth-child(3) { transition-delay: 0.3s; }
  .projects__grid .project-card:nth-child(4) { transition-delay: 0.45s; }
  .projects__grid .project-card:nth-child(5) { transition-delay: 0.6s; }
  .projects__grid .project-card:nth-child(6) { transition-delay: 0.75s; }
`;
document.head.appendChild(style);

// ====================================
// ACTIVE LINK NO MENU (baseado na seção visível)
// ====================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#lista a');

const highlightNavLink = () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

// Adicionar estilo para link ativo
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
  #lista a.active {
    color: var(--color-primary);
  }
  
  @media screen and (min-width: 600px) {
    #lista a.active::after {
      transform: scaleX(1);
    }
  }
`;
document.head.appendChild(activeLinkStyle);

window.addEventListener('scroll', highlightNavLink);

// ====================================
// LAZY LOADING DE IMAGENS (fallback)
// ====================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Se a imagem tem data-src, carregar
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        imageObserver.unobserve(img);
      }
    });
  });

  // Observar imagens com classe 'lazy' ou data-src
  const lazyImages = document.querySelectorAll('img[data-src], img.lazy');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ====================================
// TYPING EFFECT NO HERO (opcional)
// ====================================
const heroTitle = document.querySelector('.hero__title');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  let i = 0;
  
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Iniciar o efeito após um pequeno delay
  setTimeout(typeWriter, 500);
}

// ====================================
// SCROLL TO TOP BUTTON (opcional)
// ====================================
const createScrollTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'scroll-to-top';
  button.setAttribute('aria-label', 'Voltar ao topo');
  
  const buttonStyle = document.createElement('style');
  buttonStyle.textContent = `
    .scroll-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
      color: white;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
    
    .scroll-to-top.visible {
      opacity: 1;
      visibility: visible;
    }
    
    .scroll-to-top:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(18, 214, 225, 0.4);
    }
  `;
  document.head.appendChild(buttonStyle);
  
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  });
  
  document.body.appendChild(button);
};

// Criar o botão
createScrollTopButton();

// ====================================
// PERFORMANCE: Debounce para eventos de scroll
// ====================================
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Aplicar debounce nas funções de scroll
window.addEventListener('scroll', debounce(highlightNavLink, 100));

// ====================================
// LOG DE INICIALIZAÇÃO
// ====================================
console.log('%c🚀 Portfolio carregado com sucesso!', 'color: #12d6e1; font-size: 16px; font-weight: bold;');
console.log('%cDesenvolvido por Italo Santos', 'color: #0c8d93; font-size: 12px;');