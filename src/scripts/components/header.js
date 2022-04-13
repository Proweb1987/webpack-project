const btn = document.querySelector('.header__btn'),
      list = document.querySelector('.header__nav-list'),
      bg = document.querySelector('.bg');

btn.addEventListener('click', () => {
    list.classList.add('active');
    bg.classList.add('active')
})
bg.addEventListener('click', () => {
    list.classList.remove('active');
    bg.classList.remove('active');
})