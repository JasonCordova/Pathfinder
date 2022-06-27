var settingStart = false;
var settingEnd = false;
var toggleMode = false;
var drawOrClear = "CLEAR";
var lastTouchedCell = null;

var openSet = new Array();
var closedSet = new Array();
var globalPath = new Array();

document.documentElement.onmouseup = function(){

	settingStart = false;
	settingEnd = false;
	toggleMode = false;

};

class Grid {

	constructor(tempRows = 5, tempCols = 5){

		this.gridElement;
		this.startElement;
		this.endElement;
		this.rowCount = tempRows;
		this.colCount = tempCols;
		
		// Setting up overall gridElement.

		var newGrid = document.createElement("div");
		newGrid.classList.add("grid");
		this.gridElement = newGrid;
		viewPort.appendChild(newGrid);

		// Updates grid to create rows.

		this.reset();
		this.findPath();

	}

	changeSize(x, y){

		this.rowCount = x;
		this.colCount = y;
		this.reset();

	}

	changeRows(temp){

		this.rowCount = temp;
		this.reset();

	}

	changeCols(temp){

		this.colCount = temp;
		this.reset();

	}

	reset(){

		this.gridElement.innerHTML = null;
		lastTouchedCell = null;

		this.cells = new Array(this.rowCount);

		for (var rows = 0; rows < this.rowCount; rows++){

			var rowElement = document.createElement("div");
			rowElement.classList.add("row");

			this.gridElement.appendChild(rowElement);

			this.cells[rows] = new Array(this.colCount);

			for (var cols = 0; cols < this.cells[rows].length; cols++){

				var newCell = new gridCell(rows, cols);
				this.cells[rows][cols] = newCell;
				rowElement.appendChild(newCell.element);

				initialize(this, newCell);

			}

		}

		
		this.setEnd(this.cells[this.rowCount - 1][this.colCount - 1]);
		this.setStart(this.cells[0][0]);

		this.findPath();
		this.calculateDistances();
	}

	calculateDistances(){

		for (var i = 0; i < this.rowCount; i++){

			for (var j = 0; j < this.colCount; j++){

				var currentCell = this.cells[i][j];

				currentCell.distanceToStart = Math.abs(currentCell.x - this.startElement.x) + Math.abs(currentCell.y - this.startElement.y);
				currentCell.distanceToEnd = Math.abs(currentCell.x - this.endElement.x) + Math.abs(currentCell.y - this.endElement.y);

				if (currentCell != this.startElement && currentCell != this.endElement){

					currentCell.element.innerText = "";

				}

			}

		}

	}

	setStart(cell){

		if (this.startElement != undefined){

			// Setting old element to normal.
			this.startElement.element.classList.remove("start-element");

			// Removing old event listener.
			initialize(this, this.startElement);

		}

		// Setting new start.
		this.startElement = cell;
		this.startElement.element.innerText = "A";
		this.startElement.element.classList.add("start-element");

		this.startElement.element.onmousedown = function(){
			settingStart = true;
			settingEnd = false;
		}

	}

	getNeighbors(element, diagonals = false){

		var array = new Array();
		var x = element.x;
		var y = element.y;

		for (var i = x - 1; i <= x + 1; i++){

			for (var j = y - 1; j <= y + 1; j++){

				if (i == x && j == y) continue; // Skips if element if currentCell is element.
				if (!diagonals && ((i == x-1 || i == x+1) && (j == y-1 || j == y+1))) continue; // Skips if diagonal param is false & is one of the grid corners.

				if (this.cells[i] == undefined || this.cells[i][j] == undefined) continue; // Checks if actually exists in grid or not.
				if (this.cells[i][j].isWall) continue; // skip if wall.

				array.push(this.cells[i][j]);

			}

		}

		return array;

	}

	resetAllCost(){

		for (var i = 0; i < this.rowCount; i++){

			for (var j = 0; j < this.colCount; j++){

				var cell = this.cells[i][j];
				cell.g = 0;
				cell.f = 0;
				cell.h = 0;
				cell.prev = null;

			}

		}

		for (var i = 0; i < globalPath.length; i++){

			globalPath[i].element.classList.remove("path");

		}

	}

