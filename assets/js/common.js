/**
 * CyberGuard Academy - Information Assurance & Security
 * Shared Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initImageFallbacks();
  initAccordions();
  initNavSelector();
  initProgressTracker();
});

// Scroll progress bar indicator
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + '%';
  });
}

// Global Image fallback mechanism to ensure visuals ALWAYS look sleek
function initImageFallbacks() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('error', function() {
      const topic = this.getAttribute('data-topic') || 'cybersecurity';
      const title = this.getAttribute('alt') || 'Information Security Visual';
      
      // Inline beautiful cyber-themed SVG placeholder
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0f172a" />
              <stop offset="50%" stop-color="#1e293b" />
              <stop offset="100%" stop-color="#0b1120" />
            </linearGradient>
            <linearGradient id="cyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#06b6d4" />
              <stop offset="100%" stop-color="#3b82f6" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
          <circle cx="400" cy="180" r="70" fill="none" stroke="url(#cyan)" stroke-width="4" stroke-dasharray="8 6" opacity="0.6"/>
          <path d="M400 135 L435 155 L435 195 C435 218 400 235 400 235 C400 235 365 218 365 195 L365 155 Z" fill="rgba(6, 182, 212, 0.2)" stroke="#38bdf8" stroke-width="3"/>
          <path d="M392 182 L400 190 L412 174" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="400" y="290" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="20" font-weight="700" text-anchor="middle">${escapeXml(title)}</text>
          <text x="400" y="320" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">Information Assurance &amp; Security Education</text>
          <text x="400" y="345" fill="#38bdf8" font-family="monospace" font-size="12" text-anchor="middle">MODULE 1 • ${escapeXml(topic.toUpperCase())}</text>
        </svg>
      `;
      this.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  });
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// Accordion toggle helper
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = content.style.display === 'block';
      
      // Close all siblings if needed, or toggle current
      content.style.display = isOpen ? 'none' : 'block';
      const icon = header.querySelector('.accordion-icon');
      if (icon) {
        icon.textContent = isOpen ? '➕' : '➖';
      }
    });
  });
}

// Nav selector dropdown quick-jump
function initNavSelector() {
  const selector = document.getElementById('lesson-quick-select');
  if (!selector) return;

  selector.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val) {
      window.location.href = val;
    }
  });
}

// Mark lesson completed in LocalStorage
function initProgressTracker() {
  const currentPath = window.location.pathname;
  let lessonId = null;

  if (currentPath.includes('Lesson%201') || currentPath.includes('Lesson 1')) lessonId = 'lesson1';
  else if (currentPath.includes('Lesson%202') || currentPath.includes('Lesson 2')) lessonId = 'lesson2';
  else if (currentPath.includes('Lesson%203') || currentPath.includes('Lesson 3')) lessonId = 'lesson3';
  else if (currentPath.includes('Lesson%204') || currentPath.includes('Lesson 4')) lessonId = 'lesson4';
  else if (currentPath.includes('Activities')) lessonId = 'activities';
  else if (currentPath.includes('Projects')) lessonId = 'projects';
  else if (currentPath.includes('Assessments')) lessonId = 'assessments';

  if (lessonId) {
    const completed = JSON.parse(localStorage.getItem('cyber_completed_lessons') || '[]');
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem('cyber_completed_lessons', JSON.stringify(completed));
    }
  }

  // Update badge ticks on main page
  const progressBadge = document.getElementById('user-progress-count');
  if (progressBadge) {
    const completed = JSON.parse(localStorage.getItem('cyber_completed_lessons') || '[]');
    progressBadge.textContent = `${completed.length}/7 Completed`;
  }
}

