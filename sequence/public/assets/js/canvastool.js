// Retrieve the elements
const sectionCanvas = document.getElementById("sectionCanvas");
const sectionCanvasTools = document.getElementById("sectionCanvasTools");
const canvasPanoramic = document.getElementById("renderCanvasPanoramic");
const canvasGLB = document.getElementById("renderCanvasGLB");

// button
const btnSingleCaptureCanvas = document.getElementById("btnSingleCaptureCanvas");
const focusCanvasPanoramicButton = document.getElementById("focusCanvasPanoramicButton");
const focusCanvasGLBButton = document.getElementById("focusCanvasGLBButton");

// slider
const opacityRangeFocusCanvas = document.getElementById("opacityRangeFocusCanvas");
const opacityRangeFocusCanvasVal = document.getElementById("opacityRangeFocusCanvasVal");
const PosTopCanvas = document.getElementById("PosTopCanvas");
const PosTopCanvasVal = document.getElementById("PosTopCanvasVal");
const PosLeftCanvas = document.getElementById("PosLeftCanvas");
const PosLeftCanvasVal = document.getElementById("PosLeftCanvasVal");
const ScaleCanvas = document.getElementById("ScaleCanvas");
const ScaleResponsiveCanvasVal = document.getElementById("ScaleResponsiveCanvasVal");
const ScaleHeightCanvasVal = document.getElementById("ScaleHeightCanvasVal");
const ScaleWidthCanvasVal = document.getElementById("ScaleWidthCanvasVal");

//global var
var canvasActive = 1

//  to set canvas position
const setCanvasPosition = (canvas, zIndex) => {
    canvas.style.position = "absolute";
    canvas.style.zIndex = zIndex;
}

//default init awal
document.addEventListener("DOMContentLoaded", () => {
    // Kode inisialisasi di sini
    initCanvas();
    focusCanvasPanoramicButton.style.backgroundColor = "#cddc39";
    focusCanvasGLBButton.style.backgroundColor = "#673ab7";
    CanvasGLBButtonOnClick(1, 1);
});

//  to focus canvas
const focusCanvas = (canvas) => {
    canvas.focus();
}

export const CanvasPanoramicButtonOnClick = (valOpacityTrue,valOpacityFalse) => {
    btnSingleCaptureCanvas.innerHTML = "Single Capture Canvas Panoramic";
    btnSingleCaptureCanvas.style.backgroundColor = "#cddc39";
    sectionCanvas.style.border = "5px solid #cddc39";
    canvasPanoramic.style.opacity = valOpacityFalse;
    canvasGLB.style.opacity = valOpacityTrue;
    focusCanvas(canvasPanoramic);
    canvasActive = 0;
    setCanvasPosition(canvasGLB, 0);
    setCanvasPosition(canvasPanoramic, 1);
    opacityRangeFocusCanvas.value = canvasPanoramic.style.opacity;
    opacityRangeFocusCanvasVal.value = canvasPanoramic.style.opacity;    
}

export const CanvasGLBButtonOnClick = (valOpacityTrue,valOpacityFalse) => {
    btnSingleCaptureCanvas.innerHTML = "Single Capture Canvas GLB";
    btnSingleCaptureCanvas.style.backgroundColor = "#673ab7";
    sectionCanvas.style.border = "5px solid #673ab7";
    canvasPanoramic.style.opacity = valOpacityFalse;
    canvasGLB.style.opacity = valOpacityTrue;
    focusCanvas(canvasGLB);
    canvasActive = 1;
    setCanvasPosition(canvasGLB, 1);
    setCanvasPosition(canvasPanoramic, 0);
    opacityRangeFocusCanvas.value = canvasGLB.style.opacity;
    opacityRangeFocusCanvasVal.value = canvasGLB.style.opacity;
}

// Event listeners for focusing on canvas
focusCanvasPanoramicButton.addEventListener("click", () => CanvasPanoramicButtonOnClick(1,1) );
focusCanvasGLBButton.addEventListener("click", () => CanvasGLBButtonOnClick(1,1));


/* ================================================== */
/* Slider Value Set */
/* ================================================== */

// Event listener for opacity slider on GLB canvas
opacityRangeFocusCanvas.addEventListener("input", () => {
    const opacityValue = opacityRangeFocusCanvas.value;
    if (canvasActive == 1) {
        canvasGLB.style.opacity = opacityValue;
        opacityRangeFocusCanvasVal.value = opacityValue;
    }else{
        canvasPanoramic.style.opacity = opacityValue;
        opacityRangeFocusCanvasVal.value = opacityValue;
    }
});

opacityRangeFocusCanvasVal.addEventListener("input", () => {
    const opacityValue = opacityRangeFocusCanvasVal.value;
    if (canvasActive == 1) {
        canvasGLB.style.opacity = opacityValue;
        opacityRangeFocusCanvas.value = opacityValue;
    } else {
        canvasPanoramic.style.opacity = opacityValue;
        opacityRangeFocusCanvas.value = opacityValue;
    }
});



export const DetectCanvasON = async (funcONCanvasGLB,funcONCanvasPanoramic) => {
    if (canvasActive == 1) {
        funcONCanvasGLB();
    } else {
        funcONCanvasPanoramic();
    }
}

