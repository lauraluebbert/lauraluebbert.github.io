/**
 * Laura Luebbert - Interactive Website
 * Features: Custom cursor, scroll animations, typing effect,
 * dark mode, lightbox, and more!
 */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // IMAGE PROTECTION - Disable right-click on images
  // ============================================
  document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // Disable drag on images
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // ============================================
  // DNA HELIX LOADING ANIMATION (slow connections only)
  // ============================================
  const dnaLoader = document.querySelector('.dna-loader');
  if (dnaLoader) {
    // Check connection speed - only show loader on slow connections
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection &&
      (connection.effectiveType === 'slow-2g' ||
       connection.effectiveType === '2g' ||
       connection.effectiveType === '3g');

    if (isSlowConnection) {
      // Show loader and hide when page is ready
      window.addEventListener('load', () => {
        dnaLoader.classList.add('hidden');
      });
    } else {
      // Fast connection - hide loader immediately
      dnaLoader.classList.add('hidden');
    }
  }

  // ============================================
  // CUSTOM CURSOR - PERSON CHASED BY VIRUS
  // ============================================
  const cursorPerson = document.createElement('div');
  cursorPerson.className = 'cursor-person';
  cursorPerson.textContent = '🏃';
  document.body.appendChild(cursorPerson);

  const cursorVirus = document.createElement('div');
  cursorVirus.className = 'cursor-virus';
  cursorVirus.textContent = '🦠';
  document.body.appendChild(cursorVirus);

  // Toggle button
  const virusToggle = document.createElement('button');
  virusToggle.className = 'virus-toggle';
  virusToggle.innerHTML = '🦠 Virus Mode';
  document.body.appendChild(virusToggle);

  let virusCursorEnabled = false;
  let mouseX = -100, mouseY = -100;
  let virusX = -100, virusY = -100;
  let cursorVisible = false;
  let isMoving = false;
  let moveTimeout;
  let sicknessLevel = 0;
  let lastDirection = 1;

  const sickStates = ['🧍', '😰', '🤢', '🤮', '😵', '💀'];

  virusToggle.addEventListener('click', () => {
    virusCursorEnabled = !virusCursorEnabled;
    document.body.classList.toggle('virus-cursor-active', virusCursorEnabled);
    virusToggle.classList.toggle('active', virusCursorEnabled);
    virusToggle.innerHTML = virusCursorEnabled ? '🦠 Disable Virus' : '🦠 Virus Mode';

    if (!virusCursorEnabled) {
      cursorPerson.classList.remove('cursor-visible');
      cursorVirus.classList.remove('cursor-visible');
      cursorVisible = false;
      sicknessLevel = 0;
    }
  });

  function updatePersonState() {
    if (!virusCursorEnabled) return;

    const distance = Math.sqrt(Math.pow(mouseX - virusX, 2) + Math.pow(mouseY - virusY, 2));

    if (isMoving) {
      // Reset completely when moving
      sicknessLevel = 0;
      cursorPerson.textContent = '🏃';
    } else {
      // Only get sick when virus is very close (touching)
      if (distance < 15) {
        // Faster progression for first stage, slower for later stages
        const rate = sicknessLevel < 1 ? 0.025 : 0.008;
        sicknessLevel = Math.min(sickStates.length - 1, sicknessLevel + rate);
      } else if (distance < 25) {
        const rate = sicknessLevel < 1 ? 0.015 : 0.003;
        sicknessLevel = Math.min(sickStates.length - 1, sicknessLevel + rate);
      }

      // Update appearance based on sickness
      const sickIndex = Math.min(Math.floor(sicknessLevel), sickStates.length - 1);
      cursorPerson.textContent = sickStates[sickIndex];
    }
  }

  document.addEventListener('mousemove', (e) => {
    if (!virusCursorEnabled) return;

    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;

    // Reset move timeout
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
      isMoving = false;
    }, 100);

    if (!cursorVisible) {
      cursorVisible = true;
      cursorPerson.classList.add('cursor-visible');
      cursorVirus.classList.add('cursor-visible');
      virusX = mouseX - 50;
      virusY = mouseY;
    }

    // Person follows cursor immediately
    cursorPerson.style.left = mouseX + 'px';
    cursorPerson.style.top = mouseY + 'px';

    // Flip person based on movement direction
    if (e.movementX < 0) {
      lastDirection = -1;
      cursorPerson.style.transform = 'scaleX(-1)';
    } else if (e.movementX > 0) {
      lastDirection = 1;
      cursorPerson.style.transform = 'scaleX(1)';
    }
  });

  // Virus follows with delay - faster when mouse is still
  function animateVirus() {
    if (virusCursorEnabled) {
      const speed = isMoving ? 0.08 : 0.15;
      const targetOffset = isMoving ? 50 : 10;

      virusX += (mouseX - targetOffset * lastDirection - virusX) * speed;
      virusY += (mouseY - virusY) * speed;

      cursorVirus.style.left = virusX + 'px';
      cursorVirus.style.top = virusY + 'px';

      updatePersonState();
    }
    requestAnimationFrame(animateVirus);
  }
  animateVirus();

  // Hide cursors when mouse leaves window
  document.addEventListener('mouseleave', () => {
    if (!virusCursorEnabled) return;
    cursorPerson.classList.remove('cursor-visible');
    cursorVirus.classList.remove('cursor-visible');
    cursorVisible = false;
  });

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  }

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const header = document.querySelector('header');

  function handleScroll() {
    updateScrollProgress();

    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);

  // ============================================
  // MOBILE MENU
  // ============================================
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }

  // ============================================
  // DARK MODE TOGGLE
  // ============================================
  const themeToggle = document.querySelector('.theme-toggle');

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Add a fun animation
      themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 300);
    });
  }

  // ============================================
  // TYPING EFFECT
  // ============================================
  const typingElement = document.querySelector('.typing-text');

  if (typingElement) {
    const words = ['welcome!', 'willkommen!', 'benvinguts!'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before next word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    // Start typing after a short delay
    setTimeout(typeEffect, 1000);
  }

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .skill-bar');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // For skill bars, trigger the animation
        if (entry.target.classList.contains('skill-bar')) {
          const barFill = entry.target.querySelector('.bar-fill');
          if (barFill) {
            barFill.style.width = barFill.dataset.level || '0%';
          }
        }
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // ============================================
  // LIGHTBOX FOR GALLERY
  // ============================================
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryItems.length > 0) {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-nav lightbox-prev">&larr;</button>
      <button class="lightbox-nav lightbox-next">&rarr;</button>
      <div class="lightbox-content">
        <img src="" alt="">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    const galleryData = [];

    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.caption');

      galleryData.push({
        src: img ? img.src : '',
        caption: caption ? caption.textContent : ''
      });

      item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox();
      });
    });

    function openLightbox() {
      if (galleryData[currentIndex]) {
        lightboxImg.src = galleryData[currentIndex].src;
        lightboxCaption.textContent = galleryData[currentIndex].caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function navigate(direction) {
      currentIndex += direction;
      if (currentIndex < 0) currentIndex = galleryData.length - 1;
      if (currentIndex >= galleryData.length) currentIndex = 0;

      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = galleryData[currentIndex].src;
        lightboxCaption.textContent = galleryData[currentIndex].caption;
        lightboxImg.style.opacity = '1';
      }, 200);
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  // ============================================
  // LIGHTBOX FOR TRADITION IMAGES
  // ============================================
  const traditionImages = document.querySelectorAll('.tradition-image');

  if (traditionImages.length > 0) {
    // Create tradition lightbox
    const traditionLightbox = document.createElement('div');
    traditionLightbox.className = 'lightbox';
    traditionLightbox.innerHTML = `
      <button class="lightbox-close">&times;</button>
      <div class="lightbox-content">
        <img src="" alt="">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(traditionLightbox);

    const tradLightboxImg = traditionLightbox.querySelector('img');
    const tradLightboxCaption = traditionLightbox.querySelector('.lightbox-caption');
    const tradCloseBtn = traditionLightbox.querySelector('.lightbox-close');

    traditionImages.forEach((img) => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        tradLightboxImg.src = img.src;
        const tradition = img.closest('.tradition');
        const title = tradition.querySelector('h3');
        tradLightboxCaption.textContent = title ? title.textContent : '';
        traditionLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeTraditionLightbox() {
      traditionLightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    tradCloseBtn.addEventListener('click', closeTraditionLightbox);

    traditionLightbox.addEventListener('click', (e) => {
      if (e.target === traditionLightbox) closeTraditionLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!traditionLightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeTraditionLightbox();
    });
  }

  // ============================================
  // TL;DR TOGGLE
  // ============================================
  const tldrBtn = document.querySelector('.tldr-btn');
  const tldrContainer = document.querySelector('.tldr-container');

  if (tldrBtn && tldrContainer) {
    tldrBtn.addEventListener('click', () => {
      tldrContainer.classList.toggle('active');
    });
  }

  // ============================================
  // EASTER EGG POPUP
  // ============================================
  const easterEggTriggers = document.querySelectorAll('.easter-egg-trigger');

  easterEggTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const popup = trigger.nextElementSibling;
      if (popup && popup.classList.contains('easter-egg-popup')) {
        popup.classList.toggle('visible');
      }
    });
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // ============================================
  // PARALLAX EFFECT FOR BLOBS
  // ============================================
  const blobs = document.querySelectorAll('.animated-bg .blob');

  if (blobs.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        const offsetX = (x - 0.5) * speed;
        const offsetY = (y - 0.5) * speed;
        blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    });
  }

  // ============================================
  // CONFETTI EFFECT (Easter egg on logo click)
  // ============================================
  const logo = document.querySelector('.logo');
  let clickCount = 0;

  if (logo) {
    logo.addEventListener('click', (e) => {
      clickCount++;

      if (clickCount >= 5) {
        e.preventDefault();
        clickCount = 0;
        createConfetti();
      }
    });
  }

  function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        pointer-events: none;
        z-index: 10001;
        animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
      `;
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }
  }

  // Add confetti animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confetti-fall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // MAGNETIC BUTTONS
  // ============================================
  const magneticElements = document.querySelectorAll('.social-link, .contact-link');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // ============================================
  // COUNTER ANIMATION FOR STATS
  // ============================================
  function animateCounter(element, target, duration = 4000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    }

    updateCounter();
  }

  // Animate counters when they come into view
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ============================================
  // RIPPLE EFFECT ON BUTTONS
  // ============================================
  document.querySelectorAll('.social-link, .contact-link, .nav-link').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.6s ease-out;
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        pointer-events: none;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple {
      to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  // ============================================
  // LIGHTBOX FOR RESEARCH IMAGES
  // ============================================
  const researchImages = document.querySelectorAll('.research-image');

  if (researchImages.length > 0) {
    const researchLightbox = document.createElement('div');
    researchLightbox.className = 'lightbox';
    researchLightbox.innerHTML = `
      <button class="lightbox-close">&times;</button>
      <div class="lightbox-content">
        <img src="" alt="">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(researchLightbox);

    const researchLightboxImg = researchLightbox.querySelector('img');
    const researchLightboxCaption = researchLightbox.querySelector('.lightbox-caption');
    const researchCloseBtn = researchLightbox.querySelector('.lightbox-close');

    researchImages.forEach((img) => {
      img.addEventListener('click', () => {
        researchLightboxImg.src = img.src;
        researchLightboxCaption.textContent = img.dataset.caption || img.alt;
        researchLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeResearchLightbox() {
      researchLightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    researchCloseBtn.addEventListener('click', closeResearchLightbox);

    researchLightbox.addEventListener('click', (e) => {
      if (e.target === researchLightbox) closeResearchLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!researchLightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeResearchLightbox();
    });
  }

  // ============================================
  // LIGHTBOX FOR CLICKABLE IMAGES (e.g., hero image)
  // ============================================
  const clickableImages = document.querySelectorAll('.clickable-image');

  if (clickableImages.length > 0) {
    const clickableLightbox = document.createElement('div');
    clickableLightbox.className = 'lightbox';
    clickableLightbox.innerHTML = `
      <button class="lightbox-close">&times;</button>
      <div class="lightbox-content">
        <img src="" alt="">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(clickableLightbox);

    const clickableLightboxImg = clickableLightbox.querySelector('img');
    const clickableLightboxCaption = clickableLightbox.querySelector('.lightbox-caption');
    const clickableCloseBtn = clickableLightbox.querySelector('.lightbox-close');

    clickableImages.forEach((img) => {
      img.addEventListener('click', () => {
        clickableLightboxImg.src = img.src;
        clickableLightboxCaption.textContent = img.dataset.caption || img.alt;
        clickableLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeClickableLightbox() {
      clickableLightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    clickableCloseBtn.addEventListener('click', closeClickableLightbox);

    clickableLightbox.addEventListener('click', (e) => {
      if (e.target === clickableLightbox) closeClickableLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!clickableLightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeClickableLightbox();
    });
  }

  // ============================================
  // CLEAR CONTACT FORM ON LOAD
  // ============================================
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.reset();
  }

  // ============================================
  // INITIALIZE
  // ============================================
  console.log('Interactive website loaded successfully!');
  console.log('Tip: Click the logo 5 times for a surprise!');

});

// Prevent flash of unstyled content
document.documentElement.style.visibility = 'visible';
