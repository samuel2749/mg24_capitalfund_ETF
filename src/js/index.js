$(function() {
	var slider = new Slider({
		name: '.slider',
		random: false,
		dotNav: true,
		arrowBtn: false,
		autoPlay: false,
		list: false,
		duration: 3000
	});

	/*NAV*/
	$.ajax({
		url: 'http://localhost:3000/js/data/NAV.json',
		dataType: 'json'
	})
	.then(function(data) {
		// renderNAVList(res);
		var template = new Template($('.NAV-list-box'), 'NAV', data.data);
		// console.log('template = ', template);
	}, function(err) {
		console.log('err = ', err);
	});

	/*index*/
	$.ajax({
		url: 'http://localhost:3000/js/data/index.json',
		dataType: 'json'
	})
	.then(function(data) {
		var template = new Template($('.Index-list-box'), 'Index', data.data);

		// 偶數的list加上.even
		var item = $('.Index-list-box').find('li').filter(function(index, list) {
			if (index % 2 === 1) {
				$(list).addClass('even');
				return true
			}
		});
	}, function(err) {
		console.log('err = ', err);
	});

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
