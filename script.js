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
  // 6. LIQUID AURORA MESH & INTERACTIVE CYBER-CONSTELLATION NETWORK
  // Features:
  // - Atmospheric glowing chromatic light caustics (Sonoma / Apple Intelligence aesthetic)
  // - Floating identity topology nodes with delicate synaptic connection threads
  // - Subtle interactive cursor magnetic field & light refraction
  // - Adapts dynamically between Light Frosted Glass & Dark Glass modes
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

    // Chromatic Aurora Orbs (Glow behind frosted glass)
    const auroraOrbs = [
      {
        baseX: 0.2, baseY: 0.25,
        radius: 380,
        speedX: 0.35, speedY: 0.28,
        colorDark: 'rgba(10, 132, 255, 0.22)',   // Sapphire Blue
        colorLight: 'rgba(0, 113, 227, 0.14)'
      },
      {
        baseX: 0.8, baseY: 0.2,
        radius: 420,
        speedX: -0.28, speedY: 0.32,
        colorDark: 'rgba(191, 90, 242, 0.18)',  // Purple / Orchid
        colorLight: 'rgba(175, 82, 222, 0.12)'
      },
      {
        baseX: 0.3, baseY: 0.8,
        radius: 400,
        speedX: 0.30, speedY: -0.25,
        colorDark: 'rgba(48, 209, 88, 0.16)',   // Emerald Mint
        colorLight: 'rgba(40, 205, 65, 0.11)'
      },
      {
        baseX: 0.85, baseY: 0.75,
        radius: 440,
        speedX: -0.22, speedY: -0.30,
        colorDark: 'rgba(255, 159, 10, 0.16)',  // Sunset Coral / Amber
        colorLight: 'rgba(255, 149, 0, 0.10)'
      }
    ];

    // Constellation / Identity Topology Nodes
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
        hue: [205, 270, 150, 35, 330][Math.floor(Math.random() * 5)]
      });
    }

    const startTime = performance.now();

    function renderAmbientMesh() {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const isDarkMode = currentTheme === 'dark';

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // =====================================================================
      // 1. RENDER CHROMATIC AURORA LIGHT CAUSTICS
      // =====================================================================
      auroraOrbs.forEach(orb => {
        const ox = (orb.baseX * width) + Math.cos(elapsed * orb.speedX) * (width * 0.12);
        const oy = (orb.baseY * height) + Math.sin(elapsed * orb.speedY) * (height * 0.10);
        
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.radius);
        const color = isDarkMode ? orb.colorDark : orb.colorLight;
        grad.addColorStop(0, color);
        grad.addColorStop(0.65, color.replace(/[\d\.]+\)$/, isDarkMode ? '0.06)' : '0.03)'));
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Cursor Atmospheric Refraction Glow
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        cursorGlow.addColorStop(0, isDarkMode ? 'rgba(10, 132, 255, 0.14)' : 'rgba(0, 113, 227, 0.09)');
        cursorGlow.addColorStop(0.6, isDarkMode ? 'rgba(191, 90, 242, 0.05)' : 'rgba(175, 82, 222, 0.03)');
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

        // Draw Node Dot
        const sat = isDarkMode ? 85 : 80;
        const lit = isDarkMode ? (55 + proximityBoost * 30) : (42 + proximityBoost * 20);
        const alpha = Math.min(1, node.baseAlpha + proximityBoost * 0.5);

        ctx.fillStyle = `hsla(${node.hue}, ${sat}%, ${lit}%, ${alpha})`;
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
              ? `rgba(148, 163, 184, ${linkAlpha})` 
              : `rgba(0, 113, 227, ${linkAlpha})`;
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
            ctx.strokeStyle = isDarkMode 
              ? `rgba(10, 132, 255, ${cursorLinkAlpha})` 
              : `rgba(0, 113, 227, ${cursorLinkAlpha})`;
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


