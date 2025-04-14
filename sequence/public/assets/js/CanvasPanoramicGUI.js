// CanvasPanoramicGUI.js
import 'https://cdn.babylonjs.com/babylon.js';
import 'https://cdn.babylonjs.com/gui/babylon.gui.min.js';
import * as Tools from './Tools.js';
import * as CanvasSetupGUI from './CanvasSetupGUI.js';


const createElementsGUI = (scene, skybox, totalTime, blobUrlArray) => {
    let currentTime = 1; // Initial image index
    let advancedTexture; // Declare advancedTexture letiable

    // Create AdvancedDynamicTexture for GUI
    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("gui");
    advancedTexture.alpha = 0.01;
    
    // Add shortcut
    scene.onKeyboardObservable.add((KeyEvnt) => {
    }, BABYLON.KeyboardEventTypes.KEYUP);

    

    // Add shortcut onKeyUp
    scene.onKeyboardObservable.add((KeyEvnt) => {
        let keyPrev = ["Z","z"]
        let keyNext = ["X","x"]
        switch (KeyEvnt.type) {
          case BABYLON.KeyboardEventTypes.KEYDOWN:
            for (let i = 0; i < keyPrev.length; i++) {
                if (KeyEvnt.event.key === keyPrev[i]) {
                    currentTime = Tools.handlecurrentTimeUpdate(Math.round(currentTime - 1), 1, totalTime);
                    slider1.value = currentTime;
                }
            }
            for (let i = 0; i < keyNext.length; i++) {
                if (KeyEvnt.event.key === keyNext[i]) {
                    currentTime = Tools.handlecurrentTimeUpdate(Math.round(currentTime + 1), 1, totalTime);
                    slider1.value = currentTime;
                }
            }
            break;
          case BABYLON.KeyboardEventTypes.KEYUP:
            for (let i = 0; i < keyPrev.length; i++) {
                if (KeyEvnt.event.key === keyPrev[i]) {
                    updatePhotoDome();
                }
            }
            for (let i = 0; i < keyNext.length; i++) {
                if (KeyEvnt.event.key === keyNext[i]) {
                    updatePhotoDome();
                }
            }
            break;
        }
    });

    /*============================================================================*/

    // Create View Text Number
    let textBlockView = CanvasSetupGUI.createText("View", "#cddc39", -47, -28, 15);
    const updateViewText= () => {
        textBlockView.text = "View" + ": " + currentTime;
    }
    scene.onBeforeRenderObservable.add(updateViewText);
    advancedTexture.addControl(textBlockView);

    // Create Slider
    let slider1 = CanvasSetupGUI.createSlider("scroll", "#cddc39", 28, 2.5, 1, totalTime,  (value) => {
        currentTime = Tools.handlecurrentTimeUpdate(Math.round(value), 1, totalTime);
        updatePhotoDome();
    });
    advancedTexture.addControl(slider1);

    // Create Prev Button
    let btn1 = CanvasSetupGUI.createButton({labelBtn:"Prev"}, "#cddc39", "35px", "25px", "1%", "1%",  () => {
        currentTime = Tools.handlecurrentTimeUpdate(Math.round(currentTime - 1), 1, totalTime);
        slider1.value = currentTime;
        updatePhotoDome();
    });
    advancedTexture.addControl(btn1);

    // Create Next Button
    let btn2 = CanvasSetupGUI.createButton({labelBtn:"Next"}, "#cddc39", "35px", "25px", "1%", "8%",  () => {
        currentTime = Tools.handlecurrentTimeUpdate(Math.round(currentTime + 1), 1, totalTime);
        slider1.value = currentTime;
        updatePhotoDome();
    });
    advancedTexture.addControl(btn2);

    // Create centered rectangle
    let rect1 = CanvasSetupGUI.createRectangle("CenteredRect", "#cddc39", 86, 86);
    advancedTexture.addControl(rect1);
    let txt1 = CanvasSetupGUI.createText("1920x1080", "#cddc39", 45, 38, 15);
    advancedTexture.addControl(txt1);

    // Coordinate labels
    let txt2 = CanvasSetupGUI.createText("X1", "#cddc39", 0, -45, 15);
    advancedTexture.addControl(txt2);
    let txt3 = CanvasSetupGUI.createText("Y1", "#cddc39", -46, 0, 15);
    advancedTexture.addControl(txt3);
    let txt4 = CanvasSetupGUI.createText("X2", "#cddc39", 0, 45, 15);
    advancedTexture.addControl(txt4);
    let txt5 = CanvasSetupGUI.createText("Y2", "#cddc39", 46, 0, 15);
    advancedTexture.addControl(txt5);

    /*============================================================================*/

    //  to update the PhotoDome texture
    const updatePhotoDome = () => {
        updateViewText();

        currentTime = (currentTime > totalTime) ? 1 : (currentTime < 1) ? totalTime : currentTime;
        const numb = Tools.pad(currentTime, 4);
        const selectFile = blobUrlArray[numb];

        // let imageName = Tools.pad(currentTime, 4) + ".png";
        // let imageUrl = "/public/assets/file/panoramic_4096x2048-sequence/" + imageName;

        // let imageUrlDefault = "/public/assets/file/panoramic_4096x2048-sequence-default/0001.png";
        let imageUrlDefault = "/sequence/public/assets/file/panoramic_4096x2048-sequence-default/0001.png";

        if (skybox.photoTexture instanceof BABYLON.Texture) {
            skybox.photoTexture.dispose();
        }

        // skybox.photoTexture = new BABYLON.Texture(imageUrl, scene);
        if (blobUrlArray.length > 0) {
            skybox.photoTexture = new BABYLON.Texture(selectFile, scene);
        }else{
            skybox.photoTexture = new BABYLON.Texture(imageUrlDefault, scene);
        }

        scene.materials.forEach((material) => {
            if (material instanceof BABYLON.StandardMaterial) {
                material.markAsDirty(BABYLON.Material.TextureDirtyFlag);
            }
        });
    }

    return scene
}

export { createElementsGUI };
