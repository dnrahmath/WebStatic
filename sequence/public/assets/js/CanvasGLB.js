import 'https://cdn.babylonjs.com/babylon.js';
import 'https://cdn.babylonjs.com/gui/babylon.gui.min.js';
import 'https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js';
import { createElementsGLBGUI } from './CanvasGLBGUI.js';
import { CanvasCameraWalk } from './CanvasCameraWalk.js';

let engine;

const LoadCanvasGLB = async (inputFPS, blobUrl) => {
    try {
        return await new Promise((resolve, reject) => {
            let canvas = document.getElementById("renderCanvasGLB");

            if (!canvas) {
                console.error("Canvas element with ID 'renderCanvasGLB' not found.");
                reject("Canvas not found");
                return;
            }

            console.log("Canvas found:", canvas);

            // Check if Babylon.js and GUI are already loaded
            if (window.BABYLON && window.BABYLON.GUI) {
                // Babylon.js and GUI are already loaded, create engine and scene
                console.log("Babylon.js and GUI are already loaded.");
                resolve(createEngineAndScene(inputFPS, canvas, blobUrl));
            } else {
                console.error("Babylon.js or GUI module not found.");
                reject("Babylon.js or GUI module not found");
            }
        });
    } catch (error) {
        console.error("Error in LoadCanvasGLB:", error);
        throw error; // Re-throw the error for further handling
    }
}

const createEngineAndScene = (inputFPS, canvas, blobUrl) => {
    let mostFrame = 0;
    engine = createDefaultEngine(canvas);
    if (!engine) {
        console.error("Error creating engine.");
        return null;
    }

    console.log("Engine created:", engine);

    // Inisialisasi scene dan engine Babylon.js
    let SceneInit = new BABYLON.Scene(engine);

    // Menambahkan plugin GLTFLoader
    BABYLON.SceneLoader.RegisterPlugin(new BABYLON.GLTFFileLoader());

    // Lampu
    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), SceneInit);

    // Create ColorDome with white background
    let skybox = createColorDome(SceneInit);
    
    // Use the GLTF loader for GLB files
    BABYLON.SceneLoader.Append("", blobUrl, SceneInit, function (sceneAppend) {
        const animationGroups = sceneAppend.animationGroups;
        try {
            //check total frame
            animationGroups.forEach( (AnmGroup) => {
                let animations = AnmGroup.targetedAnimations;
                if (animations && animations.length > 0) {
                    let frameLength = 0;
                    animations.forEach( (animation) => {
                        let keys = animation.animation.getKeys();
                        if (keys && keys.length > 0) {
                            // Mendapatkan frame tertinggi dari setiap kunci animasi
                            let maxFrame = keys[keys.length - 1].frame;
                            frameLength = Math.max(frameLength, maxFrame);
                            if (mostFrame <= frameLength) {
                                mostFrame = Math.round(frameLength);
                            }
                        }
                    });
                } else {
                    console.warn("Tidak ada animasi dalam animationGroup");
                }
                AnmGroup.start();
                AnmGroup.pause();
            });

            // add camera
            let SceneAddCameraWalk = CanvasCameraWalk(SceneInit,canvas);

            // Create Next and Prev Buttons
            let sceneGUI = createElementsGLBGUI(SceneAddCameraWalk, animationGroups, mostFrame, inputFPS);

            // Callback ini memberikan Anda akses ke animationGroups setelah GLB berhasil dimuat
            engine.runRenderLoop( () => {
                sceneGUI.render();
            });
            //-------------------
        } catch (error) {
            console.error("Error in onSuccess callback:", error);
        }
        console.log("Model imported successfully");
    }, undefined, undefined, ".glb");

    SceneInit.onReadyObservable.addOnce(function () {
      console.log("Scene is ready");
    });

    // Optional: Handling WebGL Context Lost
    canvas.addEventListener("webglcontextlost",  (event) => {
        event.preventDefault();
        if (engine) {
            engine.dispose();
        }
    });

    canvas.addEventListener("webglcontextrestored",  () => {
        if (!engine) {
            engine = createDefaultEngine(canvas);
        }
    });

    const getMostFrame =  () => {
        return mostFrame;
    } 

    // Return canvas and engine for further use if needed
    return {
        canvas: canvas,
        engine: engine,
        getMostFrame: getMostFrame
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

// ...

 const createColorDome = (scene) => {
    let size = 1000.0;

    // Create a sphere as the background mesh
    let backgroundSphere = BABYLON.MeshBuilder.CreateSphere("backgroundSphere", { diameter: size, segments: 32 }, scene);

    let sameColor = "#ffffff";

    // Create a white background material
    let backgroundMaterial = new BABYLON.StandardMaterial("backgroundMaterial", scene);
    backgroundMaterial.diffuseColor = new BABYLON.Color3.FromHexString(sameColor); // Set to white
    backgroundMaterial.specularColor = new BABYLON.Color3.FromHexString("#000000"); // Set to black
    backgroundMaterial.emissiveColor = new BABYLON.Color3.FromHexString(sameColor); // Emissive color for additional brightness

    // Apply the background material to the sphere
    backgroundSphere.material = backgroundMaterial;

    // Make the sphere unselectable and set its back-face culling to false
    backgroundSphere.isPickable = false;
    backgroundSphere.material.backFaceCulling = false;

    // Adjust the light color and intensity for the background
    let light = scene.lights[0]; // Assuming there is only one light in the scene
    light.diffuse = new BABYLON.Color3.FromHexString(sameColor); // Set light color to white
    light.specular = new BABYLON.Color3.FromHexString(sameColor); // Set specular color to white
    light.intensity = 0.5; // Set light intensity, adjust this value as needed

    return backgroundSphere;
}


export { LoadCanvasGLB };
