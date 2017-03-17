$(function() {
	var j_attention = $('.attention-box');
	var j_attentionTitleLi = $('.attention-title li');
	var attentionTitleHeight = 80;
	var j_attentionContLi = $('.attention-cont .cont');
	var j_attentionArrow = $('.attention-arrow');
	var attentionArrowHeight = 13;
	var attentionCenterPosition = Math.round((attentionTitleHeight - attentionArrowHeight) / 2);
	var openRight = 0;
	var closeRight = -232;
	var initRight = -312;

	setAttentionBtn();

	function setAttentionBtn() {
		titleClick();
		scrollAnimate(220);
		$(window).on('click', function(e) {
			var j_target = $(e.target);
			if ($('.attention-box').find(j_target).length) {
				TweenMax.to(j_attention, .5, {
					right: openRight
				});
			} else {
				j_attentionTitleLi.removeClass('active');
				TweenMax.to(j_attention, .5, {
					right: closeRight
				});
			}
		})

		function titleClick() {
			j_attentionTitleLi.on('click', function() {
				var j_this = $(this);
				var index = j_this.index();

				// if (j_this.hasClass('active')) return;
				j_attentionTitleLi.removeClass('active').eq(index).addClass('active');
				j_attentionContLi.removeClass('active').eq(index).addClass('active');

				var  position = attentionCenterPosition + index * attentionTitleHeight;

				TweenMax.to(j_attentionArrow, .3, {
					top: position,
					ease: Back.easeOut.config(1.7)
				})
			});
		}

		function scrollAnimate(initTop) {
			var windowHeight = $(window).height();
			var scrollTop = $(window).scrollTop();
			var attentionPosition = initTop;

			init();

			// $(window).scroll(function() {
			// 	scrollTop = $(window).scrollTop();
			// 	attentionPosition = initTop + scrollTop;
			//
			// 	TweenMax.to(j_attention, .5, {
			// 		top: attentionPosition
			// 	})
			// });

			function init() {
				j_attention.css({
					right: initRight,
					top: initTop
				});
				TweenMax.to(j_attention, .5, {
					css: {
						right: closeRight
					},
					delay: .5
				})
			}
		}
	}
})
