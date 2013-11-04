/***
 * Connects the blue box to the red box with touch and finger slide. 
 * The windows backgroundColor and the Label will give action feedback to the user.
 * 
 * How to take advantage of pointInWindowCoords(), trying to better KISS. 
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

/**
 * The red box
 */
var objectB = Ti.UI.createView({
	backgroundColor:"red",
	width:100,
	height:100,
	bottom: 50
});
var collidedWithB = false; // flag the collision with red box 

/**
 * Label for textual feedback
 */
var label = Ti.UI.createLabel({
	text:"Touch the blue box",
	font:{fontSize:18},
	color:"yellow"
});

/**
 * The main window
 */
var win = Ti.UI.createWindow({
	backgroundColor:"black"
});

/**
 * EventListeners
 *
 *
 * Touch start
 */
objectA.addEventListener('touchstart', function(){
	win.backgroundColor = "yellow";
	label.color="black";
	label.text = "Slide your finger to the red box";
});


/** 
 * Touch move
 * If finger is over the red objectB box,
 * rise the collision flag and give feedback!
 */
objectA.addEventListener('touchmove',function(e){
	if (fingerSlideCollider(objectA, objectB, e)) {
		win.backgroundColor = "green";
		collidedWithB = true;
		label.text = "You connected the blue to the red box";
	}
});

/** 
 * Touch end
 * If finger left before getting to the red box, reset the UI.
 * Anyway drop the eventually raised collision flag.
 */
objectA.addEventListener('touchend', function(){
	if (!collidedWithB) {
		win.backgroundColor = "black";
		label.color = "yellow";
		label.text = "Touch the blue box";
	}
	collidedWithB = false;
});


/**
 * Check if the touch position is over the area of an object,
 * use pointInWindowCoords() to translate the coords originated by objectA touchMove
 * into the target objectB coords system.
 * It's easy then to check if touch falls inside the target object display area,
 * meaning that the collision occured.
 */
function fingerSlideCollider(originObj, targetObj, e){

	var pointInWin = originObj.convertPointToView({x:e.x, y:e.y}, targetObj),
		x = pointInWin.x,
		y = pointInWin.y,

		onX = (x > 0) && (x < targetObj.rect.width),
		onY = (y > 0 ) && (y < targetObj.rect.height);
    return (onX && onY);	
};

/**
 * Add everything to the window and open it.
 */
win.add(objectA);
win.add(objectB);
win.add(label);

win.open();