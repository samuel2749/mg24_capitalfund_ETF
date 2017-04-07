$(function() {
  setButton();

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
