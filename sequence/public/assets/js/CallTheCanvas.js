import { LoadCanvasPanoramic } from './CanvasPanoramic.js';
import { LoadCanvasGLB} from './CanvasGLB.js';
import * as canvastool from './canvastool.js';
import * as SchemaCapture from './SchemaCapture.js';
import * as modal from "./modal.js";
import * as SwitchModeStatus from './SwitchModeStatus.js';

let canvasAndEnginePanoramic; 
let canvasAndEngineGLB; 

const initSizePanoramic = {width:0,height:0};
const initSizeGLB = {width:0,height:0};

let detectCanvasIsResize = 0;

/* ================================================== */
/* LOAD CANVAS */
/* ================================================== */

export const ExecuteCanvasPanoramic = async (blobUrlArray) => {
    try {
        canvasAndEnginePanoramic = await LoadCanvasPanoramic(blobUrlArray);
        initSizePanoramic.width = canvasAndEnginePanoramic.canvas.width;
        initSizePanoramic.height = canvasAndEnginePanoramic.canvas.height;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const ExecuteCanvasGLB = async (blobUrl) => {
    try {
        canvasAndEngineGLB = await LoadCanvasGLB(24, blobUrl);
        initSizeGLB.width = canvasAndEngineGLB.canvas.width;
        initSizeGLB.height = canvasAndEngineGLB.canvas.height;
    } catch (error) {
        console.error("Error:", error);
    }
}  

export const getCanvasAndEnginePanoramic = () => {
    return canvasAndEnginePanoramic;
}

export const getCanvasAndEngineGLB = () => {
    return canvasAndEngineGLB;
}

/* ================================================== */

// Panggil event listener di sini setelah kondisi terpenuhi
export const captureSingleImage = async () => {
    await canvastool.DetectCanvasON(()=>{
            //single
            SchemaCapture.CaptureSingleAsArray({
                canvasAndEngine:canvasAndEngineGLB,
                funcAfterCapture:async (imgUrlArray)=>{
                    await modal.setImage(imgUrlArray)
                    await modal.setInsideModalViewImage();
                    SwitchModeStatus.getDetectCanvasIsResize({numbIsChange : 1});
                    SwitchModeStatus.getCurrentModeRender({numbIsChange : 0});
                    console.log("selesai");
                }
            });
        },()=>{
            //single
            SchemaCapture.CaptureSingleAsArray({
                canvasAndEngine:canvasAndEnginePanoramic,
                funcAfterCapture:async (imgUrlArray)=>{
                    await modal.setImage(imgUrlArray)
                    await modal.setInsideModalViewImage();
                    SwitchModeStatus.getDetectCanvasIsResize({numbIsChange : 1});
                    SwitchModeStatus.getCurrentModeRender({numbIsChange : 0});
                    console.log("selesai");
                }
            });
        }
    );
}

export const captureMultiplyImage = (currentFrame, mostFrame, inputFPS) => {
    let iterasiHandlerRender;
    canvastool.DetectCanvasON(()=>{
            //multiply
            iterasiHandlerRender = SchemaCapture.loopAnimationRender(currentFrame, mostFrame, inputFPS, canvasAndEngineGLB,
                async (imgUrlArray)=>{
                    await modal.setImageGlobalVar(imgUrlArray)
                    await modal.setInsideModalViewImageGlobalVar();
                    SwitchModeStatus.getDetectCanvasIsResize({numbIsChange : 1});
                    SwitchModeStatus.getCurrentModeRender({numbIsChange : 0});
                    console.log("selesai");
                }
            );
        },()=>{
            //multiply
            iterasiHandlerRender = SchemaCapture.loopAnimationRender(currentFrame, mostFrame, inputFPS, canvasAndEnginePanoramic,
                async (imgUrlArray)=>{
                    await modal.setImageGlobalVar(imgUrlArray)
                    await modal.setInsideModalViewImageGlobalVar();
                    SwitchModeStatus.getDetectCanvasIsResize({numbIsChange : 1});
                    SwitchModeStatus.getCurrentModeRender({numbIsChange : 0});
                    console.log("selesai");
                }
            );
        }
    );
    return iterasiHandlerRender;
};

/* ================================================== */

//return the size to original
export const setSizeToOriginal = async () => {
    canvasAndEnginePanoramic.canvas.width = initSizePanoramic.width;
    canvasAndEnginePanoramic.canvas.height = initSizePanoramic.height;
    canvasAndEngineGLB.canvas.width = initSizeGLB.width;
    canvasAndEngineGLB.canvas.height = initSizeGLB.height;
}

/* ================================================== */