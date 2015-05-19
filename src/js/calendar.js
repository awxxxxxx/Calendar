/**
 *	日历组件
 * 
 */

(function() {

	var Calendar = {
		main: null,
		week: ['日','一', '二','三', '四', '五', '六'],
		month: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],

		addHead: function() {
			var head = document.createElement('div');
			head.style.display = 'flex';

			/** 显示月份和年份 */
			var ymDiv = document.createElement('div');
			ymDiv.innerHTML = (this.date.getMonth() + 1) + '月' 
							  + this.date.getFullYear() + '年';

			head.appendChild(ymDiv);


		},

		init: function(id) {
			this.main = document.getElementById(id);
			this.main.style.display = 'flex';
		}
	};

	return Calendar;


}());
