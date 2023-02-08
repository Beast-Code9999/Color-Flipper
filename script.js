const colorCanvas = document.getElementById('color-canvas');
const colorCtx = colorCanvas.getContext('2d'); // creates a 2d context for the canvas

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
    //
}

function createColorSlider() {
    const hue = document.getElementById('hue');
    const ctx = hue.getContext('2d');

}

// colorCanvas.addEventListener('click',function(event){
//     let x = event.clientX;  // Get X coordinate
//     let y = event.clientY;  // Get Y coordinate
//     pixel = colorCtx.getImageData(x,y,1,1)['data'];   // Read pixel Color
//     rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
//     document.body.style.background = rgb;    // Set this color to body of the document
//  });

const ctx = document.getElementById('color-slider').getContext('2d');

console.log(colorCanvas)
// footer script
function addDynamicFooterDate() {
    const footer = document.querySelector('.footer__year');
    let year = new Date().getFullYear()
    footer.textContent = year;
}
addDynamicFooterDate()
