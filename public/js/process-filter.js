// Filter på klassificering — döljer icke-matchande rader och meddelar via aria-live
(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const body = document.body;
  const status = document.getElementById('filter-status');

  const labels = {
    all: 'samtliga processer',
    allmaen: 'allmänna processer',
    typisk: 'typiska processer',
    villkorad: 'villkorade processer',
    bransch: 'bransch- eller storleksberoende processer',
    mognads: 'mognadsberoende processer'
  };

  function applyFilter(f) {
    buttons.forEach(b => b.setAttribute('aria-pressed', b.dataset.f === f ? 'true' : 'false'));

    let total = 0;
    if (f === 'all') {
      body.classList.remove('filter-active');
      document.querySelectorAll('.proc-tbl tbody tr').forEach(r => {
        r.classList.remove('match');
        total++;
      });
      document.querySelectorAll('.cat').forEach(c => c.classList.remove('has-match'));
    } else {
      body.classList.add('filter-active');
      document.querySelectorAll('.cat').forEach(cat => {
        let any = false;
        cat.querySelectorAll('tbody tr').forEach(r => {
          const m = r.dataset.cls === f;
          r.classList.toggle('match', m);
          if (m) { any = true; total++; }
        });
        cat.classList.toggle('has-match', any);
      });
    }

    if (status) {
      if (f === 'all') {
        status.textContent = 'Visar samtliga ' + total + ' processer.';
      } else {
        status.textContent = 'Visar ' + total + ' ' + (labels[f] || 'processer') + '.';
      }
    }
  }

  buttons.forEach(b => {
    b.addEventListener('click', () => applyFilter(b.dataset.f));
  });

  // Initiera räknare
  let initialTotal = document.querySelectorAll('.proc-tbl tbody tr').length;
  if (status) status.textContent = 'Visar samtliga ' + initialTotal + ' processer.';
})();
