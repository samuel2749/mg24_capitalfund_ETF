$(function() {
  var j_typeBtn = $('.select-table-type, .select-chart-type');

  // 切換『看表格』或『看走勢圖』
  j_typeBtn.on('click', function() {
    var j_this = $(this);
    var index = j_this.index();
    if (j_this.hasClass('active')) return;

    j_this.addClass('active').siblings().removeClass('active');

    if ( $(this).hasClass('select-table-type') ) {
      console.log('table')
      $('.table-box').show();
      $('.list-box').hide();
    } else if ( $(this).hasClass('select-chart-type') ) {
      console.log('chart')
      $('.table-box').hide();
      $('.list-box').show();
    }
  });


  $('.ETF-type select').on('change', function() {
    console.log( $(this).val() );
    var val = $(this).val();
    if ( val === "請選擇其他ETF類別") {
      $('.section-box').hide();
      $('.section-box.ETFs-all').show();
    } else if ( val === "股票ETFs") {
      $('.section-box').hide();
      $('.section-box.ETFs-stock').show();
    } else if ( val === "基金ETFs") {
      $('.section-box').hide();
      $('.section-box.ETFs-fund').show();
    } else if ( val === "債券ETFs") {
      $('.section-box').hide();
      $('.section-box.ETFs-bond').show();
    }
  })



  // renderList();

  function renderList() {
    /*stock*/
  	$.ajax({
  		url: './js/data/NAV.json',
  		dataType: 'json'
  	})
  	.then(function(data) {
  		// renderNAVList(res);
  		var template = new Template($('.stock-list-box'), 'NAV', data.data);
  		// console.log('template = ', template);
  	}, function(err) {
  		console.log('err = ', err);
  	});

    console.log('renderList');

    setTimeout(function() {
      // renderList();
    }, 3000);
  }

});
