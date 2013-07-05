function ClockModel() {
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