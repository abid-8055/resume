/**
 * ABID SIDDIQUI — RESUME & PORTFOLIO INTERACTIVE SCRIPT
 * Features: Auth flow, Tab Switcher, Ambient Particles, Theme Manager, PDF Download
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
  // 2. THEME MANAGER
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
    showToast(`Switched to ${newTheme.toUpperCase()} theme`);
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (appThemeBtn) appThemeBtn.addEventListener('click', toggleTheme);
  initTheme();

  // =========================================================================
  // 3. AUTHENTICATION / PORTAL ENTRY FLOW
  // =========================================================================
  const enterApp = (targetSection = 'section-overview') => {
    if (authenticateBtn) {
      authenticateBtn.disabled = true;
      authenticateBtn.innerHTML = `
        <svg class="btn-icon spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
        <span>Opening Resume Profile...</span>
      `;
    }

    setTimeout(() => {
      authView.classList.remove('active');
      appView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Welcome • Profile Loaded');
      switchTab(targetSection);
      if (authenticateBtn) {
        authenticateBtn.disabled = false;
        authenticateBtn.innerHTML = `
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
          <span class="btn-text">Enter Profile & Resume</span>
        `;
      }
    }, 400);
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
    navTabs.forEach(tab => {
      if (tab.getAttribute('data-target') === targetId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

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
  // 5. PROFILE MODAL & UTILS
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
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // =========================================================================
  // 6. AMBIENT BACKGROUND PARTICLES CANVAS
  // =========================================================================
  const ambientCanvas = document.getElementById('ambient-canvas');
  if (ambientCanvas) {
    const ctx = ambientCanvas.getContext('2d');
    let width = (ambientCanvas.width = window.innerWidth);
    let height = (ambientCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.2,
        color: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4'][Math.floor(Math.random() * 5)]
      });
    }

    function renderAmbient() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // Subtle constellation lines
      ctx.strokeStyle = '#3b82f6';
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.globalAlpha = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(renderAmbient);
    }

    renderAmbient();
  }
});
