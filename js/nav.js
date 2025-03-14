// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu');
  
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
}); 