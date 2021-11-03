const menu_btn = document.getElementById('menu-btn');
const menu_items = document.getElementById('menu-items');

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
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
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
