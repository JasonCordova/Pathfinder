class gridCell {

	constructor(x = 0, y = 0, isWall = false){

		this.prev = null;
		this.x = x;
		this.y = y;
		this.distanceToStart = 0;
		this.distanceToEnd = 0;
		this.isWall = isWall;
		this.element;
		this.f = 0;
		this.g = 0;
		this.h = 0;

		var newCell = document.createElement("div");
		newCell.classList.add("cell");

		if (this.isWall){

			newCell.classList.add("wall");

		}

		this.element = newCell;

	}

	setPath(){

		this.element.classList.add("path");

	}

	setWall(state){

		if (state == 0 || state == "WALL"){

			this.isWall = true;
			this.element.classList.add("wall");

		} else if (state == 1 || state == "CLEAR"){

			this.isWall = false;
			this.element.classList.remove("wall");

		}

	}

	toggleWall(){

		if (this.isWall){

			this.isWall = false;
			this.element.classList.remove("wall");

		} else {

			this.isWall = true;
			this.element.classList.add("wall");

		}

	}

}