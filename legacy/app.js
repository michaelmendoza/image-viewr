"use strict";

/**
 * App Namespace
 */
var App = {};

/**
 * Initial App 
 */
App.Init = function() {
	var canvas = new this.Canvas();
	canvas.createImg('src/assets/image.png');
	canvas.handleMouseMove();

	var element = document.getElementById("image-viewer");
	element.appendChild(canvas.canvas);

	var infoElement = document.getElementById("image-info");
	var textElement = document.createElement("span");
	textElement.id = 'image-info-text';
	textElement.innerHTML = 'test text';
	infoElement.appendChild(textElement);
}

/**
 * Canvas based image viewer
 */
App.Canvas = function(width, height) {
	this.width = 400;
	this.height = 400;
	this.img = null;

	this.init();
}

App.Canvas.prototype = Object.create({});
App.Canvas.prototype.constructor = App.Canvas;

/**
 * Initialize
 */
App.Canvas.prototype.init = function() {
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.context = this.canvas.getContext('2d');
}

/**
 * Add image to canvas 
 */
App.Canvas.prototype.createImg = function(imgfile) {
	this.img = new Image();

	this.img.onload = function() {
		var context = this.context;
		this.width = this.img.width;
		this.height = this.img.height;
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.img.crossOrigin = "Anonymous";
		context.drawImage(this.img, 0, 0);
		//context.fillStyle = '#222222';
		//context.fillRect(0, 0, 100, 100);
	}.bind(this)

	this.img.src = imgfile;
}

/**
 * Handle mousemove event
 */
App.Canvas.prototype.handleMouseMove = function( ) {
	var element = this.canvas;
	element.onmousemove = function(event) {
		var x = event.offsetX;
		var y = event.offsetY;	
		var data = this.context.getImageData(x, y, 1, 1).data;
		var greyValue = Math.round((data[0] + data[1] + data[3]) / 3);

		console.log(x, y, data);
		var textElement = document.getElementById("image-info-text");
		textElement.innerHTML = 'x: ' + x + ' y: ' + y + ' data: ' + greyValue;
	}.bind(this)

}







