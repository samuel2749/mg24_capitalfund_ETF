$(function() {
  setButton();

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
