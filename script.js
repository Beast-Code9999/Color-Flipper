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
        let saturation = 100;
        let value = 100;
        let hsl = '';
        let c = 0;
        let m = 0
        let y = 0;
        let k = 0;
        let hex = '';

        return {
            r,
            g,
            b,
            hue,
            saturation,
            value,
            hsl,
            c, 
            m,
            y,
            k,
            hex,
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

        const setHSL = function setHSL() {
            Color.hsl = `${RGBtoHSL()}`;
        };

        const setCMYK = function setCMYK() {
            RGBtoCMYK()
            console.log(Color.c, Color.m, Color.y, Color.k)
        };

        const setHEX = function setHEX() {
            Color.hex = `${RGBtoHEX()}`;
        };

        const setColors = function setColors( hue, saturation, value ) {
            setHSV( hue, saturation, value );
            setHSL();
            setCMYK();
            setHEX();
        };

        function HSVtoRGB() { // complicated conversion of HSV color type to RGB
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

        function RGBtoHSL() {
            let red		= Color.r / 255;
            let green	= Color.g / 255;
            let blue	= Color.b / 255;
    
            let cmax = Math.max(red, green, blue);
            let cmin = Math.min(red, green, blue);
            let delta = cmax - cmin;
            let hue = 0;
            let saturation = 0;
            let lightness = (cmax + cmin) / 2;
            let X = (1 - Math.abs(2 * lightness - 1));
    
            if (delta) {
                if (cmax === red ) { hue = ((green - blue) / delta); }
                if (cmax === green ) { hue = 2 + (blue - red) / delta; }
                if (cmax === blue ) { hue = 4 + (red - green) / delta; }
                if (cmax) saturation = delta / X;
            }

            let finalHue;
            let finalSaturation;
            let finalLightness;
    
            finalHue = 60 * hue | 0;
            if (finalHue < 0) finalHue += 360;
            finalSaturation = (saturation * 100) | 0;
            finalLightness = (lightness * 100) | 0;

            let value = `${finalHue}??, ${finalSaturation}%, ${finalLightness}%`;
            return value;
        }

        function RGBtoCMYK() {
            let c = 1 - (Color.r / 255);
            let m = 1 - (Color.g / 255);
            let y = 1 - (Color.b / 255);
            let k = Math.min(c, Math.min(m, y));
            
            c = (c - k) / (1 - k);
            m = (m - k) / (1 - k);
            y = (y - k) / (1 - k);
        
            c = Math.round((c * 100));
            m = Math.round((m * 100));
            y = Math.round((y * 100));
            k = Math.round((k * 100));
            
            c = isNaN(c) ? 0 : c;
            m = isNaN(m) ? 0 : m;
            y = isNaN(y) ? 0 : y;
            k = isNaN(k) ? 0 : k;
            
            Color.c = c;
            Color.m = m;
            Color.y = y;
            Color.k = k;
        }

        function RGBtoHEX() {
            let r = Color.r.toString(16);
            let g = Color.g.toString(16);
            let b = Color.b.toString(16);
            if (Color.r < 16) r = '0' + r;
            if (Color.g < 16) g = '0' + g;
            if (Color.b < 16) b = '0' + b;
            let value = '#' + r + g + b;
            // console.log(value)
            return value.toUpperCase();
        }

        return {
            setRGB,
            setHSV,
            setHSL,
            setCMYK,
            setHEX,
            setColors,
        };
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
    
            var hue = ((359 * (x)) / width) | 0; 
            // hue 0 = RED
            // hue 120 = GREEN 
            // hue 240 = BLUE
            // hue 359 = RED

            _updateHueSliderPosition( x );
            _updateHueSliderColor( hue );
            Color.hue = hue;

            SetConvert.setColors( Color.hue, Color.saturation, Color.value );

            function updatePickerBackground() {
                const picker = getElemById('picker');
                picker.style.backgroundColor = `rgb( ${Color.r}, ${Color.g}, ${Color.b} )`;
            }
            updatePickerBackground()
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
        const hueArea = getElemById('hue');
        
        const changePickingAreaBackground = function changePickingAreaBackground() {
            const pickingArea = getElemById('picking-area');
            pickingArea.style.backgroundColor = `hsl(${Color.hue}, 100%, 50%)`;
        };

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
        };

        const _updatePickerColor = function _updatePickerColor() {
            const picker = getElemById('picker');
            picker.style.backgroundColor = `rgb( ${Color.r}, ${Color.g}, ${Color.b} )`;
        };

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

            SetConvert.setColors( Color.hue, saturation, value );

            // console.log( Color.r, Color.g, Color.b )

            _updatePickerPosition( x, y );
            _updatePickerColor()

            // console.log(pickingArea)
            // console.log(pickingArea.offsetLeft)
            // console.log(picking.offsetLeft)
            // console.log(x, y)
        };

        const updatePickerArea = function updatePickerArea() {
            const pickingArea = getElemById('spectrum__canvas');
            _setMouseTracking( pickingArea, _updatePicker )
        };

        return {
            updatePickerArea,
        };
    })();

    function copyHex() {
        const copyElem = getElemById("output__copy");
        const hex = getElemById("output__code--hex");

        function copy() {
            navigator.clipboard.writeText(hex.textContent).then(function() {
                alert("Text copied");
            })
        }
        copyElem.addEventListener('click', copy);
    }

    const init = function init() {
        HueSlider.updateHueArea();
        PickingArea.updatePickingArea();
        Picker.updatePickerArea();
        copyHex();
    };

    return {
        init: init,
        Color: Color,
    };
})();

