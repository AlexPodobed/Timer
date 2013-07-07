function ClockController() {
        var   clock_model = new ClockModel(),
                elements = {},
                date_obj = {},
                flag = 1;

        function insertTime() {
                elements.clock_node.innerHTML = clock_model.getTimeFormat(flag, date_obj);
        }

        function refreshTime() {
                setInterval(function() {
                        date_obj = clock_model.getDateObj();
                        insertTime();
                }, 1000);
        }

        function toggleTime() {
                flag = (flag === 1) ? 2 : 1;
        }

        this.init = function() {
                elements = {
                        clock_node: document.querySelector('#clock-block'),
                        head: document.querySelector('#wrapper h2'),
                        wrapper: document.querySelector('#wrapper')
                };

                date_obj = clock_model.getDateObj();
                insertTime();
                refreshTime();


                elements.clock_node.onclick = function() {
                        toggleTime();
                        insertTime();
                };

                elements.clock_node.oncontextmenu = function(e) {
                        flag = 3;
                        insertTime();
                        e.preventDefault();
                };

        };

        return this;
}