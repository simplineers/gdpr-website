  // Make chips keyboard-focusable and announce both label and tooltip to screen readers
  (function () {
    var chips = document.querySelectorAll('.chip');
    for (var i = 0; i < chips.length; i++) {
      var c = chips[i];
      if (!c.hasAttribute('tabindex')) c.setAttribute('tabindex', '0');
      if (!c.hasAttribute('role')) c.setAttribute('role', 'button');
      var tip = c.getAttribute('data-tip');
      var label = c.textContent.trim();
      if (tip && !c.hasAttribute('aria-label')) {
        c.setAttribute('aria-label', label + '. ' + tip);
      }
    }
  })();
