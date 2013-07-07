(function() {
        var clock_controller = new ClockController();
        var dnd_controller = new dragNdropController();

        window.onload = function() {
                clock_controller.init();
                dnd_controller.init();
        };
})();