const updateEvent = new Event("onUpdate");

class numInput {
	
	constructor(min = 5, max = 20, text = "", parent=document.body){

		this.label = text;
		this.min = min;
		this.max = max;
		this.parent = parent;

		if (min > max){

			let temp = min;
			this.min = max;
			this.max = temp;

		}

		this.value = min;
		this.createSlider();

		initializeInput(this);

	}

	createSlider(){

		// Make numInput parent.

		var numInput = document.createElement("div");
		numInput.classList.add("num-input");
		this.parent.appendChild(numInput);

		// Make general label.

		if (this.label != ""){

			var labelElement = document.createElement("div");
			labelElement.classList.add("label");
			labelElement.innerText = this.label;
			numInput.appendChild(labelElement);

		}

		// Make general slider element.

		var sliderElement = document.createElement("div");
		sliderElement.classList.add("slider");
		this.slider = sliderElement;

		// Make decrement element with eventListener.

		var decrementElement = document.createElement("div");
		decrementElement.classList.add("decrement");
		decrementElement.classList.add("input-button");	
		decrementElement.innerText = "-";
		sliderElement.appendChild(decrementElement);

		this.decrementElement = decrementElement;

		// Make increment element with eventListener.

		var inputElement = document.createElement("input");
		inputElement.classList.add("value");
		inputElement.type = "number";
		inputElement.min = this.min;
		inputElement.max = this.max;
		inputElement.value = this.value;

		this.inputElement = inputElement;

		sliderElement.appendChild(inputElement);

		// Make input element with eventListener.

		var incrementElement = document.createElement("div");
		incrementElement.classList.add("increment");
		incrementElement.classList.add("input-button");	
		incrementElement.innerText = "+";

		this.incrementElement = incrementElement;

		sliderElement.appendChild(incrementElement);

		// Finally append general slider to Settings tab.

		numInput.appendChild(sliderElement);

	}

	increment(){

		if (this.value == this.max) return;

		if (this.value > this.max) this.value = this.max;
		else if (this.value < this.max) this.value++;

		this.updateSlider();

	}

	decrement(){

		if (this.value == this.min) return;

		if (this.value < this.min) this.value = this.min;
		else if (this.value > this.min) this.value--;

		this.updateSlider();

	}

	updateSlider(){

		this.inputElement.value = this.value;
		this.slider.dispatchEvent(updateEvent);

	}

}

// -----------------------------------

var minTime = 20;
var defaultTime = 210;
var timeInterval = 25;
var incrementTime = defaultTime;
var decrementTime = defaultTime;
var incrementUp, incrementDown;

function initializeInput(classInput){

	// Initialize increment event listener.

	classInput.incrementElement.addEventListener("mousedown", function(){

		classInput.increment();
		incrementUp = setInterval(function(){ whileIncrementUp(classInput); }, incrementTime);

	});

	classInput.incrementElement.addEventListener("mouseout", function(){

		resetTimer();

	});

	document.addEventListener("mouseup", function(){

		resetTimer();

	});

	// Initialize decrement event listener.

	classInput.decrementElement.addEventListener("mousedown", function(){

		classInput.decrement();
		incrementDown = setInterval(function(){ whileIncrementDown(classInput); }, decrementTime);

	});

	classInput.decrementElement.addEventListener("mouseout", function(){

		resetTimer();

	});

	// Initialize number input event listener.

	classInput.inputElement.addEventListener("change", function(){

		if (this.value < classInput.min){

			classInput.value = classInput.min;
			this.value = classInput.value;

		} else if (this.value > classInput.max) {

			classInput.value = classInput.max;
			this.value = classInput.value;

		} else {

			classInput.value = parseInt(this.value);

		}

		classInput.slider.dispatchEvent(updateEvent);

	});

}

function resetTimer(){

	clearInterval(incrementUp);
	clearInterval(incrementDown);
	incrementTime = defaultTime;
	decrementTime = defaultTime;

}

function whileIncrementUp(classInput){

	if ((incrementTime - timeInterval) < minTime) incrementTime = minTime;
	else incrementTime -= timeInterval;
	clearInterval(incrementUp);
	incrementUp = setInterval(function(){ whileIncrementUp(classInput); }, incrementTime);

	classInput.increment();

}

function whileIncrementDown(classInput){

	if ((decrementTime - timeInterval) < minTime) decrementTime = minTime;
	else decrementTime -= timeInterval;
	clearInterval(incrementDown);
	incrementDown = setInterval(function(){ whileIncrementDown(classInput); }, decrementTime);
	classInput.decrement();

}