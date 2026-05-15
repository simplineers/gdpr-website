  // Build a map: number -> {title, rest, meta} from the audit list at the bottom
  const tipMap = {};
  document.querySelectorAll('.audit-item').forEach(item => {
    const numEl = item.querySelector('.audit-num');
    const textEl = item.querySelector('.audit-text');
    if (!numEl || !textEl) return;
    const num = numEl.textContent.trim();

    const cloned = textEl.cloneNode(true);
    const titleEl = cloned.querySelector('strong');
    const metaEl = cloned.querySelector('.meta');
    const title = titleEl ? titleEl.textContent.trim() : '';
    const meta = metaEl ? metaEl.textContent.trim() : '';
    if (titleEl) titleEl.remove();
    if (metaEl) metaEl.remove();
    let rest = cloned.textContent.trim();
    rest = rest.replace(/^[—–-]\s*/, '').replace(/\s+/g, ' ');

    tipMap[num] = { title, rest, meta };
  });

  // Single tooltip element reused for all markers
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  function showTip(marker) {
    const num = marker.textContent.trim();
    const data = tipMap[num];
    if (!data) return;
    tooltip.innerHTML =
      '<div class="tip-title">#' + num + ' · ' + data.title + '</div>' +
      '<div class="tip-rest">' + data.rest + '</div>' +
      '<div class="tip-meta">' + data.meta + '</div>';
    tooltip.classList.add('visible');
    positionTip(marker);
  }

  function positionTip(marker) {
    const rect = marker.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();
    const margin = 10;
    const edge = 12;

    // Center horizontally on the marker
    let left = rect.left + rect.width / 2 - tipRect.width / 2 + window.scrollX;
    // Keep within viewport
    if (left < edge) left = edge;
    if (left + tipRect.width > window.innerWidth - edge) {
      left = window.innerWidth - tipRect.width - edge;
    }

    // Try above first; if no room, place below
    let top = rect.top + window.scrollY - tipRect.height - margin;
    if (top < window.scrollY + edge) {
      top = rect.bottom + window.scrollY + margin;
      tooltip.classList.remove('above');
      tooltip.classList.add('below');
    } else {
      tooltip.classList.remove('below');
      tooltip.classList.add('above');
    }

    // Adjust the arrow to point at the marker even if tooltip got pushed sideways
    const markerCenterX = rect.left + rect.width / 2 + window.scrollX;
    const arrowLeft = markerCenterX - left;
    tooltip.style.setProperty('--arrow-x', arrowLeft + 'px');

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }

  function hideTip() {
    tooltip.classList.remove('visible');
  }

  document.querySelectorAll('.marker, .slutsvar-marker').forEach(marker => {
    marker.addEventListener('mouseenter', () => showTip(marker));
    marker.addEventListener('mouseleave', hideTip);
    // Tap support for touch devices
    marker.addEventListener('click', (e) => {
      e.stopPropagation();
      if (tooltip.classList.contains('visible') && tooltip.dataset.for === marker.textContent.trim()) {
        hideTip();
      } else {
        tooltip.dataset.for = marker.textContent.trim();
        showTip(marker);
      }
    });
  });

  // Tap outside to dismiss on touch
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.marker') && !e.target.closest('.slutsvar-marker')) {
      hideTip();
    }
  });

  // Reposition tooltip on scroll/resize while visible
  window.addEventListener('scroll', () => tooltip.classList.remove('visible'), { passive: true });
  window.addEventListener('resize', () => tooltip.classList.remove('visible'));
