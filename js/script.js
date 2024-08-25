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

// グローバルナビゲーション
$(function () {
  $("#g-nav-btn").on("click", function () {
    $(this).toggleClass("active");
    const nav = $("nav");
    const navBg = $(".bg-circle");
    nav.toggleClass("active");
    navBg.toggleClass("active");
  });
});

// 写真を拡大表示
$(function () {
  if (window.matchMedia("(min-width: 768px)").matches) {
    const expPhotoImageArea = $(".exp-photo-image-area");
    const expPhotoImg = $(".exp-photo-image-area img");
    const zoomArea = $(".exp-photo-image-zoom-area");
    const zoomAreaImg = $(".exp-photo-image-zoom-area img");
    const expPhotoLens = $(".exp-photo-lens");
    const size = 200;
    const scale = expPhotoImageArea.innerWidth() / size;

    $.fn.clickToggle = function (a, b) {
      return this.each(function () {
        var clicked = false;
        $(this).on("click", function () {
          clicked = !clicked;
          if (clicked) {
            return a.apply(this, arguments);
          }
          return b.apply(this, arguments);
        });
      });
    };

    expPhotoImageArea.clickToggle(
      function (e) {
        // zoom機能ON
        zoomArea.addClass("active");
        expPhotoLens.addClass("active");
        zoomAreaImg.attr("src", expPhotoImg.attr("src"));
        zoomAreaImg.css("width", expPhotoImg.innerWidth() * scale + "px");
        const imgMaxX = expPhotoImg.outerWidth() - size;
        const imgMaxY = expPhotoImg.outerHeight() - size;
        // マウスカーソルの座標を取得(windowから)
        let offset = $(this).offset();
        // マウスカーソルの座標を取得(要素から)
        let mouseX = e.pageX - offset.left;
        let mouseY = e.pageY - offset.top;
        // lensの表示位置をマウスカーソルの真ん中にする
        let lensX = mouseX - size / 2;
        let lensY = mouseY - size / 2;
        expPhotoLens.css({ left: lensX + "px", top: lensY + "px" });

        expPhotoImageArea.mousemove(function (e) {
          let offset = $(this).offset();
          // マウスカーソルの座標を取得
          let mouseX = e.pageX - offset.left;
          let mouseY = e.pageY - offset.top;
          // lensの表示位置をマウスカーソルの真ん中にする
          let lensX = mouseX - size / 2;
          let lensY = mouseY - size / 2;

          if (lensX > imgMaxX) {
            lensX = imgMaxX;
          }
          if (lensY > imgMaxY) {
            lensY = imgMaxY;
          }
          if (lensX < 0) {
            lensX = 0;
          }
          if (lensY < 0) {
            lensY = 0;
          }

          expPhotoLens.css({ left: lensX + "px", top: lensY + "px" });
          zoomAreaImg.css({
            "margin-left": -(lensX * scale) + "px",
            "margin-top": -(lensY * scale) + "px",
          });
        });
        expPhotoImageArea.mouseleave(function () {
          zoomArea.removeClass("active");
          expPhotoLens.removeClass("active");
        });
        expPhotoImageArea.mouseenter(function () {
          zoomArea.addClass("active");
          expPhotoLens.addClass("active");
        });
      },
      function () {
        // zoom機能OFF
        zoomArea.removeClass("active");
        expPhotoLens.removeClass("active");
        expPhotoImageArea.off("mouseleave mouseenter mousemove");
      }
    );
  }
});
