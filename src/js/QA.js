$(function() {
  $('.list-title').click(function() {
		$('.list-sub').slideUp();
		$('.list-btn').css('background', 'url(images/award/list-open-btn.jpg)');
		if ( $(this).next().css('display') == 'none' ) {
			$(this).next().slideDown();
			$(this).find('.list-btn').css('background', 'url(images/award/list-close-btn.jpg)');
		}
	});
});
