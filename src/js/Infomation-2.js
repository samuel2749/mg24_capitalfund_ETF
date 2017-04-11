(function($) {
  var _temp = '',
      _init;
  $(function() {
    // var myChart;
    setButton();
    accordion();
    setEventListener();

    var temp = 0;
    $('.list-chart').each(function() {
      // temp += 1;
      var id = $(this).attr('id');
      new Chart(id);
    });

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 2,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
    });


    function renderChart(ele) {
     // var dom = $('#list-chart').get[0];
     var dom = document.getElementById(ele);
     var myChart = echarts.init(dom);

     var option = {
       title: {
           // text: '今日&昨日',
           // left: '50%',
           // textAlign: 'center'
       },
       tooltip: {
           trigger: 'asix',
           axisPointer: {
             // type: 'cross',
             lineStyle: {
               type: 'dashed',
               color: '#ebc7c9'
             }
           },
           backgroundColor: 'rgba(255,255,255,1)',
           padding: [5, 10],
           textStyle: {
               color: '#D6000F',
           },
           extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
           position: function(params) {
             // ['50%', '100%']
             // console.log('0: ', params[0]);
             // console.log('1: ', params[1]);
             // return [params[0], '100%']
           },
           // formatter: function(params) {
             // console.dir(params);
             // return params[0].dataIndex + '<br/>'
             //        + params[0].seriesName + ' : ' + params[0].value + ' (m^3/s)<br/>'
             //        + params[1].seriesName + ' : ' + -params[1].value + ' (mm)';
         // },
       },
       legend: {
           // right: 20,
           // orient: 'vertical',
           // data: ['今日','昨日']
       },
       xAxis: {
           type: 'category',
           position: 'top',
           data: ['0:00','0:15','0:30','0:45','1:00','1:15','1:30','1:45','2:00','2:15','2:30',"3:00"],
           boundaryGap: false,
           splitLine: {
               show: false,
               interval: 'auto',
               lineStyle: {
                   color: ['#D4DFF5']
               }
           },
           axisTick: {
               show: false
           },
           axisLine: {
               show: false,
               lineStyle: {
                   color: '#868686'
               }
           },
           axisLabel: {
               // show: false,
               margin: 20,
               // inside: true,
               textStyle: {
                 fontSize: 10,
                 align: 'left'
               }
           }
       },
       yAxis: {
           type: 'value',
           position: 'right',
           interval: 500,
           max: 2000,
           // onZero: false,
           splitLine: {
             // interval: 4,
             lineStyle: {
                 color: ['#d5d5d5'],
                 // type: 'dashed'
             }
           },
           axisTick: {
               // show: false,
               // interval: 4
               lineStyle: {
                 color: '#d5d5d5'
               }
           },
           axisLine: {
               show: false,
               onZero: false,
               lineStyle: {
                   color: '#868686'
               }
           },
           axisLabel: {
               // show: false,
               margin: 10,
               textStyle: {
                   fontSize: 10,
                   baseline: 'bottom'
               }
           }
       },
       grid: {
         left: 0,
         right: 45,
         top: 40,
         bottom: 0
       },
       series: [{
           name: '淨值',
           type: 'line',
           smooth: true,
           showSymbol: false,
           symbol: 'circle',
           symbolSize: 6,
           data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1898', '822'],
           areaStyle: {
               normal: {
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                       offset: 0,
                       color: '#ebc7c9'
                   }, {
                       offset: 1,
                       color: '#ebc7c9'
                   }], false)
               }
           },
           itemStyle: {
               normal: {
                   color: '#D6000F'
               }
           },
           lineStyle: {
               normal: {
                   width: 2
               }
           }
       }]
     };

     myChart.setOption(option);

     $(window).resize(function() {
       myChart.resize();
     }).resize();

   }


  function setButton() {
    var j_typeBtn = $('.select-table-type, .select-chart-type');

    // 切換『看表格』或『看走勢圖』
    j_typeBtn.on('click', function() {
      var j_this = $(this);
      var index = j_this.index();
      if (j_this.hasClass('active')) return;

      j_this.addClass('active').siblings().removeClass('active');

      if ( $(this).hasClass('select-table-type') ) {
        $('.list-box').hide();
        if ( Fun.detectmobile.isMobile || ( $(window).width() <= 640 ) ) {
          $('.table-box.m-table').show();
        } else {
          $('.table-box.pc-table').show();
        }


      } else if ( $(this).hasClass('select-chart-type') ) {
        $('.table-box').hide();
        $('.list-box').show();
        // $('.section-box .list-chart').resize();
        $('.section-box.ETFs-all .chart-type').css({
          position: 'relative',
          left: 0,
          visibility: 'visible'
        });
        $('.section-box.ETFs-stock .chart-type').css({
          position: 'relative',
          left: 0,
          visibility: 'visible'
        });
        $('.section-box.ETFs-fund .chart-type').css({
          position: 'relative',
          left: 0,
          visibility: 'visible'
        });
        $('.section-box.ETFs-bond .chart-type').css({
          position: 'relative',
          left: 0,
          visibility: 'visible'
        });
      }
    });


    $('.ETF-type select').on('change', function() {
      console.log( $(this).val() );
      var val = $(this).val();
      if ( val === "all") {
        $('.section-box').hide();
        $('.section-box.ETFs-all').show();
        // $('.section-box.ETFs-all .list-chart').resize();
        // $('.section-box.ETFs-all .chart-type').css({
        //   position: 'relative',
        //   left: 0,
        //   visibility: 'visible'
        // });
      } else if ( val === "stock") {
        $('.section-box').hide();
        $('.section-box.ETFs-stock').show();
        $('.section-box.ETFs-stock').css({
          position: 'relative',
          left: 0,
          visibility: 'visible'
        });
        // if ( $('.select-chart-type').hasClass('active') ) {
        //   $('.section-box.ETFs-stock .chart-type').css({
        //     position: 'relative',
        //     left: 0,
        //     visibility: 'visible'
        //   });
        // }
        // $('.section-box.ETFs-stock .list-chart').resize();
      } else if ( val === "fund") {
        $('.section-box').hide();
        $('.section-box.ETFs-fund').show();
        $('.section-box.ETFs-fund').css({
          position: 'relative',
          left: 0,
          visibility: 'visible'
        });
        // if ( $('.select-chart-type').hasClass('active') ) {
        //   $('.section-box.ETFs-fund .chart-type').css({
        //     position: 'relative',
        //     left: 0,
        //     visibility: 'visible'
        //   });
        // }
        // $('.section-box.ETFs-fund .list-chart').resize();
      } else if ( val === "bond") {
        $('.section-box').hide();
        $('.section-box.ETFs-bond').show();
        $('.section-box.ETFs-bond').css({
          position: 'relative',
          left: 0,
          visibility: 'visible'
        });
        // if ( $('.select-chart-type').hasClass('active') ) {
        //   $('.section-box.ETFs-bond .chart-type').css({
        //     position: 'relative',
        //     left: 0,
        //     visibility: 'visible'
        //   });
        // }
        // $('.section-box.ETFs-bond .list-chart').resize();
      }
    })


    if ( Fun.detectmobile.isMobile || ( $(window).width() <= 640 ) ) {
      $('.select-chart-type').click();
    }


    $('.section.stock .more-btn').on('click', function() {
      $(".ETF-type select").val("stock").change();
      // $('.section-box.ETFs-stock .list-chart').resize();
    });
    $('.section.fund .more-btn').on('click', function() {
      $(".ETF-type select").val("fund").change();
      // $('.section-box.ETFs-fund .list-chart').resize();
    });
    $('.section.bond .more-btn').on('click', function() {
      $(".ETF-type select").val("bond").change();
      // $('.section-box.ETFs-bond .list-chart').resize();
    });

    moreBtn();
  }



    // renderList();

    function renderList() {
      /*stock*/
    	$.ajax({
    		url: './js/data/NAV.json',
    		dataType: 'json'
    	})
    	.then(function(data) {
    		// renderNAVList(res);
        console.log('data = ', data);
    		var template = new Template($('.ETFs-all .stock .list-box'), 'NAV', data.data);
    		// console.log('template = ', template);
    	}, function(err) {
    		console.log('err = ', err);
    	});

      console.log('renderList');

      setTimeout(function() {
        // renderList();
      }, 3000);
    }

    function moreBtn() {
      $('.section.stock .load-more-btn').on('click', function() {
        // $('.section.stock .table-box tr').slice(2, 10).clone().appendTo($('.section.stock tbody'));
        // $('.section.stock .list-box li').slice(0, 8).clone().appendTo($('.section.stock .list-box'));
      });
    }

  });

  function setEventListener() {
    $(window).resize(setTableSwitch).trigger('resize');
  }

  function setTableSwitch() {
    var scrollbarWidth = getScrollbarWidth();
    var window_W = $(window).width() + scrollbarWidth;
    if (window_W <= 640) {
      if (_temp === 'm') return;
      // $('.pc-table').hide();
      // $('.m-table').show();
      // $('.right-area').children().hide();
      // $('.left-area .pc-right').show();
      console.log('m');
      _temp = 'm';
    } else {
      if (_temp === 'pc') return;
      var pc_right_ele = $('.left-area .pc-right');
      // $('.pc-table').show();
      // $('.m-table').hide();
      if (!_init) {
        // $('.list-chart').each(function() {
        //   // temp += 1;
        //   var id = $(this).attr('id');
        //   new Chart(id);
        // });
        _init = true;
      //   console.log('aa');
      //   $('.right-area').append(pc_right_ele.clone());

      } else {
      //   $('.right-area').children().show();
      }
      // pc_right_ele.hide();
      console.log('pc');
      _temp = 'pc';
    }
  }

  function accordion() {
    var accordionTitleLi = $('.accordion-title li');
    var accordionList = $('.m-table .table');

    // accordionTitle click
    accordionTitleLi.on('click', function() {
      var j_this = $(this);
      var index = j_this.index();
      console.log('index = ', index);
      if (j_this.hasClass('active')) return;

      j_this.addClass('active').siblings().removeClass('active');
      accordionList.hide().eq(index).show();
      // accordionList.css({position: 'absolute'}).fadeOut().eq(index).css({position: 'relative'}).fadeIn();
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

})(jQuery)
