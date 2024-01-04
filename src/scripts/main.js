const body = document.body;
const burgerBtn = document.querySelector('.burger_btn');
const navbarWrapper = document.querySelector('.navbar_wrapper');

burgerBtn.addEventListener('click', function (event) {
  event.stopPropagation();

  body.classList.toggle('body--open_menu_mod');
});

document.addEventListener('click', function (event) {
  if (!navbarWrapper.contains(event.target)) {
    if (body.classList.contains('body--open_menu_mod')) {
      body.classList.remove('body--open_menu_mod');
    }
  }
});
