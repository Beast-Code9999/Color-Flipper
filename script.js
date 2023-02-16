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

// colorCanvas.addEventListener('click',function(event){
//     let x = event.clientX;  // Get X coordinate
//     let y = event.clientY;  // Get Y coordinate
//     pixel = colorCtx.getImageData(x,y,1,1)['data'];   // Read pixel Color
//     rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
//     document.body.style.background = rgb;    // Set this color to body of the document
//  });
// const ctx = document.getElementById('color-slider').getContext('2d');

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
    function getElemById(id) {
        return document.getElementById(id);
	}

    const _setMouseTracking = function _setMouseTracking(elem, callback) { // tracks mouse movement
        elem.addEventListener('mousedown', function(e) {
            callback(e);
            document.addEventListener('mousemove', callback);
        });

        document.addEventListener('mouseup', function(e) {
            document.removeEventListener('mousemove', callback);
        });
    };

    const isValidRGBValue = function isValidRGBValue(value) { // checks if RBG value is valid
		return (typeof(value) === 'number' && isNaN(value) === false &&
			value >= 0 && value <= 255);
	};


    const Color = (function Color() { // set standard colors
        let r = 0;
        let g = 0;
        let b = 0;
        let hue = 0;
        let saturation = 0;
        let value = 0;
        let lightness = 0;

        return {
            r,
            g,
            b,
            hue,
            saturation,
            value,
            lightness,
        }
    })();

    /*************************************************************************/
	//					        set and conversion methods
	/*************************************************************************/
    const SetConvert = (function SetConvert() {
        const setRGB = function setRGB(red, green, blue) {
            if (isValidRGBValue(red) === false ||
                isValidRGBValue(green) === false ||
                isValidRGBValue(blue) === false)
                return;
            Color.r = red | 0;
            Color.g = green | 0;
            Color.b = blue | 0;
        };

        const setHSV = function setHSV( hue, saturation, value ) {
            Color.hue = hue;
            Color.saturation = saturation;
            Color.value = value;
            HSVtoRGB()
        };  

        function HSVtoRGB() {
            var sat = Color.saturation / 100;
            var value = Color.value / 100;
            var C = sat * value;
            var H = Color.hue / 60;
            var X = C * (1 - Math.abs(H % 2 - 1));
            var m = value - C;
            var precision = 255;
    
            C = (C + m) * precision | 0;
            X = (X + m) * precision | 0;
            m = m * precision | 0;
    
            if (H >= 0 && H < 1) {	setRGB(C, X, m);	return; }
            if (H >= 1 && H < 2) {	setRGB(X, C, m);	return; }
            if (H >= 2 && H < 3) {	setRGB(m, C, X);	return; }
            if (H >= 3 && H < 4) {	setRGB(m, X, C);	return; }
            if (H >= 4 && H < 5) {	setRGB(X, m, C);	return; }
            if (H >= 5 && H < 6) {	setRGB(C, m, X);	return; }
        };

        return {
            setRGB,
            setHSV,
        }
    })();

    /*************************************************************************/
	//					Updates UI element Hue || slider
	/*************************************************************************/
    const HueSlider = (function HueSlider() {
        const _updateHueSliderPosition = function _updateHueSlider( left ) {
            const hueSlider = getElemById('slider');
            hueSlider.style.left = Math.max( left - 9, -2 ) + 'px';
        };

        const _updateHueSliderColor = function _updateHueSliderColro( color ) {
            const hueSlider = getElemById('slider');
            hueSlider.style.backgroundColor = `hsl(${color}, 100%, 50%)`;
        };
        
        const _updateHueSlider = function _updateHueSlider( e ) {
            const hueArea = getElemById('hue');

            let x = e.pageX - hueArea.offsetLeft;
            let width = hueArea.clientWidth;

            // console.log("THIS IS PAGE X: ", e.pageX);
            // console.log("THIS IS X: ", x);
            // console.log("THIS IS HUE AREA OFFSET LEFT: ", hueArea.offsetLeft);
            
            if( x > width ) x = width; // so the picker doesn't go beyond the hueArea
            if( x < 0 ) x = 0;
    
            // let percent = x / width;

            var hue = ((359 * (x)) / width) | 0; 
            // hue 0 = RED
            // hue 120 = GREEN 
            // hue 240 = BLUE
            // hue 359 = RED

            _updateHueSliderPosition( x );
            _updateHueSliderColor( hue );
            Color.hue = hue;
        };

        const updateHueArea = function updateHueArea() {
            const hueArea = getElemById('hue');
            _setMouseTracking( hueArea, _updateHueSlider );
        };

        return {
            updateHueArea,
        };
    })();

    /*************************************************************************/
	//						Update picking-area background color
	/*************************************************************************/
    const PickingArea = (function PickingArea() {
        const pickingArea = getElemById('picking-area');
        const hueArea = getElemById('hue');

        const changePickingAreaBackground = function changePickingAreaBackground() {
            pickingArea.style.backgroundColor = `hsl(${Color.hue}, 100%, 50%)`;
        }

        const updatePickingArea = function updatePickingArea() {
            _setMouseTracking( hueArea, changePickingAreaBackground )
        };

        return {
            updatePickingArea,
        };
    })();

    /*************************************************************************/
	//						       update picker
	/*************************************************************************/
    const Picker = (function Picker() {
        const _updatePickerPosition = function _updatePickerPosition( left, top ) {
            const picker = getElemById('picker');
            picker.style.left = (left - 10) + 'px';// -10 allows half of the picker (1 rem) to...
            picker.style.top = (top - 10) + 'px'; // exit the top && left border
        }

        const _updatePickerColor = function _updatePickerColor( hue, whiteness, blackness ) {
            const picker = getElemById('picker');
            picker.style.backgroundColor = `rgb( ${Color.r}, ${Color.g}, ${Color.b} )`;
        }

        const _updatePicker = function _updatePicker( e ) {
            const pickingArea = getElemById('spectrum__canvas');

            let x = e.pageX - pickingArea.offsetLeft ; // x coordinate relative to pickingArea
            let y = e.pageY - pickingArea.offsetTop; // y coordinate relative to pickingArea

            const width = pickingArea.clientWidth;
            const height = pickingArea.clientHeight;
            
            if( x > width ) x = width;
            if( x < 0 ) x = 0;
            if( y > height ) y = height;
            if( y < 0 ) y = 0;

            
            // let saturation = (x / width) * 100 | 0 ;
            // let lightness =  (y / height) * 100 | 0;

            var saturation = x * 100 / width | 0;
            var value = 100 - (y * 100 / height) | 0;

            console.log(saturation, value)

            SetConvert.setHSV( Color.hue, saturation, value );
            // console.log( Color.r, Color.g, Color.b )

            _updatePickerPosition( x, y );
            _updatePickerColor()
            // console.log(pickingArea)
            // console.log(pickingArea.offsetLeft)
            // console.log(picking.offsetLeft)
            // console.log(x, y)
        }

        const updatePickerArea = function updatePickerArea() {
            const pickingArea = getElemById('spectrum__canvas');

            _setMouseTracking( pickingArea, _updatePicker )
        }

        return {
            updatePickerArea,
        }
    })();

    const init = function init() {
        HueSlider.updateHueArea();
        PickingArea.updatePickingArea();
        Picker.updatePickerArea();
    };

    return {
        init: init,
        Color: Color,
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
    function getElemById(id) {
		return document.getElementById(id);
	}

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

// footer script
function addDynamicFooterDate() {
    const footer = document.querySelector('.footer__year');
    let year = new Date().getFullYear()
    footer.textContent = year;
};
addDynamicFooterDate();
