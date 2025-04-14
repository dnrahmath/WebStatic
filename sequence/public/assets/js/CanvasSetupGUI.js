
// Helper  to create buttons
export const createButton = ({labelBtn, labelName}, color, width, height, top, left, onClick) => {
    var button = BABYLON.GUI.Button.CreateSimpleButton(labelBtn);
    button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    button.textBlock.text = labelName !== undefined ? labelName : labelBtn;
    button.onPointerClickObservable.add(() => {
        onClick();
    });
    button.width = width;
    button.height = height;
    button.fontSize = 12;
    button.color =  color;
    
    button.shadowBlur = 10;
    button.shadowColor = "#bbbbbb";
    button.shadowOffsetX = 0;
    button.shadowOffsetY = 0;

    button.top = top;
    button.left = left;
    button.zIndex = 4; //samakan dengan sesama controller

    return button;
}
    
// Helper  to create text
export const createText = (label, color, topPercentage, leftPercentage, fontSize) => {
    var textBlock = new BABYLON.GUI.TextBlock();
    textBlock.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    textBlock.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    textBlock.text = label;
    textBlock.color =  color;
    textBlock.fontSize = fontSize;

    textBlock.shadowBlur = 10;
    textBlock.shadowColor = "#bbbbbb";
    textBlock.shadowOffsetX = 0;
    textBlock.shadowOffsetY = 0;

    textBlock.top = topPercentage + "%";
    textBlock.left = leftPercentage + "%";
    textBlock.zIndex = 3;

    return textBlock;
}

// Helper  to create a centered rectangle
export const createRectangle = (label, color, widthPercentage, heightPercentage) => {
    var rectangle = new BABYLON.GUI.Rectangle(label);
    rectangle.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    rectangle.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    rectangle.width = widthPercentage + "%";
    rectangle.height = heightPercentage + "%";
    rectangle.color =  color;
    rectangle.borderColor =  color;
    
    rectangle.shadowBlur = 10;
    rectangle.shadowColor = "#bbbbbb";
    rectangle.shadowOffsetX = 0;
    rectangle.shadowOffsetY = 0;

    rectangle.background = "transparent";
    rectangle.thickness = 1;
    rectangle.cornerRadius = 0;
    rectangle.zIndex = 2;

    return rectangle;
}

// Helper  to create Slider
export const createSlider = (label, color, leftPercentage, topPercentage, min, max, onChange) => {
    let slider = new BABYLON.GUI.Slider(label);
    slider.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    slider.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    slider.width = "100px";
    slider.height = "12.5px";
    slider.color =  color;
    slider.borderColor = color;
    slider.thumbColor = color;
    
    slider.shadowBlur = 10;
    slider.shadowColor = "#bbbbbb";
    slider.shadowOffsetX = 0;
    slider.shadowOffsetY = 0;

    slider.minimum = min;
    slider.maximum = max;
    slider.value = 1;
    slider.isVertical = false;
    slider.zIndex = 4; //samakan dengan sesama controller

    slider.isThumbClamped = true;
    slider.isPointerBlocker = true;
    
    slider.top = topPercentage + "%";
    slider.left = leftPercentage + "%";
    
    slider.onValueChangedObservable.add(onChange);

    return slider;
}