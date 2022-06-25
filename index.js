var viewPort = document.getElementById("viewport");
var settings = document.getElementById("settings");
var min = 5;
var max = 100;

// --------------------------------------------------



// -------------------------------------------------



// ----------------------------------------------------

var grid = new Grid();
// INTIIALIZING EVERYTHING. THIS IS WHERE THE SCRIPT REALLY RUNS.
var rowSlider = new numInput(min, max, "Rows:");
var colSlider = new numInput(min, max, "Columns:");

rowSlider.slider.addEventListener("onUpdate", function(){

	grid.changeRows(rowSlider.value);

});

colSlider.slider.addEventListener("onUpdate", function(){

	grid.changeCols(colSlider.value);

});