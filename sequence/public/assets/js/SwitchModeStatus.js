import * as Tools from './Tools.js';

const modeRenderButton = document.getElementById("modeRenderButton");
let currentModeRender = 0;
let detectCanvasIsResize = 0;


document.addEventListener("DOMContentLoaded", async () => {
    await Switch();
});

const Switch = async () => {
    modeRenderButton.addEventListener('click', () => {
        currentModeRender = Tools.handlecurrentTimeUpdate(Math.round(currentModeRender + 1), 0, 1);
        perbaruiStatus();
    });
}

const perbaruiStatus = () => {
    if (currentModeRender == 0) {
        modeRenderButton.innerHTML = "[ Mode Render, when You Click Canvas - Play : OFF ]";
    } else {
        modeRenderButton.innerHTML = "[ Mode Render, when You Click Canvas - Play : ON ]";
    }
};

export const getCurrentModeRender = ({ numbIsChange } = {}) => {
    currentModeRender = numbIsChange !== undefined ? numbIsChange : currentModeRender;
    perbaruiStatus();
    return currentModeRender;
}

export const getDetectCanvasIsResize = ({ numbIsChange } = {}) => {
    detectCanvasIsResize = numbIsChange !== undefined ? numbIsChange : detectCanvasIsResize;
    return detectCanvasIsResize;
}