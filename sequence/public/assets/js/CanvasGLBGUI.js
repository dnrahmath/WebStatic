// CanvasGLBGUI.js
import 'https://cdn.babylonjs.com/babylon.js';
import 'https://cdn.babylonjs.com/gui/babylon.gui.min.js';
import * as CanvasSetupGUI from './CanvasSetupGUI.js';
import * as CanvasProcess from './CanvasProcess.js';
import * as Tools from './Tools.js';
import * as SwitchModeStatus from './SwitchModeStatus.js';
import * as CallTheCanvas from './CallTheCanvas.js';

const sectionCanvas = document.getElementById('sectionCanvas');
const renderCanvasGLB = sectionCanvas.querySelector('#renderCanvasGLB');

const createElementsGLBGUI = (scene, animationGroups, mostFrame, inputFPS) => {
    /*============================================================================*/
    let currentFrame = 0;
    let currentCamera = 0;
    
    let ARR_MODE_CHANGE = [
        "FRAME",
        "CAMERA"
    ];
    let modeActiveNumb = 0;
    let modePlayNumb = 0;

    renderCanvasGLB.addEventListener("click", async () => {
        if (SwitchModeStatus.getCurrentModeRender() == 1) {
            iterasiHandlerRender.Play();
        }
        if (SwitchModeStatus.getDetectCanvasIsResize() == 1) {
            await CallTheCanvas.setSizeToOriginal();
            console.log("canvas ukuran di reset");
            SwitchModeStatus.getDetectCanvasIsResize({numbIsChange : 0});
        }
    });

    const iterasiHandler = CanvasProcess.loopAnimation(currentFrame, mostFrame, inputFPS,
            (i,jumlahIterasiInside) => {
                setCurrentFrame(Tools.handlecurrentTimeUpdate(Math.round(i + 1), 0, jumlahIterasiInside));
                updateAnimation();
        },
            () => {
                setCurrentFrame(0);
                resetButtonPlay();
        },
    );

    const iterasiHandlerRender = CallTheCanvas.captureMultiplyImage(currentFrame, mostFrame, inputFPS);


    scene.activeCamera = scene.cameras[currentCamera];

    // Create AdvancedDynamicTexture for GUI
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("gui", true, scene);
    advancedTexture.alpha = 0.01;

    /*============================================================================*/

    // Create View Text Number
    let textBlockView = CanvasSetupGUI.createText("View", "#673ab7", 46, -23, 15);
    const updateViewText = () => {
        if (modeActiveNumb == 0) {
            textBlockView.text = "Frame" + ": " + currentFrame;
        } else if (modeActiveNumb == 1) {
            textBlockView.text = "Camera" + ": " + currentCamera;
        }
    }
    scene.onBeforeRenderObservable.add(updateViewText);
    advancedTexture.addControl(textBlockView);

    // Create Slider
    let slider1 = CanvasSetupGUI.createSlider("scroll", "#673ab7", 33, 95, 0, mostFrame,  (value) => {
        setCurrentFrame(Tools.handlecurrentTimeUpdate(Math.round(value), 0, mostFrame));
        updateAnimation();
    });
    advancedTexture.addControl(slider1);

    // Create Prev Button
    let btnPrev = CanvasSetupGUI.createButton({labelBtn:"Prev", labelName:"Prev "+ARR_MODE_CHANGE[modeActiveNumb]}, "#673ab7", "85px", "25px", "94%", "1%",  () => {
        if (modeActiveNumb == 0) {
            PrevFrame();
        } else if (modeActiveNumb == 1) {
            PrevCamera();
        }
    });
    advancedTexture.addControl(btnPrev);

    // Create Next Button
    let btnNext = CanvasSetupGUI.createButton({labelBtn:"Next", labelName:"Next "+ARR_MODE_CHANGE[modeActiveNumb]}, "#673ab7", "85px", "25px", "94%", "12%",  () => {
        if (modeActiveNumb == 0) {
            NextFrame();
        } else if (modeActiveNumb == 1) {
            NextCamera();
        }
    });
    advancedTexture.addControl(btnNext);
    
    // Create StopAndPlay Button
    let btnRenderStopAndPlay = CanvasSetupGUI.createButton({labelBtn:"StopAndPlay",labelName:"Play"}, "#673ab7", "60px", "35px", "93.25%", "60%",  () => {
        modePlayNumb = Tools.handlecurrentTimeUpdate(Math.round(modePlayNumb + 1), 0, 1);
        if (modePlayNumb === 0) {
            iterasiHandler.StopAndReset();
            btnRenderPauseAndPlay.textBlock.text = "Play";
            btnRenderStopAndPlay.textBlock.text = "Play";
        } else if (modePlayNumb === 1) {
            iterasiHandler.Play();
            btnRenderPauseAndPlay.textBlock.text = "Pause";
            btnRenderStopAndPlay.textBlock.text = "Stop And Reset";
        }
    });
    advancedTexture.addControl(btnRenderStopAndPlay);
    
    // Create PauseAndPlay Button
    let btnRenderPauseAndPlay = CanvasSetupGUI.createButton({labelBtn:"PauseAndPlay",labelName:"Play"}, "#673ab7", "60px", "35px", "93.25%", "67.5%",  () => {
        modePlayNumb = Tools.handlecurrentTimeUpdate(Math.round(modePlayNumb + 1), 0, 1);
        if (modePlayNumb === 0) {
            iterasiHandler.Pause();
            btnRenderPauseAndPlay.textBlock.text = "Play";
            btnRenderStopAndPlay.textBlock.text = "Play";
        } else if (modePlayNumb === 1) {
            iterasiHandler.Play();
            btnRenderPauseAndPlay.textBlock.text = "Pause";
            btnRenderStopAndPlay.textBlock.text = "Stop And Reset";
        }
    });
    advancedTexture.addControl(btnRenderPauseAndPlay);

    const resetButtonPlay = () => {
        modePlayNumb = 0
        btnRenderPauseAndPlay.textBlock.text = "Play";
        btnRenderStopAndPlay.textBlock.text = "Play";
    };
    
    // Create ChangeMode Button
    let btnChangeMode = CanvasSetupGUI.createButton({labelBtn:"ARR_MODE",labelName:ARR_MODE_CHANGE[modeActiveNumb]}, "#673ab7", "70px", "35px", "93.25%", "75%",  () => {
        ChangeMode();
    });
    advancedTexture.addControl(btnChangeMode);

    // Create centered rectangle
    let rect1 = CanvasSetupGUI.createRectangle("CenteredRect", "#673ab7", 86, 86);
    advancedTexture.addControl(rect1);
    let txt1 = CanvasSetupGUI.createText("1920x1080", "#673ab7", 45, 38, 15);
    advancedTexture.addControl(txt1);

    // Coordinate labels
    let txt2 = CanvasSetupGUI.createText("X1", "#673ab7", 0, -45, 15);
    advancedTexture.addControl(txt2);
    let txt3 = CanvasSetupGUI.createText("Y1", "#673ab7", -46, 0, 15);
    advancedTexture.addControl(txt3);
    let txt4 = CanvasSetupGUI.createText("X2", "#673ab7", 0, 45, 15);
    advancedTexture.addControl(txt4);
    let txt5 = CanvasSetupGUI.createText("Y2", "#673ab7", 46, 0, 15);
    advancedTexture.addControl(txt5);

    /*============================================================================*/

    const ChangeMode = (valueNumb) => {
        if (valueNumb !== undefined) {
            modeActiveNumb = valueNumb;
        } else {
            modeActiveNumb = Tools.handlecurrentTimeUpdate(Math.round(modeActiveNumb + 1), 0, ARR_MODE_CHANGE.length - 1);
        }
        btnPrev.textBlock.text = "Prev "+ARR_MODE_CHANGE[modeActiveNumb];
        btnNext.textBlock.text = "Next "+ARR_MODE_CHANGE[modeActiveNumb];
        btnChangeMode.textBlock.text = ARR_MODE_CHANGE[modeActiveNumb];
    }

    const PrevFrame = () => {
        setCurrentFrame(Tools.handlecurrentTimeUpdate(Math.round(currentFrame - 1), 0, mostFrame));
        updateAnimation();
        ChangeMode(0);
    }

    const NextFrame = () => {
        setCurrentFrame(Tools.handlecurrentTimeUpdate(Math.round(currentFrame + 1), 0, mostFrame));
        updateAnimation();
        ChangeMode(0);
    }

    const PrevCamera = () => {
        currentCamera = Tools.handlecurrentTimeUpdate(Math.round(currentCamera - 1), 0, scene.cameras.length-1);
        scene.activeCamera = scene.cameras[currentCamera];
        ChangeMode(1);
    }

    const NextCamera = () => {
        currentCamera = Tools.handlecurrentTimeUpdate(Math.round(currentCamera + 1), 0, scene.cameras.length-1);
        scene.activeCamera = scene.cameras[currentCamera];
        ChangeMode(1);
    }

    /*============================================================================*/

    const setCurrentFrame = (newVal) => {
        updateViewText();
        currentFrame = newVal;
        slider1.value = newVal;
    }

    const updateAnimation = () => {
        updateViewText();
        animationGroups.forEach((AnmGroup) => {
            AnmGroup.start();
            AnmGroup.goToFrame(currentFrame);
            AnmGroup.pause();
        });
    }


    // Add shortcut onKeyUp
    scene.onKeyboardObservable.add((KeyEvnt) => {
        let keyPrevFrame = ["C","c"];
        let keyNextFrame = ["V","v"];
        let keyPrevCamera = ["<",","];
        let keyNextCamera = [">","."];
        let keyMode = ["M","m"]; //spacebar
        switch (KeyEvnt.type) {
          case BABYLON.KeyboardEventTypes.KEYDOWN:
            for (let i = 0; i < keyPrevFrame.length; i++) {
                if (KeyEvnt.event.key === keyPrevFrame[i]) {
                    PrevFrame();
                }
            }
            for (let i = 0; i < keyNextFrame.length; i++) {
                if (KeyEvnt.event.key === keyNextFrame[i]) {
                    NextFrame();
                }
            }
            for (let i = 0; i < keyPrevCamera.length; i++) {
                if (KeyEvnt.event.key === keyPrevCamera[i]) {
                    PrevCamera();
                }
            }
            for (let i = 0; i < keyNextCamera.length; i++) {
                if (KeyEvnt.event.key === keyNextCamera[i]) {
                    NextCamera();
                }
            }
            for (let i = 0; i < keyMode.length; i++) {
                if (KeyEvnt.event.key === keyMode[i]) {
                    ChangeMode();
                }
            }
            break;
        }
    });
    
    
    /*============================================================================*/


    return scene;
}

export { createElementsGLBGUI };