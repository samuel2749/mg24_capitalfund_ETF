var Chart = function(ele, pData) {
  var dom = document.getElementById(ele);
  var myChart = echarts.init(dom);

  var option = {
    tooltip: {
      trigger: 'asix',
      axisPointer: {
        lineStyle: {
          type: 'dashed',
          color: '#ebc7c9'
        }
      },
      backgroundColor: '#db0d1b',
      padding: [1, 5, 0, 5],
      textStyle: {
        color: '#FFF',
        fontSize: 9
      },
      extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
      position: function(params) {
        return [params[0], '100%']
      },
      formatter: '{b0} / {c0}'
    },
    xAxis: {
      type: 'category',
      position: 'top',
      //data: ['0:00','0:15','0:30','0:45','1:00','1:15','1:30','1:45','2:00','2:15','2:30',"3:00"],
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
        margin: 20,
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
      splitLine: {
        lineStyle: {
          color: ['#d5d5d5'],
        }
      },
      axisTick: {
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
      //data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1898', '822'],
      data: pData,
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

  this.resize = function(){
    myChart.resize();
  }
}
