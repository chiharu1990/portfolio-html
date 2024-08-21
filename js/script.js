const SwiperThumbnail = (thumbClass, swiper) => {
  const sliderThumbnail = document.getElementsByClassName(thumbClass)[0].getElementsByTagName("li");
  for (let i = 0; i < sliderThumbnail.length; i++) {
    sliderThumbnail[i].addEventListener("click", () => {
      swiper.slideTo(i, 0, false);
    });
  }
};
const swiper = new Swiper(".slider-display", {
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 2000,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

SwiperThumbnail("slider-thumbnail", swiper);

// スライダーのサムネイル表示切り替え
$(function () {
  const sliderDisplay = ".slider-display";
  const sliderThumbnail = ".slider-thumbnail";

  $(".slider-list-icon").on("click", function () {
    if ($(this).hasClass("display") === false) {
      $(sliderThumbnail).addClass("display");
      $(sliderDisplay).addClass("display");
      $(this).attr("src", "/image/slider-display-icon.svg").addClass("display");
    } else {
      $(sliderDisplay).removeClass("display");
      $(sliderThumbnail).removeClass("display");
      $(this).attr("src", "/image/slider-gallery-icon.svg").removeClass("display");
    }
  });

  $(".slider-thumbnail-list li").on("click", function () {
    $(sliderDisplay).removeClass("display");
    $(sliderThumbnail).removeClass("display");
    $(".slider-list-icon").attr("src", "/image/slider-gallery-icon.svg").removeClass("display");
  });
});

// モーダル
$(function () {
  $("#modal-open").on("click", function () {
    $(".modal-container").fadeIn();
  });
  $("#close-modal").on("click", function () {
    $(".modal-container").fadeOut();
  });
  $(".modal-bg").on("click", function () {
    $(".modal-container").fadeOut();
  });
});

//グローバルナビゲーション
$(function () {
  $("#g-nav-btn").on("click", function () {
    $(this).toggleClass("active");
    const nav = $("nav");
    const navBg = $(".bg-circle");
    nav.toggleClass("active");
    navBg.toggleClass("active");
  });
});
