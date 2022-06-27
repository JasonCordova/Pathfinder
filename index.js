var viewPort = document.getElementById("viewport");
var settings = document.getElementById("settings");
var draggingSettings = false;
var ignoredClasses = ["value", "input-button"];
var startPos = {x: 0, y: 0};

var openSet = new Array();
var closedSet = new Array();

var gridSize = document.getElementById("grid-size");

function containsClass(classList, ignored){

	for (var i = 0; i < classList.length; i++){

		for (var j = 0; j < ignored.length; j++){

			if (classList[i] == ignored[j]) return true;

		}

	}

	return false;

}

settings.ontouchstart = function(e){

	if (!containsClass(e.target.classList, ignoredClasses)){
		
		e.preventDefault();
		draggingSettings = true;
		startPos.x = e.touches[0].clientX;
		startPos.y = e.touches[0].clientY;

		console.log(startPos);

		document.ontouchend = function(){ draggingSettings = false; };
		document.addEventListener("touchmove", mobileDragElement);

	}

}

settings.onmousedown = function(e){

	if (!containsClass(e.target.classList, ignoredClasses)){

		draggingSettings = true;
		startPos.x = e.clientX;
		startPos.y = e.clientY;

		document.onmouseup = function(){ draggingSettings = false; };
		document.addEventListener("mousemove", dragElement);

	}

}

function mobileDragElement(e){

	if (draggingSettings){

		var difference = {x: startPos.x - e.touches[0].clientX, y: startPos.y - e.touches[0].clientY};
		startPos.x = e.touches[0].clientX;
		startPos.y = e.touches[0].clientY;

		var newTop = settings.offsetTop - difference.y;
		var newLeft = settings.offsetLeft - difference.x;

		if (newTop < 0) newTop = 0;
		if (newTop + settings.offsetHeight > document.documentElement.clientHeight) newTop = document.documentElement.clientHeight - settings.offsetHeight;
		if (newLeft < 0) newLeft = 0;
		if (newLeft + settings.offsetWidth > document.documentElement.clientWidth) newLeft = document.documentElement.clientWidth - settings.offsetWidth;

		settings.style.top = newTop + "px";
		settings.style.left = newLeft + "px";

	}

}

function dragElement(e){

	if (draggingSettings){

		var difference = {x: startPos.x - e.clientX, y: startPos.y - e.clientY};
		startPos.x = e.clientX;
		startPos.y = e.clientY;

		var newTop = settings.offsetTop - difference.y;
		var newLeft = settings.offsetLeft - difference.x;

		if (newTop < 0) newTop = 0;
		if (newTop + settings.offsetHeight > document.documentElement.clientHeight) newTop = document.documentElement.clientHeight - settings.offsetHeight;
		if (newLeft < 0) newLeft = 0;
		if (newLeft + settings.offsetWidth > document.documentElement.clientWidth) newLeft = document.documentElement.clientWidth - settings.offsetWidth;

		settings.style.top = newTop + "px";
		settings.style.left = newLeft + "px";

	}

}

var min = 10;
var max = 50;

var grid = new Grid(min, min);

var rowSlider = new numInput(min, max, "Rows:", gridSize);
var colSlider = new numInput(min, max, "Columns:", gridSize);

rowSlider.slider.addEventListener("onUpdate", function(){

	grid.changeRows(rowSlider.value);

});

colSlider.slider.addEventListener("onUpdate", function(){

	grid.changeCols(colSlider.value);

});