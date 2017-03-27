$(function() {

	renderChart('chart-1');
	renderChart('chart-2');
	renderChart('chart-3');
	renderChart('chart-4');

	var slider = new Slider({
		name: '.slider',
		random: false,
		dotNav: true,
		arrowBtn: false,
		autoPlay: false,
		list: false,
		duration: 3000
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
				right: 0,
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

		$(window).resize(function() {
			myChart.resize();
		})

	}

	/*NAV*/
	// $.ajax({
	// 	url: './js/data/NAV.json',
	// 	dataType: 'json'
	// })
	// .then(function(data) {
	// 	// renderNAVList(res);
	// 	var template = new Template($('.NAV-list-box'), 'NAV', data.data);
	// }, function(err) {
	// 	console.log('err = ', err);
	// });

	/*index*/
	// $.ajax({
	// 	url: './js/data/index.json',
	// 	dataType: 'json'
	// })
	// .then(function(data) {
	// 	var template = new Template($('.Index-list-box'), 'Index', data.data);
	//
	// 	// 偶數的list加上.even
	// 	var item = $('.Index-list-box').find('li').filter(function(index, list) {
	// 		if (index % 2 === 1) {
	// 			$(list).addClass('even');
	// 			return true
	// 		}
	// 	});
	// }, function(err) {
	// 	console.log('err = ', err);
	// });

	function renderNAVList(data) {
		var data = data.data;
		console.log('data = ', data);
		data.map(function(data) {
			console.log(data);
			// var template = new Test($('.NAV-list-box'), data);
			// var template = `
			// 	<li class="list up">
			// 		<div class="line-chart"></div>
			// 		<div class="NAV-info list-info">
			// 			<a href="javascript:;">
			// 				<div class="NAV-date list-date">${data.date}</div>
			// 				<div class="NAV-name list-title">
			// 					<span class="list-title-num">${data.number}</span>
			// 					<span class="list-title-name">${data.name}</span>
			// 				</div>
			// 				<div class="line"></div>
			// 				<div class="NAV-val">
			// 					<span class="list-name">預估淨值</span>
			// 					<span class="list-val">${data.NAV}</span>
			// 				</div>
			// 				<div class="NAV-price">
			// 					<span class="list-name">最新市價</span>
			// 					<span class="list-val">${data.price}</span>
			// 				</div>
			// 				<div class="NAV-amplitude amplitude">
			// 					<span class="list-name">即時價幅</span>
			// 					<span class="list-val">${data.amplitude}%</span>
			// 				</div>
			// 			</a>
			// 		</div>
			// 	</li>`;
			// $('.NAV-list-box').append(template);
		});
	}

	function renderIndexList(data) {
		var data = data.data;
		console.log('data = ', data);
		data.map(function(data) {
			console.log(data);
			var template = `
				<li class="list up">
					<div class="Index-info list-info">
						<a href="javascript:;">
							<div class="Index-date list-date">${data.date}</div>
							<div class="Index-name list-title">
								<span class="list-title-name">${data.name}</span>
							</div>
							<div class="line"></div>
							<div class="Index-price">
								<span class="list-name">價格</span>
								<span class="list-val">${data.price}</span>
							</div>
							<div class="Index-amplitude amplitude">
								<span class="list-name">當日漲跌幅</span>
								<span class="list-val">${data.amplitude}%</span>
							</div>
						</a>
					</div>
				</li>`;
			$('.Index-list-box').append(template);
		});

	}




});