const TextInputManager = (function inputSliderManager() {
	/*========== Make an element resizable relative to it's parent ==========*/


    const init = function init() {

    };

    return {
        init: init,
    };
})();


const ColorPickerTool = (function ColorPickerTool() {
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

    const Tool = (function Tool() {
        /*************************************************************************/
        //						  update canvas background
        /*************************************************************************/
        const updateCanvas = function canvasSample() {
            const hue = getElemById('hue'); // tracks the parent div of #slider
            const spectrumCanvas = getElemById('spectrum__canvas'); // tracks the parent div of #picker
            
            function updateCanvasBackground() {
                const canvasSample = getElemById('canvas-sample');
                // console.log( UIColorPicker.Color.r, UIColorPicker.Color.g, UIColorPicker.Color.b)
                canvasSample.style.backgroundColor = 
                `rgb( ${UIColorPicker.Color.r}, 
                    ${UIColorPicker.Color.g}, 
                    ${UIColorPicker.Color.b} )`;
            }
            _setMouseTracking( hue, updateCanvasBackground );
            _setMouseTracking( spectrumCanvas, updateCanvasBackground );
        };

        /*************************************************************************/
        //						   update output elements
        /*************************************************************************/
        const updateOutput = (function updateOutput() {
            const hue = getElemById('hue'); 
            const spectrumCanvas = getElemById('spectrum__canvas'); 

            const hex = function hex() {
                const output = getElemById('output__code--hex');
                output.textContent = `${UIColorPicker.Color.hex}`;
            };

            const rgb = function rgb() {
                const output = getElemById('output__code--rgb');
                output.textContent = 
                `${UIColorPicker.Color.r}, 
                 ${UIColorPicker.Color.g}, 
                 ${UIColorPicker.Color.b}`;
            };

            const cmyk = function cmyk() {
                const output = getElemById('output__code--cmyk');
                output.textContent = 
                `${UIColorPicker.Color.c}%, 
                 ${UIColorPicker.Color.m}%, 
                 ${UIColorPicker.Color.y}%,
                 ${UIColorPicker.Color.k}%`;
            };
            
            const hsv = function hsv() {
                const output = getElemById('output__code--hsv');
                output.textContent = 
                `${UIColorPicker.Color.hue}??, 
                 ${UIColorPicker.Color.saturation}%, 
                 ${UIColorPicker.Color.value}%`;
            };

            const hsl = function hsl() {
                const output = getElemById('output__code--hsl');
                output.textContent = 
                `${UIColorPicker.Color.hsl}`;
            };

            const updateAllOutput = function updateAllOutput() {
                hex();
                rgb();
                cmyk();
                hsv();
                hsl();
            };

            const init = function init() {
                _setMouseTracking( hue, updateAllOutput );
                _setMouseTracking( spectrumCanvas, updateAllOutput );
            }

            return {
                init,
            };
        })();
    
        const init = function init() {
            updateCanvas();
            updateOutput.init();
        }

        return {
            init,
        }
    })();

    const init = function init() {
        UIColorPicker.init();
        TextInputManager.init();
        Tool.init();
        // inputSliderManager.init();
    };

    return {
        init: init
    };
})();

window.addEventListener('load', function() {
    ColorPickerTool.init();
});

// footer script
function addDynamicFooterDate() {
    const footer = document.querySelector('.footer__year');
    let year = new Date().getFullYear();
    footer.textContent = year;
};
addDynamicFooterDate();
