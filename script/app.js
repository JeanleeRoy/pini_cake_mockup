const menu_btn = document.getElementById('menu-btn');
const menu_items = document.getElementById('menu-items');
const links_index = document.querySelectorAll('.linkToIndex');

// Prevent 404 index page on github
links_index.forEach( item => {
  item.addEventListener('click', e => {
    var href = e.currentTarget.href || '';
    // on GitHub environment
    if (href.split("/").includes("jeanleeroy.github.io")) {
      e.preventDefault();
      window.location.href = "https://jeanleeroy.github.io/pini_cake_mockup/";
    }
  }, false);
})


// Menu button
menu_btn.addEventListener('click', () => {
    menu_items.classList.toggle('active');
})

// Cake slider
var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: "#ftd--next-btn",
        prevEl: "#ftd--prev-btn",
    },
    loop: true,
    breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 50,
        }
      }
});


// Testimonial slider
var swiper_2 = new Swiper(".testimonials", {
  navigation: {
      nextEl: "#tes--next-btn"
  },
  loop: true
});
