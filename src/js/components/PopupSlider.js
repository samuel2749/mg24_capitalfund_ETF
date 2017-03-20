var PopupSlider = function( cfg ) {
  var _introduceBol,
      _sliderObj = {};
  $(function(){
      _sliderObj = {};
      _sliderObj.item = cfg.item;
      _sliderObj.imgLength = cfg.imgLength;
      _sliderObj.imgStartNum = cfg.imgStartNum;
      _sliderObj.adImgLength = cfg.adImgLength;
      _sliderObj.adImgStartNum = cfg.adImgStartNum;
      _sliderObj.imgUrl = cfg.imgUrl;

      _sliderObj.nowProductNum = 0;
      _sliderObj.nowClickNum = 0;
      _sliderObj.nowImageNum = 0;

      _sliderObj.imgArr = [];
      _sliderObj.imgLoadArr = [];

      _sliderObj.adImgArr = [];
      _sliderObj.adImgLoadArr = [];

      _sliderObj.imageRandom = 2 + Math.floor( Math.random() * 3 );

      if (Fun.detectmobile.isMobile) {
          $('body').addClass('mobile');
          orientation();
      }

      setButton();
      setEventListener();

      $(window).on('orientationchange resize', orientation);

      function orientation() {
          if(window.innerWidth > window.innerHeight){
          $('.product_view').addClass('horizontal');
          } else {
              $('.product_view').removeClass('horizontal');
          }
      }

      var j_product_view = $('.product_view .product_bigImg'),
          startX,
          endX;

      j_product_view.on("touchstart", touchStart);
      j_product_view.on("touchend", touchEnd);

      function touchStart() {
          // event.preventDefault();
          startX = event.targetTouches[0].pageX;
      }

      function touchEnd() {
          // event.preventDefault();
          endX = event.changedTouches[0].pageX;
          moveX = endX - startX;

          if( moveX > 50 ){
              $('.leftBtn').click();
          }

          if( moveX < -50 ){
              $('.rightBtn').click();
          }
      }

  });

  function setButton(){
      $(_sliderObj.item).on('click', function(e) {
          e.preventDefault();
          $('.product_view .popup-content a.closebtn').attr('style', '');
          $('.mobile .product_view .popup-content').attr('width', '');
          $('.mobile .product_view .popup-content').attr('height', '');
          _sliderObj.nowClickNum = 0;
      });

      $(_sliderObj.item).each(function(i) {
          var clickFunStr = 'productClick("_id_")';
          clickFunStr = clickFunStr.replace("_id_", 1);
          $(this).attr('onclick', clickFunStr);
      });

      // imgLength
      var imgUrl, adImgUrl;
      var imgUrlArr = _sliderObj.imgUrl.split('-');
      var imgUrlPath = imgUrlArr[0];
      var imgUrlfile = imgUrlArr[1].split('.')[1];
      for (var i = _sliderObj.imgStartNum; i <= _sliderObj.imgLength + _sliderObj.imgStartNum - 1; i++) {
          imgUrl = imgUrlPath + '-' + Fun.str_pad(i, 2, "0") + "." + imgUrlfile;
          _sliderObj.imgArr.push(imgUrl);
          _sliderObj.imgLoadArr.push(false);
      }
      for (var i = _sliderObj.adImgStartNum; i <= _sliderObj.adImgLength + _sliderObj.adImgStartNum + 1; i++) {
          adImgUrl = imgUrlPath + '-' + Fun.str_pad(i, 2, "0") + "." + imgUrlfile;
          _sliderObj.adImgArr.push(adImgUrl);
          _sliderObj.adImgLoadArr.push(false);
      }

      function getRandomArr(pArr) {
          var random, spliceItem, newArr = [];
          for(var i = pArr.length; i > 0; i--) {
              random = Math.floor( Math.random() * i );
              spliceItem = pArr.splice(random, 1).toString();
              newArr.push(spliceItem);
          }
          return newArr;
      }

      _sliderObj.imgArr = getRandomArr(_sliderObj.imgArr);
      _sliderObj.adImgArr = getRandomArr(_sliderObj.adImgArr);

      //product_view
      $('.product_view .leftBtn').on('click', function(e){
          e.preventDefault();
          _sliderObj.productChangeType = "prev";
          _sliderObj.nowProductNum--;
          _sliderObj.nowClickNum++;
          changeProductPhoto();
          return false;
      });

      $('.product_view .rightBtn').on('click', function(e){
          e.preventDefault();
          _sliderObj.productChangeType = "next";
          _sliderObj.nowProductNum++;
          _sliderObj.nowClickNum++;
          changeProductPhoto();
          return false;
      });

      $('.product_view .closebtn, .popup-bg').on('click', function(e){
          e.preventDefault();
          $('.product_view').fadeOut(500, function() {
              $('.product_view .product_bigImg img').attr('src', '');
          });
          $('body').css({
              'overflow': 'auto'
          });
      });

      clickCheck();
  }

  function setEventListener(){
      $(window).scroll(scrollChange).trigger('scroll');
  }

  function scrollChange(){
      if(_introduceBol) return;
      var dis = $(window).height() + $(document).scrollTop();
      // if(dis > 1000){
      //     $('.introduce-content').automove_play();
      //     _introduceBol = true;
      // }
  }

  function clickCheck(){
      var downStr = "mousedown",
          upStr = "mouseup",
          moveStr = "mouseup";
      //if ('ontouchstart' in document.documentElement) {
      if(Fun.detectmobile.isMobile){
          downStr = "touchstart",
          upStr = "touchend",
          moveStr = "touchmove";
          FastClick.attach(document.body);
      }
      $(document).on(downStr, function(e) {
          _sliderObj.downBol = true;
          _sliderObj.prevPosition = {};
          _sliderObj.prevPosition.x = e.pageX;
          _sliderObj.prevPosition.y = e.pageY;
          if (_sliderObj.prevPosition.x == undefined) {
              _sliderObj.prevPosition.x = e.originalEvent.changedTouches[0].pageX;
              _sliderObj.prevPosition.y = e.originalEvent.changedTouches[0].pageY;
          }
          setClickTimer();
      })/*.on(upStr, function(e) {
          if (checkClick()) {
              clearClickTimer();
              _settings.onClickCallback(e);
          }
      })*/.on(moveStr, function(e){
          if(_sliderObj.downBol){
              _sliderObj.nowPosition = {};
              _sliderObj.nowPosition.x = e.pageX;
              _sliderObj.nowPosition.y = e.pageY;
              if (_sliderObj.nowPosition.x == undefined) {
                  _sliderObj.nowPosition.x = e.originalEvent.changedTouches[0].pageX;
                  _sliderObj.nowPosition.y = e.originalEvent.changedTouches[0].pageY;
              }
              var disNum = parseInt(Math.sqrt(Math.pow(_sliderObj.prevPosition.x - _sliderObj.nowPosition.x, 2) + Math.pow(_sliderObj.prevPosition.y - _sliderObj.nowPosition.y, 2)));
              if (disNum > 20) {
                  clearClickTimer();
              }
          }
      })

      function setClickTimer() {
          clearClickTimer();
          _sliderObj.downBol = true;
          _sliderObj.clickTimer = window.setTimeout(clearClickTimer, 300);
      }

      function clearClickTimer() {
          if (_sliderObj.clickTimer) {
              window.clearTimeout(_sliderObj.clickTimer);
          }
          delete _sliderObj.downBol;
      }
  }

  var url = "";
  function changeProductPhoto(){
      var changeEle = $('.product_view .product_bigImg img'),
          // url = "images/501/",
          // url = "",
          pageNum = "#slider__num1_ .btnProduct_num2_",
          masterSlider;
      // 避免看ProductPhoto時，後面的頁面滑動
      $('body').css({
          'overflow': 'hidden'
      });

      _sliderObj.nowProductArr = _sliderObj.imgArr;
      _sliderObj.nowLoadProductArr = _sliderObj.imgLoadArr;
      _sliderObj.nowImagePhotoArr = _sliderObj.adImgArr;

      if (_sliderObj.nowProductArr.length == 1) {
          $('.leftBtn, .rightBtn').hide();
      } else {
          $('.leftBtn, .rightBtn').show();
      }

      // 展示形象圖
      if ( _sliderObj.nowClickNum % _sliderObj.imageRandom == 0 && _sliderObj.nowClickNum != 0 && _sliderObj.nowImagePhotoArr != undefined ) {
          if(_sliderObj.nowImageNum > _sliderObj.nowImagePhotoArr.length - 1){
              _sliderObj.nowImageNum = 0;
          }
          url = _sliderObj.nowImagePhotoArr[_sliderObj.nowImageNum];
          _sliderObj.imageRandom = 2 + Math.floor( Math.random() * 3 );
          _sliderObj.nowClickNum = 0;
          _sliderObj.nowImageNum++;
          _sliderObj.nowProductNum--;
      } else {
          if(_sliderObj.nowProductNum < 1){
              _sliderObj.nowProductNum = _sliderObj.nowProductArr.length;
          }

          if(_sliderObj.nowProductNum > _sliderObj.nowProductArr.length){
              _sliderObj.nowProductNum = 1;
          }
          url = _sliderObj.nowProductArr[_sliderObj.nowProductNum - 1];
      }

      if(!_sliderObj.nowLoadProductArr[_sliderObj.nowProductNum -1]){
          // _sliderObj.nowProductArr[_sliderObj.nowProductNum -1] = url;
          Fun.loadingChange(true);
          Fun.loadImg(url, productCallback);
      }else{
          //changeEle.attr('src', url);
          productChangeShow(url);
      }
  }

  function productCallback(pBol){
      pBol = pBol || false;
      Fun.loadingChange(false);
      // console.log("productCallback");
      if(pBol){
          //$('.product_view .product_bigImg img').attr("src", _sliderObj.nowProductArr[_sliderObj.nowProductNum -1]);
          // productChangeShow(_sliderObj.nowProductArr[_sliderObj.nowProductNum -1]);
          productChangeShow(url);

      }else{

      }
  }

  function productChangeShow(pSrc){
      var nowImgEle = $('.product_view .product_bigImg img');
      if(_sliderObj.productChangeType){
          var newEle = '<img src="_src_">';
          newEle = newEle.replace("_src_", pSrc);
          newEle = $(newEle);
          $('.product_view .product_bigImg').append(newEle);
          setProductTMX(nowImgEle, false);
          setProductTMX(newEle, true);
      }else{
          nowImgEle.attr("src", pSrc);
      }
  }

  function setProductTMX(pEle, pBol) {
      pBol = pBol || false;
      var strMove = {},
          endMove = {},
          moveNum = 300;
      if(pBol) {
          if(_sliderObj.productChangeType == "prev"){
              strMove.left = -moveNum
          }else if(_sliderObj.productChangeType == "next"){
              strMove.left = moveNum;
          }
          strMove.alpha = 0;
          endMove.left = 0;
          endMove.alpha = 1;
          endMove.ease = Circ.easeOut;
      } else {
          if(_sliderObj.productChangeType == "prev"){
              endMove.left = moveNum;
          }else if(_sliderObj.productChangeType == "next"){
              endMove.left = -moveNum;
          }
          endMove.alpha = 0;
          endMove.onComplete = setProductComplete;
          endMove.onCompleteParams = [pEle, pBol];
          endMove.ease = Circ.easeOut;
      }
      TweenMax.fromTo(pEle, 1, strMove, endMove);
  }

  function setProductComplete(pEle, pBol) {
      if (pBol) {
          pEle.show();
      } else {
          pEle.hide();
          pEle.remove();
      }
  }

  //window fun
  window.productClick = function(pId){
      delete _sliderObj.productChangeType;
      // console.log(_sliderObj.downBol);
      if(!_sliderObj.downBol) return;
      $('.product_view').fadeIn(500);
      _sliderObj.nowProductNum = parseInt(pId, 10);
      changeProductPhoto();
  }

  //PhotoBanner
  function PhotoBanner(pEle, pW){
      var _moveObj = {};
      _moveObj.nowNum = 0;
      _moveObj.w = pW;
      _moveObj.photos = pEle.children();
      _moveObj.photosLength = _moveObj.photos.length;
      _moveObj.nowEle = _moveObj.photos.eq(_moveObj.nowNum);
      _moveObj.delayTimer = parseInt(Math.random() * 3);
      _moveObj.timerNum = parseInt((3 + Math.random() * 3) * 1000);
      _moveObj.photos.hide().eq(0).show();

      function loop(){
          stopTimer();
          _moveObj.nowNum++;
          if(_moveObj.nowNum >= _moveObj.photos.length) _moveObj.nowNum = 0;
          setTMX(_moveObj.nowEle, false);
          _moveObj.nowEle = _moveObj.photos.eq(_moveObj.nowNum)
          setTMX(_moveObj.nowEle, true);
          _moveObj.delayTimer = 0;
      };

      function startTimer(){
          _moveObj.loopTimer = window.setTimeout(loop, _moveObj.timerNum);
      }

      function stopTimer(){
          if(_moveObj.loopTimer){
              window.clearTimeout(_moveObj.loopTimer);
              delete _moveObj.loopTimer
          }
      }

      function setTMX(pEle, pBol){
          pBol = pBol || false;
          var strMove = {}, endMove = {};
          if(pBol){
              strMove.left = _moveObj.w;
              strMove.onStart = complete;
              strMove.onStartParams = [pEle, pBol];
              endMove.left = 0;
          }else{
              strMove.left = 0;
              endMove.left = -_moveObj.w;
              endMove.onComplete = complete;
              endMove.onCompleteParams = [pEle, pBol];
          }

          TweenMax.fromTo(pEle, 1, strMove, endMove);
      }

      function complete(pEle, pBol){
          if(pBol){
              pEle.show();
          }else{
              pEle.hide();
              startTimer();
          }
      }
      startTimer();
  }
}
