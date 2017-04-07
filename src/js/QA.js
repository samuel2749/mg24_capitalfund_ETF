$(function() {
  var accordionTitleLi = $('.accordion-title li');
  var accordionList = $('.accordion-list');

  // accordionTitle click
  accordionTitleLi.on('click', function() {
    var j_this = $(this);
    var index = j_this.index();
    if (j_this.hasClass('active')) return;

    j_this.addClass('active').siblings().removeClass('active');
    accordionList.hide().eq(index).show();
    // accordionList.css({position: 'absolute'}).fadeOut().eq(index).css({position: 'relative'}).fadeIn();
  });

  // accordionList click
  $('.list-title').click(function() {
    console.log($(this).parents('.accordion-list').find('.list-sub'));
    $(this).parents('.accordion-list').find('.list-sub').slideUp();
    // $('.list-sub').slideUp();
		$('.switch-icon').css('backgroundPositionY', 0);
		if ( $(this).next().css('display') == 'none' ) {
			$(this).next().slideDown();
			$(this).find('.switch-icon').css('backgroundPositionY', -15);
		}

		// $('.list-sub').slideUp();
		// $('.switch-icon').css('backgroundPositionY', 0);
		// if ( $(this).next().css('display') == 'none' ) {
		// 	$(this).next().slideDown();
		// 	$(this).find('.switch-icon').css('backgroundPositionY', -15);
		// }
	});

  // 預設第一個開啟
  if ( $('.accordion .product li').eq(0).find('.list-title').next().css('display') == 'none' ) {
    $('.accordion .product li').eq(0).find('.list-title').next().show();
    $('.accordion .product li').eq(0).find('.list-title').find('.switch-icon').css('backgroundPositionY', -15);

    $('.accordion .transaction li').eq(0).find('.list-title').next().show();
    $('.accordion .transaction li').eq(0).find('.list-title').find('.switch-icon').css('backgroundPositionY', -15);

    $('.accordion .market li').eq(0).find('.list-title').next().show();
    $('.accordion .market li').eq(0).find('.list-title').find('.switch-icon').css('backgroundPositionY', -15);
  }

});
