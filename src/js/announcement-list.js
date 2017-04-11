(function($) {
  var _temp = '';
  $(function() {
    setButton();
    setEventListener();
    setArticleFontSize();

    function setButton() {

    }

    function setEventListener() {
      $(window).resize(setArticleFontSize).trigger('resize');
    }

    function setArticleFontSize() {
      var scrollbarWidth = getScrollbarWidth();
      var window_W = $(window).width() + scrollbarWidth;
      if (window_W <= 640) {
        if (_temp === 'm') return;

        var fontSize = 18;
        $('.font-add').on('click', function() {
          if (fontSize >= 22) return;

          fontSize += 2;
          $('.list p').css({
            'fontSize': fontSize
          });
        });

        $('.font-less').on('click', function() {
          if (fontSize <= 16) return;

          fontSize -= 2;
          $('.list p').css({
            'fontSize': fontSize
          });
        });

        // $('.pc-table').hide();
        // $('.m-table').show();
        // $('.right-area').children().hide();
        // $('.left-area .pc-right').show();
        console.log('m');
        _temp = 'm';
      } else {
        if (_temp === 'pc') return;
        var pc_right_ele = $('.left-area .pc-right');

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
        // $('.pc-table').show();
        // $('.m-table').hide();
        // if (!_init) {
          // $('.list-chart').each(function() {
          //   // temp += 1;
          //   var id = $(this).attr('id');
          //   new Chart(id);
          // });
          // _init = true;
        //   console.log('aa');
        //   $('.right-area').append(pc_right_ele.clone());

        // } else {
        //   $('.right-area').children().show();
        // }
        // pc_right_ele.hide();
        console.log('pc');
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

  });

})(jQuery)