/* ================================================== */

const initCanvas = () => {
    SetPosTopCanvasDefault(1);
    SetPosLeftCanvasDefault(5);
    var responsiveScale = ResponsiveScale(75, 75);
    SetScaleCanvasDefault(67.5, responsiveScale.Width, responsiveScale.Height);
}

const SetPosTopCanvasDefault = (valvh) => {
    var topValueVh = parseFloat(valvh);
    PosTopCanvasVal.value = topValueVh;
    sectionCanvas.style.top = topValueVh + 'vh';
    // Menambahkan jarak desimal 95.00
    var adjustedTopValue = parseFloat(topValueVh) + 97.00;
    sectionCanvasTools.style.top = adjustedTopValue + 'vh';
}

const SetPosLeftCanvasDefault = (valvw) => {
    var leftValueVw = parseFloat(valvw);
    PosLeftCanvasVal.value = leftValueVw;
    sectionCanvas.style.left = leftValueVw + 'vw';
    // sectionCanvasTools.style.left = leftValueVw + 'vw';
}

const ResponsiveScale = (widthValue, heightValue) => {
    // Perbandingan paling kecil antara 71.25:90 adalah sama-sama dibagi 200 adalah 0.35625:0.45
    // Lalu disesuaikan kembali menjadi 
    var Width = parseFloat(widthValue) * (0.90);
    var Height = parseFloat(heightValue) * (0.7125 + 0.35625 + 0.07125);
    return {
        Width: parseFloat(Width).toFixed(1),
        Height: parseFloat(Height).toFixed(1)
    };
}


const SetScaleCanvasDefault = (ResponsiveValue, widthValue, heightValue) => {
    //set Width
    ScaleWidthCanvasVal.value = widthValue;    
    sectionCanvas.style.width = widthValue + 'vw'; 
    canvasPanoramic.style.width = widthValue + 'vw'; 
    canvasGLB.style.width = widthValue + 'vw'; 
    
    //set Height
    ScaleHeightCanvasVal.value = heightValue;  
    sectionCanvas.style.height = heightValue + 'vh';  
    canvasPanoramic.style.height = heightValue + 'vh';  
    canvasGLB.style.height = heightValue + 'vh';  

    //set Responsive Val
    ScaleCanvas.value = ResponsiveValue;
    ScaleResponsiveCanvasVal.value = ResponsiveValue;
}

/* ===== */

PosTopCanvas.addEventListener("input", () => {
    const val = PosTopCanvas.value;
    PosTopCanvasVal.value = val; // Update input number value
    SetPosTopCanvasDefault(val);
});
PosTopCanvasVal.addEventListener("input", () => {
    const val = PosTopCanvasVal.value;
    PosTopCanvas.value = val; // Update slider value
    SetPosTopCanvasDefault(val);
});

PosLeftCanvas.addEventListener("input", () => {
    const val = PosLeftCanvas.value;
    PosLeftCanvasVal.value = val; // Update input number value
    SetPosLeftCanvasDefault(val);
});
PosLeftCanvasVal.addEventListener("input", () => {
    const val = PosLeftCanvasVal.value;
    PosLeftCanvas.value = val; // Update slider value
    SetPosLeftCanvasDefault(val);
});

ScaleCanvas.addEventListener("input", () => {
    const val = ScaleCanvas.value;
    ScaleResponsiveCanvasVal.value = val; 
    var responsiveScale = ResponsiveScale(val, val);
    SetScaleCanvasDefault(val, responsiveScale.Width, responsiveScale.Height);
});

ScaleResponsiveCanvasVal.addEventListener("input", () => {
    const val = ScaleResponsiveCanvasVal.value;
    ScaleCanvas.value = val; 
    var responsiveScale = ResponsiveScale(val, val);
    SetScaleCanvasDefault(val, responsiveScale.Width, responsiveScale.Height);
});

ScaleWidthCanvasVal.addEventListener("input", () => {
    SetScaleCanvasDefault(ScaleCanvas.value, ScaleWidthCanvasVal.value, ScaleHeightCanvasVal.value);
});

ScaleHeightCanvasVal.addEventListener("input", () => {
    SetScaleCanvasDefault(ScaleCanvas.value, ScaleWidthCanvasVal.value, ScaleHeightCanvasVal.value);
});




/* ================================================== */
/* LOAD CANVAS */
/* ================================================== */

document.addEventListener("DOMContentLoaded", async () => {
    // Menambahkan event listener untuk keydown , mengganti focus canvas
    document.addEventListener('keydown', (event) => {
        // Mendapatkan nilai key dari event
        var key = event.key;
        var loopif1 = ["Z","X","z","x"]
        for (let i = 0; i < loopif1.length; i++) {
            if (key === loopif1[i]) {
                CanvasPanoramicButtonOnClick(1,1);
            }
        }

        var loopif2 = ["A","W","S","D","Q","E","F","H","T","G","C","V",
                       "a","w","s","d","q","e","f","h","t","g","c","v"]
        for (let i = 0; i < loopif2.length; i++) {
            if (key === loopif2[i]) {
                CanvasGLBButtonOnClick(1,1);
            }
        }
    });
});

/* ==================================================================================== */
/* ==================================================================================== */
