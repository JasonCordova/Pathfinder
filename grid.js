var settingStart = false;
var settingEnd = false;
var toggleMode = false;
var drawOrClear = "CLEAR";

document.onmouseup = function(){

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

		this.setStart(this.cells[0][0]);
		this.setEnd(this.cells[this.rowCount - 1][this.colCount - 1]);

		this.calculateDistances()
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

		if (this.startElement != null){

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

	setEnd(cell){

		if (this.endElement != null){

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

}

function initialize(grid, cell){

	cell.element.onmouseover = function(){

		if (cell != grid.startElement && cell != grid.endElement){

			if ((settingStart || settingEnd) && !cell.isWall){

				if (settingStart) grid.setStart(cell);
				else grid.setEnd(cell);

			} else if (!settingStart && !settingEnd && toggleMode){

				if (drawOrClear == "DRAW"){

					cell.setWall(1);


				} else if (drawOrClear == "CLEAR"){

					cell.setWall(0);

				}

			}

			grid.calculateDistances();

		}

	};

	cell.element.onmousedown = function(){

		if (!settingStart && !settingEnd && cell != grid.startElement && cell != grid.endElement){ 

			if (cell.isWall) drawOrClear = "DRAW";
			else drawOrClear = "CLEAR";
			toggleMode = true;

			cell.setWall(cell.isWall);

		}

	}


}