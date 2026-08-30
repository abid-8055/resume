/**
 * ABID SIDDIQUI — RESUME & PORTFOLIO INTERACTIVE SCRIPT
 * Theme: macOS Light Frosted Glass (Default) & Dark Glass UI
 * Background: Interactive Doughnut (Torus from above) Particle Engine with
 * Small Dots, Fluid Mouse-Tracking, Circle-to-Pill Distance Morphing, and 2D Chromatic Color Shifts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. STATE & DOM ELEMENTS
  // =========================================================================
  const authView = document.getElementById('auth-view');
  const appView = document.getElementById('app-view');
  const authenticateBtn = document.getElementById('authenticate-btn');
  const directPdfBtn = document.getElementById('direct-pdf-btn');
  const returnAuthBtn = document.getElementById('return-auth-btn');
  const headerPdfBtn = document.getElementById('header-pdf-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const appThemeBtn = document.getElementById('app-theme-btn');
  const profileModalBtn = document.getElementById('profile-modal-btn');
  const profileModal = document.getElementById('profile-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const signOutBtn = document.getElementById('sign-out-btn');
  const copyDetailsBtn = document.getElementById('copy-details-btn');
  const toastContainer = document.getElementById('toast-container');
  const navTabs = document.querySelectorAll('.nav-tab');
  const contentSections = document.querySelectorAll('.content-section');
  const featureCards = document.querySelectorAll('.feature-card');
  const footerQuickView = document.getElementById('footer-quick-view');
  const accountPill = document.getElementById('account-pill');

  // Resume PDF Path
  const PDF_PATH = "resume.pdf";

  // =========================================================================
  // 2. THEME MANAGER (DEFAULT: LIGHT FROSTED GLASS)
  // =========================================================================
  const initTheme = () => {
    // Default theme is 'light'
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

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (appThemeBtn) appThemeBtn.addEventListener('click', toggleTheme);
  initTheme();

  // =========================================================================
  // 3. AUTHENTICATION & PORTAL ENTRY FLOW
  // =========================================================================
  const enterApp = (targetSection = 'section-overview') => {
    if (authenticateBtn) {
      authenticateBtn.disabled = true;
      authenticateBtn.innerHTML = `
        <svg class="btn-icon spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        <span>Loading Portfolio...</span>
      `;
    }

    setTimeout(() => {
      authView.classList.remove('active');
      appView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Welcome • Portfolio Opened');
      switchTab(targetSection);
      if (authenticateBtn) {
        authenticateBtn.disabled = false;
        authenticateBtn.innerHTML = `
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
          <span class="btn-text">Enter Profile & Resume</span>
        `;
      }
    }, 350);
  };

  const exitToAuth = () => {
    if (profileModal) profileModal.classList.remove('open');
    appView.classList.remove('active');
    authView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Returned to Portal');
  };

  if (authenticateBtn) authenticateBtn.addEventListener('click', () => enterApp('section-overview'));
  if (accountPill) accountPill.addEventListener('click', () => enterApp('section-overview'));
  if (returnAuthBtn) returnAuthBtn.addEventListener('click', exitToAuth);
  if (signOutBtn) signOutBtn.addEventListener('click', exitToAuth);
  if (footerQuickView) footerQuickView.addEventListener('click', (e) => { e.preventDefault(); enterApp('section-overview'); });

  // =========================================================================
  // 4. NAVIGATION & TAB SWITCHING
  // =========================================================================
  function switchTab(targetId) {
    // Header Navigation Tabs
    navTabs.forEach(tab => {
      if (tab.getAttribute('data-target') === targetId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Content Sections
    contentSections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      switchTab(target);
    });
  });

  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-jump');
      if (target) switchTab(target);
    });
  });

  // =========================================================================
  // 5. PROFILE MODAL & UTILITIES
  // =========================================================================
  if (profileModalBtn) {
    profileModalBtn.addEventListener('click', () => {
      profileModal.classList.add('open');
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      profileModal.classList.remove('open');
    });
  }

  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) profileModal.classList.remove('open');
    });
  }

  // Copy Contact Info
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

  // PDF Downloads
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
  // 6. DOUGHNUT (TORUS VIEWED FROM ABOVE) PARTICLE ENGINE
  // Features:
  // - Doughnut / Annulus geometry: Inner clear hole + Outer boundary band
  // - Small dots evenly distributed throughout the doughnut ring
  // - Formation smoothly follows mouse cursor across the screen
  // - Near mouse = pure circular small dots
  // - Further away = gradually elongated into sleek micro-capsules / pills
  // - Screen-space dynamic chromatic color shifts
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
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
      lastMoveTime: performance.now()
    };

    // Center of the doughnut formation (follows mouse with spring inertia)
    const formationCenter = {
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0
    };

    function updatePointer(clientX, clientY) {
      mouse.targetX = clientX;
      mouse.targetY = clientY;
      mouse.active = true;
      mouse.lastMoveTime = performance.now();
    }

    window.addEventListener('pointermove', (e) => {
      updatePointer(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    // =========================================================================
    // Generate Doughnut (Annulus) Ring Formation with Small Dots
    // Doughnut parameters:
    // Inner hole radius: 105px (clear opening in center)
    // Outer radius: 310px (ring thickness = 205px)
    // =========================================================================
    const innerRadius = 105;
    const outerRadius = 310;
    const ringTracks = 11; // Number of concentric tracks inside the doughnut body
    const baseArcSpacing = 24; // Compact spacing for fine small dots
    const rings = [];

    for (let k = 0; k < ringTracks; k++) {
      const t = k / (ringTracks - 1);
      // Radius of this track inside the doughnut
      const radius = innerRadius + t * (outerRadius - innerRadius);
      const circumference = 2 * Math.PI * radius;
      const count = Math.max(12, Math.round(circumference / baseArcSpacing));
      const particles = [];
      // Harmonic rotation across the doughnut band
      const rotSpeed = (k % 2 === 0 ? 1 : -1) * (0.0018 / Math.sqrt(k + 1));

      // 3D Torus profile curve (particles near center of the tube are slightly elevated)
      const tubeHeight = Math.sin(t * Math.PI); // 0 at inner/outer edges, 1 at doughnut tube ridge

      for (let i = 0; i < count; i++) {
        const baseAngle = (i / count) * Math.PI * 2;
        particles.push({
          ringIndex: k,
          radius: radius,
          baseAngle: baseAngle,
          currentAngle: baseAngle,
          rotSpeed: rotSpeed,
          tubeHeight: tubeHeight,
          x: width / 2 + radius * Math.cos(baseAngle),
          y: height / 2 + radius * Math.sin(baseAngle)
        });
      }

      rings.push({
        radius: radius,
        particles: particles,
        rotSpeed: rotSpeed
      });
    }

    const startTime = performance.now();

    function renderDoughnutCanvas() {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const isDarkMode = currentTheme === 'dark';

      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // When idle (> 2.5s), gently sway around screen center in a smooth figure-eight
      const idleTime = now - mouse.lastMoveTime;
      let targetCenterX = mouse.x;
      let targetCenterY = mouse.y;

      if (!mouse.active || idleTime > 2500) {
        const driftT = elapsed * 0.4;
        targetCenterX = width / 2 + Math.cos(driftT) * (width * 0.14) + Math.sin(driftT * 0.6) * 30;
        targetCenterY = height / 2 + Math.sin(driftT * 0.8) * (height * 0.12);
      }

      // Fluid spring inertia follow for the doughnut center
      const dx = targetCenterX - formationCenter.x;
      const dy = targetCenterY - formationCenter.y;
      formationCenter.vx = formationCenter.vx * 0.82 + dx * 0.05;
      formationCenter.vy = formationCenter.vy * 0.82 + dy * 0.05;
      formationCenter.x += formationCenter.vx;
      formationCenter.y += formationCenter.vy;

      // Subtle atmospheric doughnut rim guide
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(formationCenter.x, formationCenter.y, innerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.025)' : 'rgba(0, 113, 227, 0.035)';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(formationCenter.x, formationCenter.y, outerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 113, 227, 0.03)';
      ctx.stroke();

      // Update & Render each small particle in the doughnut
      rings.forEach(ring => {
        ring.particles.forEach(p => {
          // Harmonic orbital rotation
          p.currentAngle += p.rotSpeed;

          // Target geometric position on doughnut around moving center
          const idealX = formationCenter.x + p.radius * Math.cos(p.currentAngle);
          const idealY = formationCenter.y + p.radius * Math.sin(p.currentAngle);

          // Fluid elastic lag towards ideal position
          p.x += (idealX - p.x) * 0.16;
          p.y += (idealY - p.y) * 0.16;

          // Distance from mouse cursor
          const distToCursor = Math.hypot(p.x - mouse.x, p.y - mouse.y);

          // Proximity Shape Morphing:
          // Near mouse (<= 60px): pure small circle (morph = 0)
          // Further away (>= 500px): small elongated pill capsule (morph = 1)
          const rawMorph = Math.max(0, Math.min(1, (distToCursor - 60) / 440));
          const morph = rawMorph * rawMorph * (3 - 2 * rawMorph); // smoothstep

          // Small dot dimensions:
          // Base small size: width = 3.2px, height = 3.2px (small dot)
          // Morph to small pill: width = 2.4px, height = 13.5px
          const pWidth = 3.2 - morph * 0.8;
          const pHeight = pWidth + morph * 11.5;

          // Radial alignment angle: points outward from cursor
          const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x) + Math.PI / 2;

          // Screen-space Chromatic Color Transition across different parts of screen:
          const normX = Math.max(0, Math.min(1, p.x / width));
          const normY = Math.max(0, Math.min(1, p.y / height));

          // 4-corner screen color mapping:
          // Top-Left (0, 0): Vivid Cyan / Sky Blue (195°)
          // Top-Right (1, 0): Orchid / Electric Purple (280°)
          // Bottom-Left (0, 1): Mint / Emerald (155°)
          // Bottom-Right (1, 1): Sunset Coral / Amber (350°)
          const topHue = 195 * (1 - normX) + 280 * normX;
          const botHue = 155 * (1 - normX) + 350 * normX;
          const particleHue = (topHue * (1 - normY) + botHue * normY + elapsed * 10) % 360;

          // Saturation, Lightness, and Alpha
          let sat, lit, alpha;
          if (isDarkMode) {
            sat = 88 + (1 - morph) * 12;
            lit = 60 + (1 - morph) * 20;
            alpha = 0.40 + p.tubeHeight * 0.25 + (1 - morph) * 0.35;
          } else {
            // Light Frosted Glass: rich jewel tones
            sat = 82 + (1 - morph) * 14;
            lit = 44 + (1 - morph) * 12;
            alpha = 0.50 + p.tubeHeight * 0.25 + (1 - morph) * 0.25;
          }

          // Draw Small Particle (Circle near mouse, Small Pill further away)
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(angle);
          ctx.fillStyle = `hsla(${particleHue}, ${sat}%, ${lit}%, ${alpha})`;

          if (pHeight <= pWidth + 0.6) {
            // Crisp Small Circular Dot
            ctx.beginPath();
            ctx.arc(0, 0, pWidth / 2, 0, Math.PI * 2);
            ctx.fill();

            // Specular micro-core near cursor
            if (distToCursor < 120) {
              ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.95)';
              ctx.beginPath();
              ctx.arc(0, 0, pWidth / 3.5, 0, Math.PI * 2);
              ctx.fill();
            }
          } else {
            // Sleek Small Pill / Capsule Shape
            const radius = pWidth / 2;
            const halfH = pHeight / 2;
            const halfW = pWidth / 2;

            ctx.beginPath();
            ctx.moveTo(-halfW + radius, -halfH);
            ctx.lineTo(halfW - radius, -halfH);
            ctx.arc(halfW - radius, -halfH + radius, radius, -Math.PI / 2, 0);
            ctx.lineTo(halfW, halfH - radius);
            ctx.arc(halfW - radius, halfH - radius, radius, 0, Math.PI / 2);
            ctx.lineTo(-halfW + radius, halfH);
            ctx.arc(-halfW + radius, halfH - radius, radius, Math.PI / 2, Math.PI);
            ctx.lineTo(-halfW, -halfH + radius);
            ctx.arc(-halfW + radius, -halfH + radius, radius, Math.PI, Math.PI * 1.5);
            ctx.closePath();
            ctx.fill();
          }

          ctx.restore();
        });
      });

      // Specular Light Halo around Cursor
      const cursorDist = Math.hypot(formationCenter.x - mouse.x, formationCenter.y - mouse.y);
      if (cursorDist < 250) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 110);
        const glowColor = isDarkMode ? 'rgba(10, 132, 255, 0.08)' : 'rgba(0, 113, 227, 0.05)';
        glowGrad.addColorStop(0, glowColor);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 110, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(renderDoughnutCanvas);
    }

    requestAnimationFrame(renderDoughnutCanvas);
  }
});

