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
