// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const fixedNav = document.querySelector('.fixed-nav');
  const menuButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu');
  let lastScrollY = window.scrollY;
  let ticking = false;
  const scrollOffset = 80;
  const scrollTolerance = 10;
  
  // Function to close mobile menu
  function closeMobileMenu() {
    navMenu.classList.remove('w--open');
  }

  // Toggle mobile menu
  if (menuButton && navMenu) {
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle('w--open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = navMenu.contains(event.target) || menuButton.contains(event.target);
      if (!isClickInside && navMenu.classList.contains('w--open')) {
        closeMobileMenu();
      }
    });
  }

  // Handle active nav links
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    // Set active state
    const linkPath = link.getAttribute('href');
    if (currentPath.endsWith(linkPath)) {
      link.classList.add('active');
    }
    
    // Close mobile menu when link is clicked
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    }, 250);
  });

  // Handle escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  function updateNavState() {
    if (!fixedNav) {
      return;
    }

    const currentScrollY = Math.max(window.scrollY, 0);
    const isMobile = window.innerWidth <= 768;
    const isMenuOpen = navMenu && navMenu.classList.contains('w--open');
    const hasScrolled = currentScrollY > 12;
    const scrollDelta = currentScrollY - lastScrollY;

    fixedNav.classList.toggle('nav-scrolled', hasScrolled);

    if (isMobile || isMenuOpen) {
      fixedNav.classList.remove('nav-unpinned');
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY <= scrollOffset) {
      fixedNav.classList.remove('nav-unpinned');
    } else if (scrollDelta > scrollTolerance) {
      fixedNav.classList.add('nav-unpinned');
      lastScrollY = currentScrollY;
    } else if (scrollDelta < -scrollTolerance) {
      fixedNav.classList.remove('nav-unpinned');
      lastScrollY = currentScrollY;
    }

    if (Math.abs(scrollDelta) <= scrollTolerance) {
      return;
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', function() {
    if (ticking) {
      return;
    }

    window.requestAnimationFrame(function() {
      updateNavState();
      ticking = false;
    });

    ticking = true;
  }, { passive: true });

  updateNavState();
}); 
