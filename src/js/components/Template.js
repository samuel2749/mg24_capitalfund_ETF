var Template = function( pEle, pType, pData ) {
  var template = '';
  var type_template_NAV = '';
  var type_template_Index = '';

  pData.map(function(data) {
    template += setTemplate(pType, data);
  });

  pEle.append(template);

  function setTemplate(pType, pData) {
    if (pData.amplitude > 0) {
      var situation = 'up';
    } else if (pData.amplitude < 0) {
      var situation = 'down';
    }

    if (pType === 'NAV') {
      template = `
        <li class="list ${situation}">
          <div class="list-chart"></div>
          <div class="NAV-info list-info">
            <a href="javascript:;">
              <div class="NAV-date list-date">${pData.date}</div>
              <div class="NAV-name list-title">
                <span class="list-title-num">${pData.number}</span>
                <span class="list-title-name">${pData.name}</span>
              </div>
              <div class="line"></div>
              <div class="NAV-val">
                <span class="list-name">預估淨值</span>
                <span class="list-val">${pData.NAV}</span>
              </div>
              <div class="NAV-price">
                <span class="list-name">最新市價</span>
                <span class="list-val">${pData.price}</span>
              </div>
              <div class="NAV-amplitude amplitude">
                <span class="list-name">折溢價幅度</span>
                <span class="list-val">${pData.amplitude}%</span>
              </div>
            </a>
          </div>
        </li>`;;
    } else if (pType === 'Index') {
      template = `
				<li class="list ${situation}">
					<div class="Index-info list-info">
						<a href="javascript:;">
							<div class="Index-date list-date">${pData.date}</div>
							<div class="Index-name list-title">
								<span class="list-title-name">${pData.name}</span>
							</div>
							<div class="line"></div>
							<div class="Index-price">
								<span class="list-name">價格</span>
								<span class="list-val">${pData.price}</span>
							</div>
							<div class="Index-amplitude amplitude">
								<span class="list-name">當日漲跌幅</span>
								<span class="list-val">${pData.amplitude}%</span>
							</div>
						</a>
					</div>
				</li>`;
    }
    return template;
  }
}
