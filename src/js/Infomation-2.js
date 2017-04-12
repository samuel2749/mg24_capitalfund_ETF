(function ($) {
  var _temp = '',
    _init,
    _chartObj = {
      type: "all",
      ChartBoxes: []
    };
  $(function () {
    setButton();
    accordion();
    setEventListener();
    setNav();
    getETF();
    /*$('.list-chart').each(function() {
      var id = $(this).attr('id');
      new Chart(id);
    });*/

  });

  function setNav() {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView: 2,
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 30,
    });
  }


  function setButton() {
    var j_typeBtn = $('.select-table-type, .select-chart-type');

    // 切換『看表格』或『看走勢圖』
    j_typeBtn.on('click', function () {
      var j_this = $(this);
      var index = j_this.index();
      if (j_this.hasClass('active')) return;

      j_this.addClass('active').siblings().removeClass('active');

      if ($(this).hasClass('select-table-type')) {
        $('.list-box').hide();
        if (Fun.detectmobile.isMobile || ($(window).width() <= 640)) {
          $('.table-box.m-table').show();
        } else {
          $('.table-box.pc-table').show();
        }
      } else if ($(this).hasClass('select-chart-type')) {
        $('.table-box').hide();
        $('.list-box').show();
      }
      resizeChart();
    });


    $('.ETF-type select').on('change', function () {
      console.log($(this).val());
      _chartObj.type = $(this).val();
      /*$('.section-box').hide();
      if (val === "all") {
        $('.section-box.ETFs-all').show();
      } else if (val === "stock") {
        $('.section-box.ETFs-stock').show();
      } else if (val === "fund") {
        $('.section-box.ETFs-fund').show();
      } else if (val === "bond") {
        $('.section-box.ETFs-bond').show();
      }*/
      getETF();
    })

    // 手機版預設開啟圖表
    if (Fun.detectmobile.isMobile || ($(window).width() <= 640)) {
      // $('.select-chart-type').click();
    }

    // $('.select-table-type').on('click', function() {
    //   $('.accordion').show();
    // });
    // $('.select-chart-type').on('click', function() {
    //   $('.accordion').hide();
    // });

    $('.section.stock .more-btn').on('click', function () {
      $(".ETF-type select").val("stock").change();
    });
    $('.section.fund .more-btn').on('click', function () {
      $(".ETF-type select").val("fund").change();
    });
    $('.section.bond .more-btn').on('click', function () {
      $(".ETF-type select").val("bond").change();
    });

  }



  function renderList() {
    /*stock*/
    $.ajax({
      url: './js/data/NAV.json',
      dataType: 'json'
    })
      .then(function (data) {
        // renderNAVList(res);
        console.log('data = ', data);
        var template = new Template($('.ETFs-all .stock .list-box'), 'NAV', data.data);
      }, function (err) {
        console.log('err = ', err);
      });

    console.log('renderList');

    setTimeout(function () {
      // renderList();
    }, 3000);
  }

  // 點『看更多』按鈕，抓取資料及顯示loading.gif過場
  function moreBtn() {
    $('.section.stock .load-more-btn').on('click', function () {
      // $('.section.stock .table-box tr').slice(2, 10).clone().appendTo($('.section.stock tbody'));
      // $('.section.stock .list-box li').slice(0, 8).clone().appendTo($('.section.stock .list-box'));
    });
  }

  function setEventListener() {
    $(window).resize(function(){
      setTableSwitch();
      resizeChart();
    }).trigger('resize');
  }

  function setTableSwitch() {
    var scrollbarWidth = getScrollbarWidth();
    var window_W = $(window).width() + scrollbarWidth;
    if (window_W <= 640) {
      if (_temp === 'm') return;
      console.log('m');
      _temp = 'm';
    } else {
      if (_temp === 'pc') return;
      var pc_right_ele = $('.left-area .pc-right');

      if (!_init) {
        // $('.list-chart').each(function() {
        //   // temp += 1;
        //   var id = $(this).attr('id');
        //   new Chart(id);
        // });
        _init = true;

      } else {

      }
      console.log('pc');
      _temp = 'pc';
    }

  }

  function resizeChart(){
    $.each(_chartObj.ChartBoxes, function(i, obj){
      obj.resize();
    })
  }

  // 點選淨值, 市價, 折溢價的 tag
  function accordion() {
    var accordionTitleLi = $('.accordion-title li');
    var accordionList = $('.m-table .table');

    // accordionTitle click
    accordionTitleLi.on('click', function () {
      var j_this = $(this);
      var index = j_this.index();
      if (j_this.hasClass('active')) return;

      j_this.addClass('active').siblings().removeClass('active');

      j_this.parents('.section').find('.m-table .table').hide();
      j_this.parents('.section').find('.m-table .table').eq(index).show();

    });
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

  function setData(pData) {
    removeAllData();
    if (_chartObj.type == 'all') $('.section-box .more-btn').show();
    $.each(pData, function (i, data) {
      var ele;
      switch (data.id) {
        case "stock":
          ele = $('.section-box.ETFs-stock');
          break;
        case "fund":
          ele = $('.section-box.ETFs-fund');
          break;
        case "bond":
          ele = $('.section-box.ETFs-bond');
          break;
      }
      ele.show();
      if (_chartObj.type != 'all') ele.find('.load-more-btn').show();
      setChartBox(ele.find('.list-box'), data);
    });
    resizeChart();
  }

  function removeAllData() {
    $('.section-box').hide().find('.list-box').html('')
      .end().find('.more-btn, .load-more-btn').hide();
    while (_chartObj.ChartBoxes.length > 0) {
      var chartObj = _chartObj.ChartBoxes.pop();
    }
  }

  function setChartBox(pEle, pData) {
    $.each(pData.data, function(i, data){
      var chartID = pData.id + i;
      pEle.append(renderChartBox(chartID, data));
      _chartObj.ChartBoxes.push(new Chart(chartID, reSetChartData(data.msgArray)));
    });
  }

  function renderChartBox(pChartID, pData) {
    var ele = ''
      + '<li class="list up">'
      + '	<div id="_chart_id_" class="list-chart"></div>'
      + '	<div class="list-info">'
      + '		<a href="javascript:;">'
      + '			<div class="list-date">_date_</div>'
      + '			<div class="list-title">'
      + '				<span class="list-title-num">_etfcode_</span>'
      + '				<span class="list-title-name">_name_</span>'
      + '			</div>'
      + '			<div class="line"></div>'
      + '			<div class="NAV-val">'
      + '				<span class="list-name">預估淨值</span>'
      + '				<span class="list-val">_nav_now_</span>'
      + '			</div>'
      + '			<div class="NAV-price">'
      + '				<span class="list-name">最新市價</span>'
      + '				<span class="list-val">_price_now_</span>'
      + '			</div>'
      + '			<div class="NAV-amplitude amplitude">'
      + '				<span class="list-name">折溢價幅度</span>'
      + '				<span class="list-val">_diff_ratio_</span>'
      + '			</div>'
      + '		</a>'
      + '	</div>'
      + '</li>';
      ele = ele.replace('_chart_id_', pChartID);
      ele = ele.replace('_date_', pData.date);
      ele = ele.replace('_etfcode_', pData.etfcode);
      ele = ele.replace('_nav_now_', pData.name);
      ele = ele.replace('_price_now_', pData.price_now);
      ele = ele.replace('_diff_ratio_', pData.diff_ratio);
      if(pData.diff_ratio.substring(0, 1) == '-') ele = ele.replace('up', 'down');
      //_chartObj.ChartBoxes.push(new Chart(pChartID, reSetChartData(pData.msgArray)));
      return ele;
  }

  function reSetChartData(pData) {
    var arr = [];
    $.each(pData, function (i, data) {
      arr.push([new Date(data.time).getTime(), data.nav]);
    });
    return arr;
  }

  //============ data ==============
  function getETF(pObj) {
    pObj = pObj || {};
    /*$.get("test.aspx", pObj, function (data) {
      
    }, 'json');*/
    getDemoData();
  }

  function getDemoData() {
    var data = [], tempArr = ['stock', 'fund', 'bond'];
    if (_chartObj.type == "all") {
      for (var typeNum = 0; typeNum < 3; typeNum++) {
        var obj = {};
        obj.id = tempArr[typeNum];
        obj.data = getSingleTypeData(4);
        data.push(obj);
      }
    } else {
      data.push({ id: _chartObj.type, data: getSingleTypeData() })
    }
    
    //console.log(data);
    setData(data);
  }

  function getSingleTypeData(pSum) {
    pSum = pSum || 12;
    var data = [];
    for (var num = 0; num < pSum; num++) {
      data.push(demoData());
    }
    return data;
  }

  function demoData() {
    var obj = {
      fundid: "093",
      date: "2017/01/03",
      etfcode: "00643",
      name: "群益深証中小",
      nav_now: "13.97",
      price_now: "13.97",
      diff_ratio: "0.8565%",
      msgArray: [
        {
          time: "2017/01/03 10:45:00",
          nav: "13.96"
        },
        {
          time: "2017/01/03 10:45:15",
          nav: "9.95"
        },
        {
          time: "2017/01/03 10:45:30",
          nav: "13.97"
        },
        {
          time: "2017/01/03 10:45:45",
          nav: "12.96"
        },
        {
          time: "2017/01/03 10:46:00",
          nav: "10.95"
        },
        {
          time: "2017/01/03 10:46:15",
          nav: "12.97"
        },
      ]
    };

    if (Math.random() < 0.5) {
      obj.diff_ratio = '-' + obj.diff_ratio;
    }
    return obj;
  }

})(jQuery)
