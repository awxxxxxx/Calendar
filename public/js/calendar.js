/**
 *	日历组件
 * 
 */

var Calendar = (function() {

	var Calendar = {
		main: null,
		date: null,
		doc: null,
		week: ['日','一', '二','三', '四', '五', '六'],
		isInited: false,
		headContent: null,
		callback:null,

		/**
		 * 添加日历头部
		 */
		addHead: function() {
			var head = this.doc.createElement('div');
			head.id = 'calHead';

			//切换上一个月份的按钮
			var preDiv = this.doc.createElement('div');
			preDiv.id = 'prevMonth';
			preDiv.innerHTML = '<';

			//显示月份和年份 
			var ymDiv = this.doc.createElement('div');
			this.headContent = ymDiv;
			ymDiv.innerHTML = (this.date.getMonth() + 1) + ' 月 ' 
							  + this.date.getFullYear() + ' 年';

			//切换下一个月份的按钮
			var nextDiv = this.doc.createElement('div');
			nextDiv.id = 'nextMonth';
			nextDiv.innerHTML = '>';

			head.appendChild(preDiv);
			head.appendChild(ymDiv);
			head.appendChild(nextDiv);
			this.main.appendChild(head);

		},

		/**
		 * 增加显示星期
		 */
		addWeek: function() {
			var week = this.doc.createElement('div');
			week.className = 'week';
			for(var i = 0; i < 7; i++) {
				var weekDay = this.doc.createElement('div');
				weekDay.innerHTML = this.week[i];
				week.appendChild(weekDay);
			}

			this.main.appendChild(week);

		},

		/**
		 * 展示要显示的天数
		 * @param {Array} dates 存放要展示的日期的二维数组
		 */
		addDay: function(dates) {
			var days = this.doc.createElement('div'),
				len = dates.length,
				month = this.date.getMonth()
				today = new Date();

			for(var i = 0; i < len; i++) {
				var colDay = this.doc.createElement('div');
				colDay.className = 'day';
				for(var j = 0; j < 7; j++) {
					var day = this.doc.createElement('div');
					day.setAttribute('date', dates[i][j]);

					//不是本月份的天数 颜色为浅色
					if((i<1 || i >= 4) && (dates[i][j].getMonth() !== month)) {
						day.className = 'beside';
					}
					
					//若日期为今天则添加 'today' 类，突出显示
					if(dates[i][j].toDateString() === today.toDateString()) {
						day.innerHTML = '<span class="today">' + dates[i][j].getDate() + '</span>';
					}
					else {
						day.innerHTML = '<span>' + dates[i][j].getDate() + '</span>';
					}
					colDay.appendChild(day);
				}

				days.appendChild(colDay);
			}
			days.id = 'calDays';
			this.main.appendChild(days);
			var that = this;

			//对日期添加事件监听，将选中的日期作为参数传入回调函数中
			days.addEventListener('click',function(e){

				if(that.callback instanceof Function && e.target.nodeName === 'SPAN') {

					var day = that.doc.querySelector('.daySelected');
					if(day) {
						// 移除为已经选择过的日期添加的类
						day.className = '';
					}

					//执行用户传入的函数
					if(e.target.nodeName === 'SPAN' && that.callback instanceof Function) {
						that.callback(e.target.parentNode.getAttribute('date'));
						e.target.className = 'daySelected';
					}
				}
				
				
			},false);

		},

		/**
		 * 计算要展示的天数
		 * @return {Array} 存放天数
		 */
		calDays: function() {
			var date = this.date,
				year = date.getFullYear(),
				month = date.getMonth(),
				numDays = date.getDate(),
				week = 0,
				weeks = [[]],
				preNumDays = new Date(year, month, 0).getDate(),
				nowNumDays = new Date(year, month + 1, 0).getDate(),
                firstDay = new Date(year, month, 1),
                preLength = firstDay.getDay() ? firstDay.getDay() : 0;

            //计算前一个月要显示的日期
            for(var i = 0; i < preLength; i++) {
                weeks[0].push(new Date(year, month - 1, preNumDays - preLength + i + 1 ));
            }

            //当前月份显示的日期
            for(var i = 0; i < nowNumDays; i++) {
            	var date = new Date(year, month, i + 1);

            	//如果该天是星期天即 '0' 则换行显示
            	if (!date.getDay() && weeks[0].length) {
                    week++;
                    weeks.push([]);
                }
            	weeks[week].push(date);
            }
            
            //下一月份中要显示的日期
            var len = weeks[week].length;
            for(var i = 0; i < 7 - len; i++) {
            	weeks[week].push(new Date(year, month + 1, i + 1));
            }
           return weeks;

		},

		bindEvent: function() {
			var prev = this.doc.getElementById('prevMonth'),
				next = this.doc.getElementById('nextMonth'),
				that = this;

			//点击切换上一个月
			prev.addEventListener('click',function(e){
				e.preventDefault();
				var year = parseInt(that.date.getFullYear(), 10),
					month = parseInt(that.date.getMonth(),10);

				//如果月份为 0 则为上一年
				if(month === 0) {

					that.date = new Date(year - 1, 11, 1);
				}
				else {
					that.date = new Date(year, month - 1, 1);
				}

				
				that.render();
				return false;

			},false);

			//点击切换下一个月
			next.addEventListener('click', function(e) {
				var year = parseInt(that.date.getFullYear(), 10),
					month = parseInt(that.date.getMonth(),10);
				e.preventDefault();
				//如果月份为 11 则为下一年
				if(month === 11) {

					that.date = new Date(year + 1, 0, 1);
				}
				else {
					that.date = new Date(year, month + 1, 1);
				}
				that.render();
			}, false);

		},

		/**
		 * 渲染日历页面
		 */
		render: function() {
			if(!this.isInited) {
				this.addHead();
				this.addWeek();
				this.addDay(this.calDays());
				this.bindEvent();
				this.isInited = true;
			}
			else {
				var calDays = this.doc.getElementById('calDays');
				this.main.removeChild(calDays);
				this.addDay(this.calDays());
				this.headContent.innerHTML = (this.date.getMonth() + 1) + ' 月 ' 
							  				 + this.date.getFullYear() + ' 年';
			}
		},

		init: function(id, date, callback) {
			this.doc = document;
			this.main = this.doc.getElementById(id);
			this.date = date || new Date();
			this.callback = callback;
			this.render();
		}
	};

	return Calendar;
}());
