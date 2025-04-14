
import 'https://cdn.babylonjs.com/babylon.js';
import 'https://cdn.babylonjs.com/gui/babylon.gui.min.js';
import { createElementsGUI } from './CanvasPanoramicGUI.js';
import { pad } from './Tools.js';

var engine; 
var camera;

const LoadCanvasPanoramic = async (blobUrlArray) => {
    try {
        return await new Promise((resolve, reject) => {
            var canvas = document.getElementById("renderCanvasPanoramic");

            if (!canvas) {
                console.error("Canvas element with ID 'renderCanvasPanoramic' not found.");
                reject("Canvas not found");
                return;
            }

            console.log("Canvas found:", canvas);

            // Check if Babylon.js and GUI are already loaded
            if (window.BABYLON && window.BABYLON.GUI) {
                // Babylon.js and GUI are already loaded, create engine and scene
                console.log("Babylon.js and GUI are already loaded.");
                resolve(createEngineAndScene(canvas, blobUrlArray));
            } else {
                console.error("Babylon.js or GUI module not found.");
                reject("Babylon.js or GUI module not found");
            }
        });
    } catch (error) {
        console.error("Error in LoadCanvasPanoramic:", error);
        throw error; // Re-throw the error for further handling
    }
}

const createEngineAndScene = (canvas, blobUrlArray) => {
    let totalTime = blobUrlArray.length;
    engine = createDefaultEngine(canvas);
    if (!engine) {
        console.error("Error creating engine.");
        return null;
    }

    console.log("Engine created:", engine);

    // Inisialisasi scene dan engine Babylon.js
    var sceneInit = new BABYLON.Scene(engine);

    // Create PhotoDome with specified resolution and aspect ratio
    var skybox = createPhotoDome(sceneInit, blobUrlArray);

    // Create Next and Prev Buttons
    var sceneGUI = createElementsGUI(sceneInit, skybox, totalTime, blobUrlArray);

    // Camera
    var startingPoint = BABYLON.Tools.ToRadians(-90);
    camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2 + startingPoint, Math.PI / 2, 5, BABYLON.Vector3.Zero(), sceneGUI);
    camera.lowerRadiusLimit = 0;  // Batasi zoom sebelum masuk ke dalam PhotoDome
    camera.upperRadiusLimit = 0;  // Batasi zoom sebelum keluar ke dalam PhotoDome
    camera.attachControl(canvas, true);


    sceneGUI.clearColor = new BABYLON.Color3(0, 0, 0);

    engine.runRenderLoop(() => {
        sceneGUI.render();
    });

    // Optional: Handling WebGL Context Lost
    canvas.addEventListener("webglcontextlost",(event) => {
        event.preventDefault();
        if (engine) {
            engine.dispose();
        }
    });

    canvas.addEventListener("webglcontextrestored",() => {
        if (!engine) {
            engine = createDefaultEngine(canvas);
        }
    });

    const getMostFrame =  () => {
        return totalTime;
    } 

    // Return canvas and engine for further use if needed
    return {
        canvas: canvas,
        engine: engine,
        getMostFrame: getMostFrame,
    };
}

//  createDefaultEngine
const createDefaultEngine = (canvas) => {
    try {
        return new BABYLON.Engine(canvas, true, {
            preserveDrawingBuffer: true,
            stencil: true,
            disableWebGL2Support: false,
            antialias: true,
            premultipliedAlpha: false,
            failIfMajorPerformanceCaveat: false,
            alpha: false, // Add this line
        });
    } catch (e) {
        console.error("Error creating engine:", e);
        return null;
    }
}

//  to create PhotoDome
const createPhotoDome = (scene, blobUrlArray) => {
    var resolution = 32;
    var size = 1000.0;
    // var initialImage = pad(1, 4) + ".png";
    
    // let imageUrlDefault = "/public/assets/file/panoramic_4096x2048-sequence-default/0001.png";
    let imageUrlDefault = "/sequence/public/assets/file/panoramic_4096x2048-sequence-default/0001.png";
    let babylonPhotoDome;

    // Create the PhotoDome
    // return new BABYLON.PhotoDome("skyBox", "/public/assets/file/panoramic_4096x2048-sequence/" + initialImage, {
    if (blobUrlArray.length > 0) {
        babylonPhotoDome = new BABYLON.PhotoDome("skyBox", blobUrlArray[0], {
            resolution: resolution,
            size: size,
            useDirectMapping: false
        }, scene);
    }else{
        babylonPhotoDome = new BABYLON.PhotoDome("skyBox", imageUrlDefault, {
            resolution: resolution,
            size: size,
            useDirectMapping: false
        }, scene);
    }

    return babylonPhotoDome;
}


export { LoadCanvasPanoramic };
