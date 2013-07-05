function ClockModel () {
	this.beautifyTime = function(time) {
		return (time < 10) ? time = "0" + time : time;
	};

	this.getTime = function() {
		var date = new Date();
		return {
			year: date.getFullYear(),
			month: this.beautifyTime(date.getMonth() + 1),
			date: this.beautifyTime(date.getDate()),
			hour: this.beautifyTime(date.getHours()),
			minute: this.beautifyTime(date.getMinutes()),
			second: this.beautifyTime(date.getSeconds())
		};
	};

	return this;
}

function DragAndDropModel() {
	this.getCoords = function(element) {
		var box = element.getBoundingClientRect();
		return {
			left: box.left,
			top: box.top
		};
	};

	return this;
}





function ClockController() {
	var 	clock_model = new ClockModel(),
		dragNdrop_model = new DragAndDropModel(),
		shift = {},
		date_obj = {},
		elements = {},
		flag = true,
		interval_id;
	// timer
	function refreshDate() {
		interval_id = setInterval(function() {
			date_obj = clock_model.getTime();
			insertTime(flag);
		}, 1000);
	}

	function insertTime(state) {
		elements.clock_node.innerHTML = (state) ? (date_obj.hour + ":" + date_obj.minute + ":" + date_obj.second) : (date_obj.hour + " : " + date_obj.minute);
	}

	function insertDate() {
		elements.clock_node.innerHTML = date_obj.date + "." + date_obj.month + "." + date_obj.year;
	}

	function toggle() {
		flag = (flag) ? false : true;
	}

	function showDate(e) {
		e.preventDefault();
		clearInterval(interval_id);
		insertDate();
		flag = false;
	}

	function showTime() {
		clearInterval(interval_id);
		toggle();
		insertTime(flag);
		refreshDate();

	}
	// dragNdrop
	function getShift(e, element) {
		var coors = dragNdrop_model.getCoords(element);
		return {
			X: e.pageX - coors.left,
			Y: e.pageY - coors.top
		};
	}

	function moveAt(e, element) {
		element.style.left = e.pageX - shift.X - 10 + "px";
		element.style.top = e.pageY - shift.Y - 10 + "px";
	}

	function move(e, element) {
		element.style.position = 'absolute';
		shift = getShift(e, element);

		document.onmousemove = function(e) {
			moveAt(e, element);
		};
		element.onmouseup = function() {
			document.onmousemove = null;
		};
	}



	this.init = function() {
		elements = {
			clock_node: document.querySelector('.clock-block'),
			wrapper: document.querySelector('.wrapper')
		};

		date_obj = clock_model.getTime();
		insertTime(flag);
		refreshDate();

		elements.clock_node.onclick = function() {
			showTime();
		};
		elements.clock_node.oncontextmenu = function(e) {
			showDate(e);
		};
		elements.wrapper.onmousedown = function(e) {
			move(e, elements.wrapper);
		};
	};

	return this;
}

var controller = new ClockController();

window.onload = function() {
	controller.init();
};