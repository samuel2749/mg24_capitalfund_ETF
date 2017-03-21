$(function() {
  var j_typeBtn = $('.table-type, .chart-type');

  // 切換『看表格』或『看走勢圖』
  j_typeBtn.on('click', function() {
    var j_this = $(this);
    var index = j_this.index();
    if (j_this.hasClass('active')) return;

    j_this.addClass('active').siblings().removeClass('active');
  });

  renderList();

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
