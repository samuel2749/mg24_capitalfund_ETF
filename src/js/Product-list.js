(function($) {
  var _temp = '',
      _init;
  $(function() {
    setButton();
    setfundInfoOrder();
    setEventListener();

    var accordionTitleLi = $('.a1 .accordion-title li');
    var accordionList = $('.a-box1 .list-box > li');

    // accordionTitle click
    accordionTitleLi.on('click', function() {
      var j_this = $(this);
      var index = j_this.index();
      console.log('index = ', index);
      if (j_this.hasClass('active')) return;

      j_this.addClass('active').siblings().removeClass('active');
      console.log(index);
      accordionList.hide().eq(index).show();
      // accordionList.css({position: 'absolute'}).fadeOut().eq(index).css({position: 'relative'}).fadeIn();
    });


    var accordionTitleLi2 = $('.a2 .accordion-title li');
    var accordionList2 = $('.a-box2 > div');

    // accordionTitle click
    accordionTitleLi2.on('click', function() {
      var j_this = $(this);
      var index = j_this.index();
      if (j_this.hasClass('active')) return;

      j_this.addClass('active').siblings().removeClass('active');
      console.log(index);
      accordionList2.hide().eq(index).show();
      // accordionList.css({position: 'absolute'}).fadeOut().eq(index).css({position: 'relative'}).fadeIn();
    });

  });



  function setButton() {
    $('.left-area .info').on('click', function() {
      if (_temp === 'pc') return;
      $(this).addClass('active').siblings().removeClass('active');
    })
  }

  function setEventListener() {
    $(window).resize(setfundInfoOrder).trigger('resize');
  }

  function setfundInfoOrder() {
    var scrollbarWidth = getScrollbarWidth();
    var window_W = $(window).width() + scrollbarWidth;
    if (window_W <= 640) {
      if (_temp === 'm') return;
      $('.right-area').children().hide();
      $('.left-area .pc-right').show();
      _temp = 'm';
    } else {
      if (_temp === 'pc') return;
      var pc_right_ele = $('.left-area .pc-right');
      if (!_init) {
        console.log('aa');
        $('.right-area').append(pc_right_ele.clone());
        _init = true;
      } else {
        $('.right-area').children().show();
      }
      pc_right_ele.hide();
      _temp = 'pc';
    }
  }
  //---取得scrollbar寬度---
  function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }
})(jQuery);
