
	function fixEvent(e) {
		// получить объект событие для IE
		e = e || window.event;

		// добавить pageX/pageY для IE
		if (e.pageX == null && e.clientX != null) {
			var html = document.documentElement;
			var body = document.body;
			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
			e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
		}

		// добавить which для IE
		if (!e.which && e.button) {
			e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
		}

		return e;
	}

	function getCoords(elem) {
		// (1)
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		// (2)
		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		// (3)
		var clientTop = docEl.clientTop || body.clientTop || 0;
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;


		// (4)
		var top = box.top + scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;
		// (5)
		return {
			top: Math.round(box.top),
			left: Math.round(box.left)
		};
	}

	function dragNdrop(e) {
		var 	self,
			coords,
			shiftX,
			shiftY,
			box_body,
			box_element,
			left,top,
			right,
			shift_right,
			element_right_side;

		self = this;
		box_element = this.getBoundingClientRect();
		box_body = document.body.getBoundingClientRect();
		box_element.right = 0;

		right = box_element.right;
		coords = getCoords(this);
		shiftX = e.pageX - coords.left;
		shiftY = e.pageY - coords.top;
		shift_right = box_element.right - e.pageX;

		this.style.position = 'absolute';

		console.log(e.pageX+shift_right,  box_body.right);
		function moveAt(e) {
			element_right_side = e.pageX+ shift_right;
			//console.log(element_right_side)
			while(element_right_side <= box_body.right ){
				self.style.left = e.pageX - shiftX + 'px';
				self.style.top = e.pageY - shiftY + 'px';

			}

			/*self.style.left = e.pageX - shiftX + 'px';
			self.style.top = e.pageY - shiftY + 'px';
			element_right_side = e.pageX+ shift_right;
*/

		}

		document.onmousemove = function(e) {
			e = fixEvent(e);

			//console.log(box_body.right -  shiftX)


		/*	if( element_right_side >= box_body.right ){
			//console.log(element_right_side)

			self.style.left = 790+ 'px';
			}*/

			moveAt(e);

		};
		this.onmouseup = function() {
			document.onmousemove = self.onmouseup = null;
		};
	}

	function Clock() {
		var 	wrapper,
			clock_block,
			date, now,
			timer_id,
			flag;

		clock_block = document.querySelector('.clock-block');
		wrapper = document.querySelector('.wrapper');
		flag = true;

		function beautifyTime(time) {
			return (time < 10) ? time = "0" + time : time;
		}

		function getTime() {
			date = new Date();
			return {
				year: date.getFullYear(),
				month: beautifyTime(date.getMonth() + 1),
				date: beautifyTime(date.getDate()),
				day: date.getDay(),
				hour: beautifyTime(date.getHours()),
				minute: beautifyTime(date.getMinutes()),
				second: beautifyTime(date.getSeconds())
			};
		}

		now = getTime();

		function insertFullTime(state) {
			clock_block.innerHTML = (state) ? now.hour + ":" + now.minute + ":" + now.second : now.hour + " : " + now.minute;
		}

		function insertDate() {
			clock_block.innerHTML = now.date + "." + now.month + "." + now.year;
		}

		function refreshTime(state) {
			timer_id = setInterval(function() {
				now = getTime();
				insertFullTime(state);
			}, 1000);
		}

		function changeDisplay(state) {
			clearInterval(timer_id);
			insertFullTime(state);
			document.querySelector('.wrapper h2').innerHTML = "Time now:"
			refreshTime(state);
			flag = state;
		}

		function showTime () {
			flag ? changeDisplay(false) : changeDisplay(true);
		}

		function showDate (e) {
			e.preventDefault();
			clearInterval(timer_id);
			document.querySelector('.wrapper h2').innerHTML = "Date now:";
			insertDate();
			flag = false;
		}

		function init() {
			clock_block.onclick = showTime;
			clock_block.oncontextmenu = showDate;
		}

		// wrapper.onmousedown = aaa;

		refreshTime(true);

		insertFullTime(true)
		return init();

	}

	window.onload = function() {
		Clock();
	};
