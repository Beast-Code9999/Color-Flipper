const colorCanvas = document.getElementById('color-canvas');
let colorCtx = colorCanvas.getContext('2d'); // creates a 2d context for the canvas

// Create a Horizontal Gradient(white to color)
var color = 'rgba(0,0,255,1)';
let gradientH = colorCtx.createLinearGradient(0, 0, colorCtx.canvas.width, 0);
gradientH.addColorStop(0, '#fff');
gradientH.addColorStop(1, color);
colorCtx.fillStyle = gradientH;
colorCtx.fillRect(0, 0, colorCtx.canvas.width, colorCtx.canvas.height);


// Create a Vertical Gradient(white to black)
 let gradientV = colorCtx.createLinearGradient(0, 0, 0, 300);
 gradientV.addColorStop(0, 'rgba(0,0,0,0)');
 gradientV.addColorStop(1, '#000');
 colorCtx.fillStyle = gradientV;
 colorCtx.fillRect(0, 0, colorCtx .canvas.width, 
 colorCtx.canvas.height); 

function createSpectrumCanvas() {

}

function createColorSlider() {

}

const ctx = document.getElementById('color-slider');

console.log(colorCanvas)
// footer script
function addDynamicFooterDate() {
    const footer = document.querySelector('.footer__year');
    let year = new Date().getFullYear()
    footer.textContent = year;
}
addDynamicFooterDate()
