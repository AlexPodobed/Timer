function dragNdropController() {

        var   dnd_model = new DragAndDropModel(),
                elements = {},
                shift = {},
                event_coors = {},
                element_coors = {},
                element_position = {};


        function getEventCoors(e) {
                return {
                        pageX: e.pageX,
                        pageY: e.pageY
                };
        }

        function getElementCoors() {
                var box = elements.wrapper.getBoundingClientRect();
                return {
                        left: box.left,
                        top: box.top
                };
        }

        function moveAt() {
                elements.wrapper.style.left = element_position.left;
                elements.wrapper.style.top = element_position.top;
        }

        function onMouseDown(e) {
                event_coors = getEventCoors(e);
                element_coors = getElementCoors();
                shift = dnd_model.getShift(event_coors, element_coors);
        }

        function drugStart(e) {
                event_coors = getEventCoors(e);
                element_position = dnd_model.getElementPosition(event_coors, shift);
                moveAt();
        }

        function dragEnd(e) {
                return ;
        }

        this.init = function() {
                elements = {
                        wrapper: document.querySelector('#wrapper'),
                        body: document.body
                };

                elements.wrapper.style.position = "absolute";

                elements.wrapper.onmousedown = function(e) {
                        onMouseDown(e);
                        elements.body.onmousemove = drugStart;
                };
                elements.wrapper.onmouseup = function() {
                        elements.body.onmousemove = dragEnd;
                };
        };

        return this;
}