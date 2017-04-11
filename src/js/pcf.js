(function($) {
  $(function() {
    swiper();
    datepicker();
    accordion();
  });

  function accordion() {
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
  }

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
    // var j_datepicker = $('.ui-widget-content');
    // var j_datepickerHandler = $('.select-date');

    $("#datepicker").datepicker({
      dateFormat: "yy-mm-dd",
      beforeShow: function (input, inst) {
        setTimeout(function () {
          var j_datepickerHandler = $('.select-date');
          var top = j_datepickerHandler.offset().top;
          var left = j_datepickerHandler.offset().left;
          inst.dpDiv.css({
            top: top + 40,
            left: left - 160
          });
        }, 0);
      },
      onSelect: function() {
        var currentDate = $( "#datepicker" ).datepicker( "getDate" );
        var val = $('#datepicker').val()
        $('.info-date span').html(val);
      }
    });

    $( "#datepicker" ).css({
      top: 10,
      left: 10
    });

    $('.select-date').on('click', function() {
      $( "#datepicker" ).datepicker( "show" );
    });

    $(window).resize(function() {
      var j_datepicker = $('.ui-widget-content');
      var j_datepickerHandler = $('.select-date');
      var top = j_datepickerHandler.offset().top;
      var left = j_datepickerHandler.offset().left;
      j_datepicker.css({
        top: top + 40,
        left: left -160
      })
    }).resize();

  }

})(jQuery)
