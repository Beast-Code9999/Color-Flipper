'use strict';

// const colorCanvas = document.getElementById('color-canvas');
// const colorCtx = colorCanvas.getContext('2d'); // creates a 2d context for the canvas

// // Create a Horizontal Gradient(white to color)
// var color = 'rgba(0,0,255,1)';
// let gradientH = colorCtx.createLinearGradient(0, 0, colorCtx.canvas.width, 0);
// gradientH.addColorStop(0, '#fff');
// gradientH.addColorStop(1, color);
// colorCtx.fillStyle = gradientH;
// colorCtx.fillRect(0, 0, colorCtx.canvas.width, colorCtx.canvas.height);


// // Create a Vertical Gradient(white to black)
//  let gradientV = colorCtx.createLinearGradient(0, 0, 0, 300);
//  gradientV.addColorStop(0, 'rgba(0,0,0,0)');
//  gradientV.addColorStop(1, '#000');
//  colorCtx.fillStyle = gradientV;
//  colorCtx.fillRect(0, 0, colorCtx .canvas.width, 
//  colorCtx.canvas.height); 



const UIColorPicker = (function UIColorPIcker() {

    /** 
	 * RGBA Color class
	 *
	 * HSV/HSB and HSL (hue, saturation, value / brightness, lightness)
	 * @param hue			0-360
	 * @param saturation	0-100
	 * @param value 		0-100
	 * @param lightness		0-100
	 */
    const setMouseTracking = function setMouseTracking() {
        elem.addEventListener('mousedown', function(e) {
			callback(e);
			document.addEventListener('mousemove', callback);
		});

		document.addEventListener('mouseup', function(e) {
			document.removeEventListener('mousemove', callback);
		});
    };


    const init = function init() {

    };


    return {
        init: init,
    };
})();




const inputSliderManager = (function inputSliderManager() {
	/*========== Make an element resizable relative to it's parent ==========*/

    const init = function init() {

    };

    return {
        init: init,
    };
})();







window.addEventListener('load', function() {
    ColorPickerTool.init()
});


const ColorPickerTool = (function ColorPickerTool() {


    const canvasSample = function canvasSample() {

    }

    const init = function init() {
        UIColorPicker.init();
        inputSliderManager.init();
    };

    return {
        init: init
    };
})();


// colorCanvas.addEventListener('click',function(event){
//     let x = event.clientX;  // Get X coordinate
//     let y = event.clientY;  // Get Y coordinate
//     pixel = colorCtx.getImageData(x,y,1,1)['data'];   // Read pixel Color
//     rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
//     document.body.style.background = rgb;    // Set this color to body of the document
//  });

// const ctx = document.getElementById('color-slider').getContext('2d');

// footer script
function addDynamicFooterDate() {
    const footer = document.querySelector('.footer__year');
    let year = new Date().getFullYear()
    footer.textContent = year;
};
addDynamicFooterDate();
