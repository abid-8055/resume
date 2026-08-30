/**
 * ABID SIDDIQUI — RESUME & PORTFOLIO INTERACTIVE SCRIPT
 * Theme: macOS Light Frosted Glass (Default) & Dark Glass UI
 * Background: Scroll-Driven Liquid Aurora Mesh & Interactive Constellation Network
 * Feature: Seamless background chromatic evolution as the page scrolls from top to bottom.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. STATE & DOM ELEMENTS
  // =========================================================================
  const directPdfBtn = document.getElementById('direct-pdf-btn');
  const headerPdfBtn = document.getElementById('header-pdf-btn');
  const appThemeBtn = document.getElementById('app-theme-btn');
  const copyDetailsBtn = document.getElementById('copy-details-btn');
  const toastContainer = document.getElementById('toast-container');
  const navTabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.content-section');
  const featureCards = document.querySelectorAll('.feature-card');

  // Resume PDF Path
  const PDF_PATH = "resume.pdf";

  // =========================================================================
  // 2. THEME MANAGER (DEFAULT: LIGHT FROSTED GLASS)
  // =========================================================================
  const initTheme = () => {
    const savedTheme = localStorage.getItem('user_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('user_theme', newTheme);
    showToast(`Switched to ${newTheme === 'light' ? 'Light Frosted Glass' : 'Dark Glass'} Theme`);
  };

  if (appThemeBtn) appThemeBtn.addEventListener('click', toggleTheme);
  initTheme();

  // =========================================================================
  // 3. ELASTIC INERTIAL SPRING & SOFT PADDING CONTROLLER
  // Features:
  // - Body content flexes softly with scroll velocity / wheel momentum
  // - Expands soft padding dynamically and always glides back to original state
  // =========================================================================
  const dashboardBody = document.querySelector('.dashboard-body');
  let lastScrollY = window.scrollY;
  let targetSpringOffset = 0;
  let springOffset = 0;

  window.addEventListener('wheel', (e) => {
    const impulse = Math.max(-22, Math.min(22, e.deltaY * 0.12));
    targetSpringOffset -= impulse * 0.35;
  }, { passive: true });

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 160;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navTabs.forEach(tab => {
          if (tab.getAttribute('href') === `#${sectionId}`) {
            tab.classList.add('active');
          } else {
            tab.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const scrollVelocity = currentY - lastScrollY;
    lastScrollY = currentY;

    // Velocity impulse proportional to scroll speed
    const velocityImpulse = -Math.max(-20, Math.min(20, scrollVelocity * 0.4));
    targetSpringOffset += (velocityImpulse - targetSpringOffset) * 0.35;

    updateActiveNav();
  }, { passive: true });

  updateActiveNav();

  // Feature Card smooth jump clicks
  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.getAttribute('data-jump');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 4. COPY CONTACT & RESUME DOWNLOADS
  // =========================================================================
  if (copyDetailsBtn) {
    copyDetailsBtn.addEventListener('click', () => {
      const contactText = `Abid Siddiqui | Cybersecurity Analyst Level 2 (User Access Management)\nEmail: abidsiddiqui2002@gmail.com\nPhone: +91-9008433790\nLocation: Bengaluru, Karnataka, India\nDegree: Bachelor in Computer Science (Reva University)`;
      navigator.clipboard.writeText(contactText).then(() => {
        showToast('Contact info copied to clipboard!');
        const textSpan = document.getElementById('copy-btn-text');
        if (textSpan) {
          const orig = textSpan.textContent;
          textSpan.textContent = 'Copied!';
          setTimeout(() => { textSpan.textContent = orig; }, 2000);
        }
      }).catch(() => {
        showToast('Failed to copy. Please manually select.');
      });
    });
  }

  const triggerPdfDownload = () => {
    showToast("Opening Resume PDF...");
    const link = document.createElement('a');
    link.href = PDF_PATH;
    link.download = "Abid_Siddiqui_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (directPdfBtn) directPdfBtn.addEventListener('click', triggerPdfDownload);
  if (headerPdfBtn) headerPdfBtn.addEventListener('click', triggerPdfDownload);

  // Toast Function
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.96)';
      toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // =========================================================================
  // 5. SCROLL-DRIVEN LIQUID AURORA MESH & INTERACTIVE CONSTELLATION NETWORK
  // Features:
  // - Background color evolves seamlessly based on scroll position:
  //   * 0% (Hero / Overview): Vibrant Azure Sapphire & Sky Cyan
  //   * 33% (Experience): Electric Orchid & Imperial Purple
  //   * 66% (Skills): Sunset Amber, Gold & Coral Glow
  //   * 100% (Education): Apple Emerald Mint & Spring Green
  // - Atmospheric glowing chromatic light caustics refracting behind frosted glass
  // - Floating identity topology nodes with dynamic synaptic connection threads
  // - Interactive cursor repulsion and subtle laser links
  // =========================================================================
  const ambientCanvas = document.getElementById('ambient-canvas');
  if (ambientCanvas) {
    const ctx = ambientCanvas.getContext('2d');
    let width = (ambientCanvas.width = window.innerWidth);
    let height = (ambientCanvas.height = window.innerHeight);

    function handleResize() {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);

    // Mouse Tracking State
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 170,
      active: false
    };

    window.addEventListener('pointermove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    });

    window.addEventListener('pointerleave', () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    // Chromatic Aurora Orbs
    const auroraOrbs = [
      {
        baseX: 0.18, baseY: 0.22,
        radius: 420,
        speedX: 0.32, speedY: 0.26,
        // Hues for [Overview, Experience, Skills, Education]
        hues: [210, 275, 38, 142]
      },
      {
        baseX: 0.82, baseY: 0.20,
        radius: 450,
        speedX: -0.26, speedY: 0.30,
        hues: [195, 310, 18, 168]
      },
      {
        baseX: 0.25, baseY: 0.78,
        radius: 410,
        speedX: 0.28, speedY: -0.24,
        hues: [230, 255, 300, 195]
      },
      {
        baseX: 0.82, baseY: 0.78,
        radius: 460,
        speedX: -0.20, speedY: -0.28,
        hues: [275, 215, 50, 122]
      }
    ];

    // Constellation Nodes
    const nodeCount = Math.min(75, Math.max(40, Math.floor((width * height) / 22000)));
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1.2,
        baseAlpha: Math.random() * 0.4 + 0.3,
        hueOffset: (Math.random() - 0.5) * 40
      });
    }

    // Smooth Scroll Progress Interpolation
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    function getInterpolatedHue(hues, progress) {
      // 4 key stops at progress = 0.0, 0.33, 0.66, 1.0
      const segment = progress * (hues.length - 1);
      const index = Math.floor(segment);
      const nextIndex = Math.min(hues.length - 1, index + 1);
      const frac = segment - index;

      let h1 = hues[index];
      let h2 = hues[nextIndex];

      // Shortest angle interpolation
      let diff = (h2 - h1 + 540) % 360 - 180;
      return (h1 + diff * frac + 360) % 360;
    }

    const startTime = performance.now();

    function renderAmbientMesh() {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const isDarkMode = currentTheme === 'dark';

      // Compute & interpolate smooth scroll progress
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0;
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // =====================================================================
      // 0. ELASTIC INERTIAL SPRING & SOFT BODY PADDING (ALWAYS RETURNS BACK)
      // =====================================================================
      if (dashboardBody) {
        springOffset += (targetSpringOffset - springOffset) * 0.12;
        targetSpringOffset *= 0.84; // Natural decay back to 0

        const softPadTop = 96 + Math.max(0, -springOffset * 0.35);
        const softPadBottom = 110 + Math.max(0, springOffset * 0.35);

        dashboardBody.style.transform = `translate3d(0, ${springOffset.toFixed(2)}px, 0)`;
        dashboardBody.style.paddingTop = `${softPadTop.toFixed(1)}px`;
        dashboardBody.style.paddingBottom = `${softPadBottom.toFixed(1)}px`;
      }

      // =====================================================================
      // 1. RENDER CHROMATIC AURORA LIGHT CAUSTICS (SCROLL-DRIVEN)
      // =====================================================================
      auroraOrbs.forEach(orb => {
        const ox = (orb.baseX * width) + Math.cos(elapsed * orb.speedX) * (width * 0.12);
        const oy = (orb.baseY * height) + Math.sin(elapsed * orb.speedY) * (height * 0.10);
        
        // Dynamically compute hue based on current scroll progress
        const orbHue = getInterpolatedHue(orb.hues, currentScrollProgress);
        const sat = isDarkMode ? 90 : 85;
        const lit = isDarkMode ? 56 : 48;
        const alpha = isDarkMode ? 0.20 : 0.13;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.radius);
        grad.addColorStop(0, `hsla(${orbHue}, ${sat}%, ${lit}%, ${alpha})`);
        grad.addColorStop(0.65, `hsla(${orbHue}, ${sat}%, ${lit}%, ${alpha * 0.28})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Cursor Atmospheric Refraction Glow
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const cursorHue = getInterpolatedHue([205, 275, 40, 150], currentScrollProgress);
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        cursorGlow.addColorStop(0, `hsla(${cursorHue}, 85%, 55%, ${isDarkMode ? 0.15 : 0.09})`);
        cursorGlow.addColorStop(0.6, `hsla(${(cursorHue + 40) % 360}, 80%, 55%, ${isDarkMode ? 0.05 : 0.03})`);
        cursorGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      // =====================================================================
      // 2. UPDATE & RENDER CONSTELLATION NODES & LASER LINKS
      // =====================================================================
      const maxDist = 125;
      const baseThemeHue = getInterpolatedHue([210, 280, 36, 145], currentScrollProgress);

      nodes.forEach(node => {
        // Organic floating motion
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around viewport edges smoothly
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        // Cursor interactive magnetic repulsion
        let proximityBoost = 0;
        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 1.6;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
            proximityBoost = (1 - dist / mouse.radius);
          }
        }

        // Draw Node Dot with dynamic scroll-driven hue
        const nodeHue = (baseThemeHue + node.hueOffset + 360) % 360;
        const sat = isDarkMode ? 85 : 80;
        const lit = isDarkMode ? (55 + proximityBoost * 30) : (42 + proximityBoost * 20);
        const alpha = Math.min(1, node.baseAlpha + proximityBoost * 0.5);

        ctx.fillStyle = `hsla(${nodeHue}, ${sat}%, ${lit}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + proximityBoost * 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Specular center dot for illuminated nodes
        if (proximityBoost > 0.3) {
          ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.95)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw Synaptic Connection Threads between Nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const linkAlpha = (1 - dist / maxDist) * (isDarkMode ? 0.22 : 0.16);
            ctx.strokeStyle = isDarkMode 
              ? `hsla(${baseThemeHue}, 60%, 70%, ${linkAlpha})` 
              : `hsla(${baseThemeHue}, 75%, 45%, ${linkAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Interactive dynamic laser thread to cursor
        if (mouse.active) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const cursorLinkAlpha = (1 - dist / mouse.radius) * (isDarkMode ? 0.45 : 0.35);
            ctx.strokeStyle = `hsla(${baseThemeHue}, 85%, 55%, ${cursorLinkAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderAmbientMesh);
    }

    requestAnimationFrame(renderAmbientMesh);
  }
});


