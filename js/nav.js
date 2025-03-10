// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Set active nav link based on current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Check if the current path matches the link path or ends with it
    if (currentPath === linkPath || currentPath.endsWith(linkPath)) {
      link.classList.add('active');
      const underline = link.querySelector('.link-underline');
      if (underline) {
        underline.style.width = '100%';
      }
    }
    
    // Add hover effects
    link.addEventListener('mouseenter', function() {
      const underline = this.querySelector('.link-underline');
      if (underline) {
        underline.style.width = '100%';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        const underline = this.querySelector('.link-underline');
        if (underline) {
          underline.style.width = '0';
        }
      }
    });
  });
}); 