// Custom cursor functionality
document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.querySelector('.cursor');
  const cursorBigCircle = document.querySelector('.cursor-big-circle');
  const cursorSmallCircle = document.querySelector('.cursor-small-circle');
  const cursorArrow = document.querySelector('.cursor-arrow');
  
  if (!cursor || !cursorBigCircle || !cursorSmallCircle || !cursorArrow) return;
  
  // Hide default cursor
  document.body.style.cursor = 'none';
  
  // Update cursor position
  document.addEventListener('mousemove', function(e) {
    cursor.style.display = 'block';
    
    // Add a slight delay for the big circle for a trailing effect
    setTimeout(function() {
      cursorBigCircle.style.left = e.clientX + 'px';
      cursorBigCircle.style.top = e.clientY + 'px';
    }, 50);
    
    // Small circle follows cursor exactly
    cursorSmallCircle.style.left = e.clientX + 'px';
    cursorSmallCircle.style.top = e.clientY + 'px';
    
    // Arrow follows cursor exactly
    cursorArrow.style.left = e.clientX + 'px';
    cursorArrow.style.top = e.clientY + 'px';
  });
  
  // Hide cursor when it leaves the window
  document.addEventListener('mouseout', function() {
    cursor.style.display = 'none';
  });
  
  // Show cursor when it enters the window
  document.addEventListener('mouseover', function() {
    cursor.style.display = 'block';
  });
  
  // Cursor effects for links
  const links = document.querySelectorAll('a, button, .btn, input[type="submit"]');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      cursorBigCircle.style.width = '60px';
      cursorBigCircle.style.height = '60px';
      cursorBigCircle.style.opacity = '0.5';
      cursorSmallCircle.style.opacity = '0';
      cursorArrow.style.opacity = '1';
    });
    
    link.addEventListener('mouseleave', function() {
      cursorBigCircle.style.width = '40px';
      cursorBigCircle.style.height = '40px';
      cursorBigCircle.style.opacity = '1';
      cursorSmallCircle.style.opacity = '1';
      cursorArrow.style.opacity = '0';
    });
  });
}); 