var btn = document.querySelector('.burger-menu');
var list = document.querySelector('.nav-list');
var btnOpen = false;
btn.addEventListener('click', function (T) {
  if (btnOpen) {
    list.classList.remove('open');
    btnOpen = false;
  }
  else {
    list.classList.add('open');
    btnOpen = true;
  }
});