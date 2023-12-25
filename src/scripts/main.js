const BurgerBtn = document.querySelector('.burger_btn');
const Navbar = document.querySelector('.navbar_wrapper');
const TitleActive = document.querySelector('.burger_btn_title.title_active');
const TitleClose = document.querySelector('.burger_btn_title.burger_btn_close');

BurgerBtn.addEventListener('click', function () {
  BurgerBtn.classList.toggle('burger_btn_active');
  Navbar.classList.toggle('navbar_wrapper_active');
  TitleActive.classList.toggle('title_active');
  TitleClose.classList.toggle('title_active');
});
