document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle (works on all screen sizes)
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('opacity-0');
      mobileMenu.classList.toggle('-translate-y-4');
      mobileMenu.classList.toggle('pointer-events-none');
    });
  }

  // Only proceed with scroll effects if window is larger than 768px
  if (window.innerWidth > 768) {
    const header = document.getElementById('main-header');
    const headerLogo = document.getElementById('header-logo');
    const navLinks = header.querySelectorAll('nav ul li a');
    const scrollThreshold = 70;

    const applyScrolledStyles = () => {
      if (window.scrollY > scrollThreshold) {
        // Styles when scrolled
        header.classList.add('bg-white', 'shadow-md', 'py-3', 'text-light-brown');
        header.classList.remove('bg-light-brown', 'py-4', 'text-white');
        
        if (headerLogo) {
          headerLogo.classList.add('h-8', 'text-light-brown');
          headerLogo.classList.remove('h-18', 'text-white');
        }

        // Hide the text part
        const logoText = document.getElementById('logo-text');
        if (logoText) {
          logoText.classList.add('opacity-0');
        }

        // Change text color for navigation links
        navLinks.forEach(link => {
          link.classList.add('text-light-brown');
          link.classList.remove('text-white');
        });

      } else {
        // Styles when at top
        header.classList.remove('bg-white', 'shadow-md', 'py-3', 'text-light-brown');
        header.classList.add('bg-light-brown', 'py-4', 'text-white');

        if (headerLogo) {
          headerLogo.classList.remove('h-8', 'text-light-brown');
          headerLogo.classList.add('h-18', 'text-white');
        }

        // Show the text part
        const logoText = document.getElementById('logo-text');
        if (logoText) {
          logoText.classList.remove('opacity-0');
        }

        // Change text color back for navigation links
        navLinks.forEach(link => {
          link.classList.remove('text-light-brown');
          link.classList.add('text-white');
        });
      }
    };

    // Apply styles on initial load
    applyScrolledStyles();

    // Add scroll event listener
    window.addEventListener('scroll', applyScrolledStyles);

    // Optional: Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        // Clean up scroll effects if resized to mobile
        window.removeEventListener('scroll', applyScrolledStyles);
      } else if (window.innerWidth > 768) {
        // Re-apply if resized back to desktop
        window.addEventListener('scroll', applyScrolledStyles);
        applyScrolledStyles();
      }
    });
  }
});