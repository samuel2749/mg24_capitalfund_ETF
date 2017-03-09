var Slider = function( cfg ) {
	var index = 0;
	// var j_sliderBox = $('.s5-slider-box');
	var j_slider = $(cfg.name);
	var j_normalize = j_slider.find('.slider-normalize');
	var j_ul = j_slider.find('.slider-content');
	var j_li = j_ul.find('li');
	var j_li_width = j_li.width();
	var j_li_length = j_li.length;
	var addCloneItem = 1;
	var j_normalize_position = j_li_width * addCloneItem;
	var intervalId, interval;

	if (cfg.random) {
		randomSlide();
	}
	if (cfg.dotNav) {
		j_slider.append('<ul class="dotNav"></ul>');
		var j_dotNav = j_slider.find('.dotNav');
		for (i = 0; i < j_li_length; i++){
				j_dotNav.append('<li></li>');
		}

		var j_dotNav_li = j_dotNav.find('li');
		j_dotNav_li.eq(index).addClass('active');
		j_dotNav_li.click(function(){
			index = $(this).index();
			j_ul.stop().animate({left: -index * j_li_width }, 500, 'easeOutQuart');
			j_dotNav_li.removeClass('active').eq(index).addClass('active');
		});
	}
	if (cfg.list) {
		// $('.s6 .cont').append('<ul class="list"></ul>');
		var j_List = $('.s6 .cont').find('.list');
		for (i = 1; i <= j_li_length; i++){
				j_List.append('<li style="background: url(images/s6/s6-' + Fun.str_pad(i, 2, "0") + '.jpg);background-size: cover;"><a href=\"javascript:;\"><div class=\"mask\"></div></a></li>');
		}

		var j_List_li = j_List.find('li');
		j_List_li.eq(index).addClass('active');
		j_List_li.click(function(){
			index = $(this).index();
			j_ul.stop().animate({left: -index * j_li_width }, 500, 'easeOutQuart');
			j_List_li.removeClass('active').eq(index).addClass('active');
			clearInterval(intervalId);
			intervalId = setInterval(autoPlay, interval);
			if (!Fun.detectmobile.isMobile) {
				var s6_slider_top = $('.slider-content').offset().top;
				TweenLite.to(window, .8, {scrollTo: s6_slider_top});
			}
		});
	}
	if (cfg.arrowBtn) {
		var arrowBtn = "",
				j_nextBtn,
				j_prevBtn;
		arrowBtn += "<div class=\"btn prev-btn\">";
		arrowBtn += "<a href=\"javascript:;\"></a>";
		arrowBtn += "<\/div>";
		arrowBtn += "<div class=\"btn next-btn\">";
		arrowBtn += "<a href=\"javascript:;\"></a>";
		arrowBtn += "</div>";
		j_slider.append(arrowBtn);
		j_nextBtn = j_slider.find('.next-btn');
		j_prevBtn = j_slider.find('.prev-btn');

		j_nextBtn.click(function() {
			changeSlide(1);
		});
		j_prevBtn.click(function() {
			changeSlide(-1);
		});
	}
	if (cfg.thumbnail) {
		var idx = 0;
		var j_thumbnail = j_slider.find('.Thumbnail');
		var j_thumbnail_ul = j_thumbnail.find('ul');
		var j_thumbnail_li = j_thumbnail_ul.find('li');
		var j_thumbnail_li_length = j_thumbnail_li.length;
		var j_thumbnail_width = 123;
		var j_thumbnail_left_btn = j_thumbnail.find('.Thumbnail-left-btn');
		var j_thumbnail_right_btn = j_thumbnail.find('.Thumbnail-right-btn');
		// console.log('j_thumbnail_li = ', j_thumbnail_li);
		j_thumbnail_li.eq(index).addClass('active');
		j_thumbnail_li.click(function(){
			index = $(this).index();
			j_ul.stop().animate({left: -index * j_li_width }, 500, 'easeOutQuart');
			$(this).addClass('active').siblings('li').removeClass('active');
		});
		j_thumbnail_left_btn.click(function() {
			idx--;
			if (idx < 0) {
				idx = 0;
				return
			}
			j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
		});
		j_thumbnail_right_btn.click(function() {
			idx++;
			if (idx > 3) {
				idx = 3;
				return
			}
			j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
		});
	}


	j_ul.width( j_li_width * (j_li_length + (addCloneItem * 2)) );
	for (var i = 0; i < addCloneItem; i++) {
		j_ul.append(j_li.eq(i).clone());
		j_ul.prepend(j_li.eq(j_li_length - i -1).clone());
	}

	j_normalize.css({'left': -j_normalize_position});

	var startX,
      endX;

  j_slider.on("touchstart", touchStart);
  j_slider.on("touchend", touchEnd);

  function touchStart() {
      // event.preventDefault();
      startX = event.targetTouches[0].pageX;
  }

  function touchEnd() {
      event.preventDefault();
      endX = event.changedTouches[0].pageX;
      moveX = endX - startX;

      if( moveX > 50 ){
				j_prevBtn.click();
        // changeSlide(-1);
      }

      if( moveX < -50 ){
				j_nextBtn.click();
        // changeSlide(1);
      }
  }

	function changeSlide(pIndex) {
		index += pIndex;
		if (cfg.thumbnail) {
			// console.log('j_slider = ', j_slider)
			// console.log('j_li_length = ', j_li_length);
			if (j_li_length <= 6) {
				if (index >= j_li_length) {
					index = 0;
					j_ul.css({left: j_normalize_position});
				} else if (index < 0) {
					index = j_li_length - 1;
					j_ul.css({left: -j_li_length * j_li_width });
				}
			} else {
				if (index >= j_li_length) {
					index = 0;
					idx = 0;
					j_ul.css({left: j_normalize_position});
					j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
				} else if (index < 0) {
					index = j_li_length - 1;
					idx = 3;
					j_ul.css({left: -j_li_length * j_li_width });
					j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
				}

				// 等同click切換
				if (pIndex > 0) {
					if (index == 6) {
						idx = 1;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 7) {
						idx = 2;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 8) {
						idx = 3;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					}
				}

				if (pIndex < 0) {
					if (index == 2) {
						idx = 2;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 1) {
						idx = 1;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 0) {
						idx = 0;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					}
				}

				j_nextBtn.click(function() {
					if (index == 6) {
						idx = 1;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 7) {
						idx = 2;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 8) {
						idx = 3;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					}
				});
				j_prevBtn.click(function() {
					if (index == 2) {
						idx = 2;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 1) {
						idx = 1;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					} else if (index == 0) {
						idx = 0;
						j_thumbnail_ul.stop().animate({left: -idx * j_thumbnail_width }, 500, 'easeOutQuart');
					}
				});
			}
			// console.log('idx = ', idx);
		} else {
			if (index >= j_li_length) {
				index = 0;
				j_ul.css({left: j_normalize_position});
			} else if (index < 0) {
				index = j_li_length - 1;
				j_ul.css({left: -j_li_length * j_li_width });
			}
		}
		j_ul.stop().animate({left: -index * j_li_width }, 500, 'easeOutQuart');
		if (cfg.dotNav) {
			j_dotNav_li.removeClass('active').eq(index).addClass('active');
		}
		if (cfg.thumbnail) {
			j_thumbnail_li.removeClass('active').eq(index).addClass('active');
		}
		if (cfg.list) {
			j_List_li.removeClass('active').eq(index).addClass('active');
		}

		// console.log('index = ', index);
	}
	function randomSlide() {
		var allImgArr = [];
		var imgUrl = "";
		for (var i = 0; i < j_li_length; i++) {
        imgUrl = j_li.eq(i).find('img').attr('src');
        allImgArr.push(imgUrl);
    }
    var getRandomArr = function (pArr) {
        var random, spliceItem, newArr = [];
        for(var i = pArr.length; i > 0; i--) {
            random = Math.floor( Math.random() * i );
            spliceItem = pArr.splice(random, 1).toString();
            newArr.push(spliceItem);
        }
        return newArr;
    }
    allImgArr = getRandomArr(allImgArr);
    for (var i = 0; i < j_li_length; i++) {
			j_li.eq(i).find('img').attr('src', allImgArr[i]);
    }
   //  var randomLi = "";
   //  for (var i = 0; i < j_li_length; i++) {
   //  	randomLi += "<li>";
   //  	randomLi += "<a href=\"javascript:;\">";
			// randomLi += "<img src=\"" + allImgArr[i] + "\" />";
			// randomLi += "</a>";
			// randomLi += "</li>";
   //  }
   //  j_ul.append(randomLi);
	}
	if (cfg.autoPlay) {
		var autoPlay = function autoPlayfunc() {
			changeSlide(1);
		}
		// var intervalId, interval;
		interval = cfg.duration || 3000;
		intervalId = setInterval(autoPlay, interval);

		if (cfg.arrowBtn) {
			j_nextBtn.on('click', function() {
				clearInterval(intervalId);
				intervalId = setInterval(autoPlay, interval);
			});
			j_prevBtn.click(function() {
				clearInterval(intervalId);
				intervalId = setInterval(autoPlay, interval);
			});
		}
		if (cfg.thumbnail) {
			j_thumbnail_li.click(function() {
				clearInterval(intervalId);
				intervalId = setInterval(autoPlay, interval);
			});
		}
		if (cfg.dotNav) {
			j_dotNav_li.click(function() {
				clearInterval(intervalId);
				intervalId = setInterval(autoPlay, interval);
			});
		}
	}
}
