function DragAndDropModel() {

        this.getShift = function(event_coors, element_coors) {
                return {
                        X: event_coors.pageX - element_coors.left,
                        Y: event_coors.pageY - element_coors.top
                };
        };

        this.getElementPosition = function(event_coors, shift) {
                return {
                        left: event_coors.pageX - shift.X - 10 + "px",
                        top: event_coors.pageY - shift.Y - 10 + "px"
                };
        };

        return this;
}