	setEnd(cell){

		if (this.endElement != undefined){

			// Setting old element to normal.
			this.endElement.element.classList.remove("end-element");

			// Removing old event listener.
			initialize(this, this.endElement);

		}

		// Setting new end.
		this.endElement = cell;
		this.endElement.element.innerText = "B";
		this.endElement.element.classList.add("end-element");
		this.endElement.element.onmousedown = function(){
			settingStart = false;
			settingEnd = true;
		}

	}

	clearWalls(){

		for (var i = 0; i < this.rowCount; i++){

			for (var j = 0; j < this.colCount; j++){

				this.cells[i][j].setWall("CLEAR");

			}

		}

	}

	findPath(){

		this.resetAllCost();

		openSet = new Array(); // All nodes to be evaluated.
		closedSet = new Array(); // All nodes already evaluated.

		openSet.push(this.startElement); // Adding startElement to openSet to be evaluated.

		while (openSet.length > 0){ // Loop through algo.

			var currentCell = openSet[0]; // Find the element w the lowest F cost.

			for (var i = 0; i < openSet.length; i++){

				if (openSet[i].f < currentCell.f || openSet[i].F == currentCell.f && openSet[i].h < currentCell.h){
					
					currentCell = openSet[i];

				}

			}

			removeFromArray(openSet, currentCell);
			closedSet.push(currentCell);

			if (currentCell == this.endElement){ // If current cell is end, return.

				retracePath(this.startElement, this.endElement);
				return;

			}

			var neighbors = this.getNeighbors(currentCell, false); // Gets neighbors of currentCell.

			for (var i = 0; i < neighbors.length; i++){

				var neighbor = neighbors[i];

				if (closedSet.includes(neighbor)) continue; // Skip neighbor if we already evaluated it.

				var distance = currentCell.g + getDistance(currentCell, neighbor);
				if (distance < neighbor.g || !openSet.includes(neighbor)){

					neighbor.g = distance;
					neighbor.h = getDistance(neighbor, this.endElement);
					neighbor.prev = currentCell;

					if (!openSet.includes(neighbor)){

						openSet.push(neighbor);

					}

				}

			}

		}

	}

}

function retracePath(startCell, endCell){

	var path = new Array();
	var currentCell = endCell;

	while (currentCell != startCell){

		path.push(currentCell);
		currentCell = currentCell.prev;

	}

	path = path.reverse();
	removeFromArray(path, startCell);
	removeFromArray(path, endCell);

	globalPath = path;

	for (var i = 0; i < path.length; i++){

		path[i].element.classList.add("path");

	}

}

function getDistance(gridCell, endCell){

	var distanceX = Math.abs(gridCell.x - endCell.x);
	var distanceY = Math.abs(gridCell.y - endCell.y);

	if (distanceX > distanceY)
		return (14 * distanceY) + (10 * distanceX - distanceY);

	return (14 * distanceX) + (10 * distanceY - distanceX);

}

function removeFromArray(array, element){

	for (var i = array.length; i >= 0; i--){

		if (array[i] == element){

			array.splice(i, 1);

		}

	}

}

function initialize(grid, cell){

	cell.element.onmouseover = function(){

		if (cell != grid.startElement && cell != grid.endElement){

			if ((settingStart || settingEnd) && !cell.isWall){

				if (settingStart) grid.setStart(cell);
				else grid.setEnd(cell);

				grid.findPath();

			} else if (!settingStart && !settingEnd && toggleMode){

				if (drawOrClear == "DRAW"){

					cell.setWall(1);


				} else if (drawOrClear == "CLEAR"){

					cell.setWall(0);

				}

			}

			grid.calculateDistances();
			grid.findPath();

		}

	}

	cell.element.onmousedown = function(){

		if (!settingStart && !settingEnd && cell != grid.startElement && cell != grid.endElement){ 

			if (cell.isWall) drawOrClear = "DRAW";
			else drawOrClear = "CLEAR";
			toggleMode = true;

			cell.setWall(cell.isWall);
			grid.findPath();

		}

	}
}