/**
 * ABID SIDDIQUI — RESUME & PORTFOLIO INTERACTIVE SCRIPT
 * Theme: macOS Liquid Glass & Sonoma Frosted Glass UI
 * Background: Concentric Circle Particles with Mouse Tracking,
 * Circle-to-Pill Distance Morphing, and Screen-Space Dynamic Chromatic Shifts.
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
  const dockPdfBtn = document.getElementById('dock-pdf-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const appThemeBtn = document.getElementById('app-theme-btn');
  const macosThemeToggle = document.getElementById('macos-theme-toggle');
  const profileModalBtn = document.getElementById('profile-modal-btn');
  const dockProfileBtn = document.getElementById('dock-profile-btn');
  const profileModal = document.getElementById('profile-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTrafficClose = document.getElementById('modal-traffic-close');
  const signOutBtn = document.getElementById('sign-out-btn');
  const copyDetailsBtn = document.getElementById('copy-details-btn');
  const toastContainer = document.getElementById('toast-container');
  const navTabs = document.querySelectorAll('.nav-tab');
  const dockItems = document.querySelectorAll('.dock-item[data-target]');
  const contentSections = document.querySelectorAll('.content-section');
  const featureCards = document.querySelectorAll('.feature-card');
  const footerQuickView = document.getElementById('footer-quick-view');
  const accountPill = document.getElementById('account-pill');
  const liveClock = document.getElementById('macos-live-clock');

  // Window Controls
  const winCloseBtn = document.getElementById('win-close-btn');
  const winMinBtn = document.getElementById('win-min-btn');
  const winZoomBtn = document.getElementById('win-zoom-btn');

  // Resume PDF Path
  const PDF_PATH = "resume.pdf";

  // =========================================================================
  // 2. LIVE macOS MENU BAR CLOCK
  // =========================================================================
  function updateLiveClock() {
    if (!liveClock) return;
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dateNum = now.getDate();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    
    liveClock.textContent = `${dayName} ${monthName} ${dateNum}  ${hours}:${minutes} ${ampm}`;
  }

  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  // =========================================================================
  // 3. THEME MANAGER (DARK GLASS / LIGHT FROSTED GLASS)
  // =========================================================================
  const initTheme = () => {
    const savedTheme = localStorage.getItem('user_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('user_theme', newTheme);
    showToast(`Switched to macOS ${newTheme.toUpperCase()} Glass Theme`);
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (appThemeBtn) appThemeBtn.addEventListener('click', toggleTheme);
  if (macosThemeToggle) macosThemeToggle.addEventListener('click', toggleTheme);
  initTheme();

  // =========================================================================
  // 4. AUTHENTICATION & PORTAL ENTRY FLOW
  // =========================================================================
  const enterApp = (targetSection = 'section-overview') => {
    if (authenticateBtn) {
      authenticateBtn.disabled = true;
      authenticateBtn.innerHTML = `
        <svg class="btn-icon spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        <span>Opening macOS Profile...</span>
      `;
    }

    setTimeout(() => {
      authView.classList.remove('active');
      appView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Welcome • Portfolio Window Opened');
      switchTab(targetSection);
      if (authenticateBtn) {
        authenticateBtn.disabled = false;
        authenticateBtn.innerHTML = `
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
          <span class="btn-text">Enter Profile & Resume</span>
        `;
      }
    }, 380);
  };

  const exitToAuth = () => {
    if (profileModal) profileModal.classList.remove('open');
    appView.classList.remove('active');
    authView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Returned to Lock Screen');
  };

  if (authenticateBtn) authenticateBtn.addEventListener('click', () => enterApp('section-overview'));
  if (accountPill) accountPill.addEventListener('click', () => enterApp('section-overview'));
  if (returnAuthBtn) returnAuthBtn.addEventListener('click', exitToAuth);
  if (signOutBtn) signOutBtn.addEventListener('click', exitToAuth);
  if (footerQuickView) footerQuickView.addEventListener('click', (e) => { e.preventDefault(); enterApp('section-overview'); });

  // Window traffic light actions
  if (winCloseBtn) winCloseBtn.addEventListener('click', exitToAuth);
  if (winMinBtn) {
    winMinBtn.addEventListener('click', () => {
      const dashboard = document.querySelector('.dashboard-body');
      if (dashboard) {
        dashboard.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        dashboard.style.opacity = dashboard.style.opacity === '0' ? '1' : '0';
        dashboard.style.pointerEvents = dashboard.style.opacity === '0' ? 'none' : 'auto';
        showToast(dashboard.style.opacity === '0' ? 'Window minimized' : 'Window restored');
      }
    });
  }
  if (winZoomBtn) {
    winZoomBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        showToast('Entered Fullscreen Glass View');
      } else {
        document.exitFullscreen().catch(() => {});
        showToast('Exited Fullscreen');
      }
    });
  }

  // =========================================================================
  // 5. NAVIGATION, TAB SWITCHING & macOS DOCK
  // =========================================================================
  function switchTab(targetId) {
    // Header Segmented Tabs
    navTabs.forEach(tab => {
      if (tab.getAttribute('data-target') === targetId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // macOS Dock Items
    dockItems.forEach(item => {
      if (item.getAttribute('data-target') === targetId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
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

  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      if (!appView.classList.contains('active')) {
        enterApp(target);
      } else {
        switchTab(target);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-jump');
      if (target) switchTab(target);
    });
  });

  // Top Menu Bar interactive menu item clicks
  const topMenuItems = document.querySelectorAll('.macos-menu-item');
  topMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      topMenuItems.forEach(i => i.classList.remove('active-app-menu'));
      item.classList.add('active-app-menu');
      const menuType = item.getAttribute('data-menu');
      if (menuType === 'profile' && profileModal) {
        profileModal.classList.add('open');
      } else if (menuType === 'view') {
        toggleTheme();
      } else {
        showToast(`macOS Menu: ${item.textContent}`);
      }
    });
  });

  // =========================================================================
  // 6. PROFILE MODAL & UTILITIES
  // =========================================================================
  if (profileModalBtn) {
    profileModalBtn.addEventListener('click', () => {
      profileModal.classList.add('open');
    });
  }

  if (dockProfileBtn) {
    dockProfileBtn.addEventListener('click', () => {
      profileModal.classList.add('open');
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      profileModal.classList.remove('open');
    });
  }

  if (modalTrafficClose) {
    modalTrafficClose.addEventListener('click', () => {
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
  if (dockPdfBtn) dockPdfBtn.addEventListener('click', triggerPdfDownload);

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
      toast.style.transform = 'translateY(12px) scale(0.95)';
      toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // =========================================================================
  // 7. MAC OS LIQUID GLASS BACKGROUND PARTICLE SYSTEM
  // Features:
  // - Particles arranged in evenly spaced concentric circular rings
  // - Formation smoothly follows mouse cursor across the screen
  // - Near mouse = pure circles (aspect ratio 1:1)
  // - Gradually elongated into capsules / pill shapes as distance increases
  // - Continuous chromatic color transitions across screen quadrants
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

    // Center of the circular rings formation (follows mouse with fluid spring)
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

    // Generate Concentric Circles with Evenly Spaced Particles
    // Ring radii scale outward from inner core to outer screen boundaries
    const ringRadii = [38, 78, 128, 188, 258, 338, 428, 528, 638, 758, 888, 1028, 1178, 1338];
    const baseArcSpacing = 42; // Uniform arc spacing between adjacent particles on any circle
    const rings = [];

    ringRadii.forEach((radius, ringIndex) => {
      const circumference = 2 * Math.PI * radius;
      // Calculate particle count so particles are uniformly spaced along circumference
      const count = Math.max(8, Math.round(circumference / baseArcSpacing));
      const particles = [];
      // Harmonic alternating orbital rotation
      const rotSpeed = (ringIndex % 2 === 0 ? 1 : -1) * (0.0016 / Math.sqrt(ringIndex + 1));

      for (let i = 0; i < count; i++) {
        const baseAngle = (i / count) * Math.PI * 2;
        particles.push({
          ringIndex: ringIndex,
          ringRadius: radius,
          baseAngle: baseAngle,
          currentAngle: baseAngle,
          rotSpeed: rotSpeed,
          x: width / 2 + radius * Math.cos(baseAngle),
          y: height / 2 + radius * Math.sin(baseAngle),
          vx: 0,
          vy: 0
        });
      }

      rings.push({
        radius: radius,
        particles: particles,
        rotSpeed: rotSpeed
      });
    });

    const startTime = performance.now();

    function renderParticleCanvas() {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const isDarkMode = document.documentElement.getAttribute('data-theme') !== 'light';

      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // When idle (no mouse movement for > 2.5s), gently sway around screen center
      const idleTime = now - mouse.lastMoveTime;
      let targetCenterX = mouse.x;
      let targetCenterY = mouse.y;

      if (!mouse.active || idleTime > 2500) {
        const driftT = elapsed * 0.45;
        targetCenterX = width / 2 + Math.cos(driftT) * (width * 0.16) + Math.sin(driftT * 0.6) * 35;
        targetCenterY = height / 2 + Math.sin(driftT * 0.8) * (height * 0.14);
      }

      // Smooth inertia follow for the circular formation center
      const dx = targetCenterX - formationCenter.x;
      const dy = targetCenterY - formationCenter.y;
      formationCenter.vx = formationCenter.vx * 0.82 + dx * 0.05;
      formationCenter.vy = formationCenter.vy * 0.82 + dy * 0.05;
      formationCenter.x += formationCenter.vx;
      formationCenter.y += formationCenter.vy;

      // Faint subtle orbital ring guides in background
      ctx.lineWidth = 1;
      rings.forEach((ring, idx) => {
        if (idx % 2 === 0) {
          ctx.beginPath();
          ctx.arc(formationCenter.x, formationCenter.y, ring.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.025)' : 'rgba(0, 113, 227, 0.035)';
          ctx.stroke();
        }
      });

      // Update & Render each particle in the concentric circles
      rings.forEach(ring => {
        ring.particles.forEach(p => {
          // Harmonic rotation along circle
          p.currentAngle += p.rotSpeed;

          // Target ideal position on circle around following center
          const idealX = formationCenter.x + p.ringRadius * Math.cos(p.currentAngle);
          const idealY = formationCenter.y + p.ringRadius * Math.sin(p.currentAngle);

          // Fluid elastic lag towards ideal point
          p.x += (idealX - p.x) * 0.15;
          p.y += (idealY - p.y) * 0.15;

          // Distance from mouse cursor (or center)
          const distToCursor = Math.hypot(p.x - mouse.x, p.y - mouse.y);

          // Proximity Shape Morphing:
          // Near mouse (<= 70px): pure circle (morph = 0)
          // Further away (>= 680px): elongated pill / capsule (morph = 1)
          const rawMorph = Math.max(0, Math.min(1, (distToCursor - 70) / 610));
          const morph = rawMorph * rawMorph * (3 - 2 * rawMorph); // smoothstep curve

          // Pill dimensions:
          // Near mouse: width=6.2, height=6.2 (aspect ratio 1:1, circle)
          // Far away: width=4.6, height=32 (stretched rounded pill capsule)
          const pWidth = 6.2 - morph * 1.6;
          const pHeight = pWidth + morph * 26;

          // Radial alignment angle: points radially outward from cursor
          const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x) + Math.PI / 2;

          // Screen-space Chromatic Color Transition across different parts of screen:
          const normX = Math.max(0, Math.min(1, p.x / width));
          const normY = Math.max(0, Math.min(1, p.y / height));

          // Map 4 screen corners to vibrant macOS hues:
          // Top-Left (0, 0): Cyan / Aqua (192°)
          // Top-Right (1, 0): Electric Purple (285°)
          // Bottom-Left (0, 1): Mint / Emerald (150°)
          // Bottom-Right (1, 1): Sunset Rose / Coral (348°)
          const topHue = 192 * (1 - normX) + 285 * normX;
          const botHue = 150 * (1 - normX) + 348 * normX;
          const particleHue = (topHue * (1 - normY) + botHue * normY + elapsed * 10) % 360;

          // Saturation, Lightness, and Alpha depending on theme and proximity
          let sat, lit, alpha;
          if (isDarkMode) {
            sat = 88 + (1 - morph) * 12; // 88% - 100%
            lit = 58 + (1 - morph) * 22; // 58% - 80% (bright specular glow near mouse)
            alpha = 0.38 + (1 - morph) * 0.52; // 0.38 - 0.90
          } else {
            sat = 80 + (1 - morph) * 15;
            lit = 45 + (1 - morph) * 15;
            alpha = 0.45 + (1 - morph) * 0.45;
          }

          // Draw Particle (Circle when near, Pill when further away)
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(angle);
          ctx.fillStyle = `hsla(${particleHue}, ${sat}%, ${lit}%, ${alpha})`;

          if (pHeight <= pWidth + 0.8) {
            // Pristine Round Circle
            ctx.beginPath();
            ctx.arc(0, 0, pWidth / 2, 0, Math.PI * 2);
            ctx.fill();

            // Specular core dot near mouse
            if (distToCursor < 140) {
              ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.95)';
              ctx.beginPath();
              ctx.arc(0, 0, pWidth / 4, 0, Math.PI * 2);
              ctx.fill();
            }
          } else {
            // Sleek Rounded Capsule / Pill Shape
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

      // Subtle Liquid Specular Lens Glow around Cursor
      const cursorGlowDist = Math.hypot(formationCenter.x - mouse.x, formationCenter.y - mouse.y);
      if (cursorGlowDist < 300) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 140);
        const glowColor = isDarkMode ? 'rgba(10, 132, 255, 0.08)' : 'rgba(0, 113, 227, 0.05)';
        glowGrad.addColorStop(0, glowColor);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 140, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(renderParticleCanvas);
    }

    requestAnimationFrame(renderParticleCanvas);
  }
});

