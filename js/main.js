/* ============================================================
   PDFNova — Landing page logic
   ============================================================ */
(function () {
  'use strict';

  buildHeaderDropdown();

  // ---- Render tools grid ----
  var grid = document.getElementById('tools-grid');
  var searchInput = document.getElementById('tool-search');
  var filterBar = document.getElementById('tool-filters');
  var activeFilter = 'all';

  function renderGrid() {
    if (!grid) return;
    var q = (searchInput && searchInput.value || '').trim().toLowerCase();
    var list = PDF_TOOLS.filter(function (t) {
      var matchesFilter = activeFilter === 'all' || t.category === activeFilter;
      var matchesQuery = !q || (t.name + ' ' + t.short + ' ' + t.category).toLowerCase().indexOf(q) !== -1;
      return matchesFilter && matchesQuery;
    });
    if (list.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--slate);padding:30px 0">' +
        'No tools match "<strong>' + q.replace(/</g, '&lt;') + '</strong>". Try "merge", "compress" or "convert".</p>';
      return;
    }
    grid.innerHTML = list.map(toolCardHTML).join('');
  }

  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      activeFilter = btn.getAttribute('data-filter');
      filterBar.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderGrid();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', renderGrid);
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = grid.querySelector('.tool-card');
        if (first) window.location.href = first.getAttribute('href');
      }
      if (e.key === 'Escape') {
        searchInput.value = '';
        renderGrid();
        searchInput.blur();
      }
    });

    // Global keyboard shortcut: Ctrl+K or Cmd+K or "/" to focus search
    window.addEventListener('keydown', function (e) {
      var isInput = /^(input|textarea)$/i.test(document.activeElement.tagName);
      if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !isInput)) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
        window.scrollTo({ top: searchInput.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
      }
    });
  }

  renderGrid();


  // ---- Mobile menu ----
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
      hamburger.innerHTML = nav.classList.contains('open')
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // ---- Animated counters (stats band) ----
  var counters = document.querySelectorAll('.stat-num span[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        var target = parseInt(el.getAttribute('data-count'), 10);
        var start = null;
        function tick(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 900, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  }
})();
