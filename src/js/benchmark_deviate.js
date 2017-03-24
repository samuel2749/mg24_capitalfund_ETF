$(function() {
setButton();

var temp = 0;
 $('.list-chart').each(function() {
   temp += 1;
   renderChart('chart-' + temp);
 })

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
             lineStyle: {
                 color: '#ddd'
             }
         },
         backgroundColor: 'rgba(255,255,255,1)',
         padding: [5, 10],
         textStyle: {
             color: '#D6000F',
         },
         extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
     },
     legend: {
         // right: 20,
         // orient: 'vertical',
         // data: ['今日','昨日']
     },
     xAxis: {
         type: 'category',
         data: ['00:00','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00',"22:00"],
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
                 color: '#609ee9'
             }
         },
         axisLabel: {
             show: false,
             margin: 10,
             textStyle: {
                 fontSize: 14
             }
         },
         position: 'left'
     },
     yAxis: {
         type: 'value',
         splitLine: {
             lineStyle: {
                 color: ['#d5d5d5']
             }
         },
         axisTick: {
             show: false
         },
         axisLine: {
             show: false,
             lineStyle: {
                 color: '#609ee9'
             }
         },
         axisLabel: {
             show: false,
             margin: 10,
             textStyle: {
                 fontSize: 14
             }
         }
     },
     grid: {
       left: 0,
       right: 2,
       top: 0,
       bottom: 0
     },
     series: [{
         name: '淨值',
         type: 'line',
         smooth: true,
         showSymbol: false,
         symbol: 'circle',
         symbolSize: 6,
         data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
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

 }


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
