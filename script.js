/**
 * KAIROS TIMES - script.js
 * Funcionalidades para la revista cristiana
 * (Menú hamburguesa, submenús, pestañas, scroll suave y botón subir)
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // =============================================
  // 1. MENÚ HAMBURGUESA (toggle en móvil)
  // =============================================
  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.getElementById('navbar');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', function () {
      navbar.classList.toggle('open');
      // Cambiar el icono del botón (opcional)
      const icon = this.querySelector('i');
      if (navbar.classList.contains('open')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Cerrar el menú al hacer clic en un enlace (para mejor UX)
    const navLinks = navbar.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navbar.classList.contains('open')) {
          navbar.classList.remove('open');
          const icon = menuToggle.querySelector('i');
          icon.className = 'fas fa-bars';
        }
      });
    });
  }

  // =============================================
  // 2. SUBMENÚ EN MÓVIL (desplegable para "Artículos")
  // =============================================
  const menuItemsWithChildren = document.querySelectorAll('.menu-item-has-children');

  menuItemsWithChildren.forEach(function (item) {
    const link = item.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', function (e) {
        // Solo en móvil (ancho <= 768px) o si el menú está abierto
        if (window.innerWidth <= 768 || navbar.classList.contains('open')) {
          e.preventDefault(); // Evita que el enlace navegue
          item.classList.toggle('open');
        }
      });
    }
  });

  // =============================================
  // 3. PESTAÑAS DE CATEGORÍAS (filtro visual)
  // =============================================
  const catTabs = document.querySelectorAll('.cat-tab');
  const articlesGrid = document.querySelector('.articles-grid');

  // Si existen las pestañas y el grid de artículos
  if (catTabs.length > 0 && articlesGrid) {
    // Guardamos todos los artículos para filtrar
    const allArticles = Array.from(articlesGrid.querySelectorAll('.article-card'));

    catTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        // Remover clase activa de todas las pestañas
        catTabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');

        // Obtener la categoría seleccionada (texto de la pestaña)
        const category = this.textContent.trim();

        // Filtrar artículos
        allArticles.forEach(function (article) {
          const cardCategory = article.querySelector('.card-category');
          if (cardCategory) {
            const catText = cardCategory.textContent.trim();
            // Si la pestaña es "Todos" o coincide con la categoría, mostrar, sino ocultar
            if (category === 'Todos' || catText === category) {
              article.style.display = 'flex'; // o 'block' según el layout
            } else {
              article.style.display = 'none';
            }
          } else {
            // Si no tiene categoría, se muestra solo en "Todos"
            if (category === 'Todos') {
              article.style.display = 'flex';
            } else {
              article.style.display = 'none';
            }
          }
        });
      });
    });

    // Activar la pestaña "Todos" por defecto (ya está activa en HTML, pero aseguramos)
    const defaultTab = document.querySelector('.cat-tab.active');
    if (defaultTab) {
      defaultTab.click();
    } else {
      // Si no hay activa, activar la primera
      if (catTabs.length > 0) {
        catTabs[0].click();
      }
    }
  }

  // =============================================
  // 4. SCROLL SUAVE PARA ENLACES INTERNOS
  // =============================================
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      // Saltamos si es solo "#" o si tiene más de un # (p.ej. enlaces con parámetros)
      if (targetId === '#' || targetId.length < 2) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80; // Ajuste por header fijo
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // =============================================
  // 5. BOTÓN PARA SUBIR ARRIBA (SCROLL TOP)
  // =============================================
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Si el botón no existe en el HTML, lo creamos (por si acaso)
  let scrollBtn = scrollTopBtn;
  if (!scrollBtn) {
    scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollTopBtn';
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Subir arriba');
    document.body.appendChild(scrollBtn);
  }

  // Ocultar/mostrar según el scroll
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Evento click para subir
  scrollBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // =============================================
  // 6. (OPCIONAL) CERRAR SUBMENÚ AL HACER CLIC FUERA
  // =============================================
  document.addEventListener('click', function (e) {
    // Si el clic no es dentro de un elemento con submenú y el submenú está abierto, cerrarlo
    const openSubMenus = document.querySelectorAll('.menu-item-has-children.open');
    openSubMenus.forEach(function (item) {
      if (!item.contains(e.target)) {
        item.classList.remove('open');
      }
    });
  });

  // =============================================
  // 7. (OPCIONAL) EFECTO DE CARGA SUAVE PARA IMÁGENES
  // =============================================
  // Si se desea, se puede agregar lazy loading nativo con 'loading="lazy"' en las imágenes,
  // pero ya está en el HTML. No es necesario más.

  console.log('Kairos Times - Script cargado correctamente.');
});