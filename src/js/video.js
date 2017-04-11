$(function() {

  var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView: 2,
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 30,
  });
  $('.swiper-pagination span').eq(2).click();


  var accordionTitleLi = $('.accordion-title li');
  var accordionList = $('.all-box > div');

  // accordionTitle click
  accordionTitleLi.on('click', function() {
    var j_this = $(this);
    var index = j_this.index();
    if (j_this.hasClass('active')) return;

    j_this.addClass('active').siblings().removeClass('active');
    console.log(index);
    accordionList.hide().eq(index).show();
    // accordionList.css({position: 'absolute'}).fadeOut().eq(index).css({position: 'relative'}).fadeIn();
  });


});
