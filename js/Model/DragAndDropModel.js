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