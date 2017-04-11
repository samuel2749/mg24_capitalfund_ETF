$(function() {
  setButton();
  swiper();

  function swiper() {
    var appendNumber = 4;
    var prependNumber = 1;
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 2,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
    });
  }

  function setButton() {
    var fontSize = 14;
    $('.font-add').on('click', function() {
      if (fontSize >= 16) return;

      fontSize += 2;
      $('.list p').css({
        'fontSize': fontSize
      });
    });

    $('.font-less').on('click', function() {
      if (fontSize <= 12) return;

      fontSize -= 2;
      $('.list p').css({
        'fontSize': fontSize
      });
    });
  }

});
