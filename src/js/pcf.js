$(function() {
  var accordionTitleLi = $('.accordion-title li');
  var accordionList = $('.other .table-box');

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

  swiper();
  datepicker();

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
    $('.swiper-pagination span').eq(1).click();
  }

  function datepicker() {
    $( "#datepicker" ).datepicker({
      dateFormat: "yy-mm-dd",
      beforeShow: function (input, inst) {
        setTimeout(function () {
          inst.dpDiv.css({
            top: 490,
            left: 310
          });
        }, 0);
      },
      onSelect: function() {
        var currentDate = $( "#datepicker" ).datepicker( "getDate" );
        console.log($('#datepicker').val());
        var val = $('#datepicker').val()
        $('.info-date span').html(val);
        console.log('currentDate = ', currentDate.getFullYear()  );
      }
    });

    $( "#datepicker" ).css({
      top: 10,
      left: 10
    });

    $('.select-date').on('click', function() {
      $( "#datepicker" ).datepicker( "show" );
    });




  }

});
