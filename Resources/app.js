/***
 * Connects the blue box to the red box with touch and finger slide. 
 * The windows backgroundColor and the Label will give action feedback to the user.
 * And, no, the blue box is not going to move anywhere. For now.
 * 
 * Copyright (c) 2013 Patrick De Marta
 * License MIT
 */

/**
 * The blue box
 */
var objectA = Ti.UI.createView({
	backgroundColor:"blue",
	width:100,
	height:100,
	top: 50
});
var startedTouchA = false;

/**
 * The red box
 */
var objectB = Ti.UI.createView({
	backgroundColor:"red",
	width:100,
	height:100,
	bottom: 50
});
var collidedToB = false;

/**
 * Label for textual feedback
 */
var label = Ti.UI.createLabel({
	text:"Touch the blue box",
	font:{fontSize:18},
	color:"yellow"
});


/**
 * A transparent view used to listen for touches
 */
var sensor = Ti.UI.createView({
	bubbleParent:false,
	backgroundColor:'transparent'
});


/**
 * The main window
 */
var win = Ti.UI.createWindow({
	backgroundColor:"black"
});


/**
 * Behaviours of the sensor view
 *
 *
 * Touch start
 * If touch was over the objectA,
 * rise startedTouchA flag and give feedback!
 */
sensor.addEventListener('touchstart', function(e){
	if (touchIsOver(objectA, e)) {
		startedTouchA = true;
		win.backgroundColor = "yellow";
		label.color="black";
		label.text = "Slide your finger to the red box";
	}
});


/** 
 * Touch move
 * If startedTouchA and finger is over the objectB,
 * rise collidedToB flag and give feedback!
 */
sensor.addEventListener('touchmove',function(e){
	if (startedTouchA && touchIsOver(objectB, e)) {
		win.backgroundColor = "green";
		collidedToB = true;
		label.text = "You connected the blue to the red box";
	}
});

/** 
 * Touch end
 * If finger left before getting to the red box, reset the UI.
 * Anyway drop the flags startedTouchA, collidedToB.
 */
sensor.addEventListener('touchend', function(){
	if (!collidedToB) {
		win.backgroundColor = "black";
		label.color = "yellow";
		label.text = "Touch the blue box";
	}
	startedTouchA = false;
	collidedToB = false;
});


/**
 * Check if the touch position is over the area of an object
 */
function touchIsOver(obj, e){
	var onX = (e.x > obj.rect.x) && (e.x < obj.rect.x + obj.rect.width);
	var onY = (e.y > obj.rect.y) && (e.y < obj.rect.y + obj.rect.height);
    return (onX && onY);	
};

/**
 * Add everyting to the window and open it.
 * Note that sensor is the last added, to put it ontop the others, in the zIndex ordering.
 */
win.add(objectA);
win.add(objectB);
win.add(label);
win.add(sensor);

win.open();