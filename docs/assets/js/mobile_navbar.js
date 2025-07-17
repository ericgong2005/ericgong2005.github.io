document.addEventListener('DOMContentLoaded', function() {
  var toggle     = document.querySelector('.navbar-toggle');
  var sidebar    = document.querySelector('.sidebar-menu');
  var overlay    = document.querySelector('.sidebar-overlay');
  var closeBtn   = document.querySelector('.sidebar-close');
  var body       = document.body;

  function openMenu() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    body.classList.add('menu-open');
    sidebar.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
  }
  function closeMenu() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    body.classList.remove('menu-open');
    sidebar.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
  }

  toggle.addEventListener('click', function() {
    sidebar.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);
  closeBtn.addEventListener('click', closeMenu);
});
