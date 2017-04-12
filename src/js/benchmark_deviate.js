(function($) {
  $(function() {
    setButton();
    accordion();

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

    function setButton() {
      $('.section.stock .more-btn').on('click', function() {
        $(".ETF-type select").val("stock").change();
      });
      $('.section.fund .more-btn').on('click', function() {
        $(".ETF-type select").val("fund").change();
      });
      $('.section.bond .more-btn').on('click', function() {
        $(".ETF-type select").val("bond").change();
      });
    }

    function accordion() {
      var accordionTitleLi = $('.accordion-title li');
      // var accordionList = $('.m-table .table');

      // accordionTitle click
      accordionTitleLi.on('click', function() {
        var j_this = $(this);
        var index = j_this.index();
        console.log('index = ', index);
        if (j_this.hasClass('active')) return;

        j_this.addClass('active').siblings().removeClass('active');
        if (index === 0) {
          j_this.parents('.section').find('.t-day').show();
          j_this.parents('.section').find('.t-acc').hide();
        } else {
          j_this.parents('.section').find('.t-day').hide();
          j_this.parents('.section').find('.t-acc').show();
        }
        // accordionList.hide().eq(index).show();
        // accordionList.css({position: 'absolute'}).fadeOut().eq(index).css({position: 'relative'}).fadeIn();
      });
    }


    $('.ETF-type select').on('change', function() {
      console.log( $(this).val() );
      var val = $(this).val();
      if ( val === "all") {
        $('.section-box').hide();
        $('.section-box.ETFs-all').show();
      } else if ( val === "stock") {
        $('.section-box').hide();
        $('.section-box.ETFs-stock').show();
      } else if ( val === "fund") {
        $('.section-box').hide();
        $('.section-box.ETFs-fund').show();
      } else if ( val === "bond") {
        $('.section-box').hide();
        $('.section-box.ETFs-bond').show();
      }
    })

  });

})(jQuery)
