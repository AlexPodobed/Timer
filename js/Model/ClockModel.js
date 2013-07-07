function ClockModel() {

        this.beautifyTime = function(time) {
                return (time < 10) ? time = "0" + time : time;
        };

        this.getDateObj = function() {
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

        this.getTimeFormat = function(flag, date_obj) {
                var result = "";

                switch (flag) {
                        case 1:
                                result = date_obj.hour + ":" + date_obj.minute + ":" + date_obj.second;
                                break;
                        case 2:
                                result = date_obj.hour + " : " + date_obj.minute;
                                break;
                        case 3:
                                result = date_obj.date + "." + date_obj.month + "." + date_obj.year;
                                break;
                        default:
                                result = "Oops";
                }

                return result;
        };

        return this;
}