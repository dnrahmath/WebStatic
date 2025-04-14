
export const CanvasCameraWalk = (scene,canvas) => {
    //Add the camera, to be shown as a cone and surrounding collision volume
    let camera = new BABYLON.UniversalCamera("MyCamera", new BABYLON.Vector3(0, 1, 0), scene);
    camera.minZ = 0.0001;
    camera.attachControl(canvas, true);
    camera.speed = 0.0025;
    camera.angularSpeed = 0.0085;
    camera.angle = Math.PI/2;
    camera.direction = new BABYLON.Vector3(Math.cos(camera.angle), 0, Math.sin(camera.angle));
    
    // //Add viewCamera that gives first person shooter view
    // let viewCamera = new BABYLON.UniversalCamera("viewCamera", new BABYLON.Vector3(0, 3, -3), scene);
    // viewCamera.parent = camera;
    // viewCamera.setTarget(new BABYLON.Vector3(0, -0.0001, 1));
    
    // //Activate both cameras
    // // scene.activeCameras.push(viewCamera);
    // // scene.activeCameras.push(camera);

    // //Add two viewports
    // // camera.viewport = new BABYLON.Viewport(0, 0.5, 1.0, 0.5);
    // viewCamera.viewport = new BABYLON.Viewport(0, 0, 1.0, 0.5);  
    
    
    // /* Set Up Scenery 
    // _____________________*/

    // //Ground
    // let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 20}, scene);
    // ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    // ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    // ground.material.backFaceCulling = false;

    // let lowerGround = ground.clone("lowerGround");
    // lowerGround.scaling.x = 4;
    // lowerGround.scaling.z = 4;
    // lowerGround.position.y = -16;
    // lowerGround.material = ground.material.clone("lowerMat");
    // lowerGround.material.diffuseColor = new BABYLON.Color3(0, 1, 0);


    //Gravity and Collisions Enabled
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    scene.collisionsEnabled = true;

    camera.checkCollisions = true;
    camera.applyGravity = false;

    // //Agar ada posisi sphare red
    // camera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
    // camera.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0); 

    //Create Visible Ellipsoid around camera
    let a = 0.5;
    let b = 1;
    let points = [];
    for(let theta = -Math.PI/2; theta < Math.PI/2; theta += Math.PI/36) {
        points.push(new BABYLON.Vector3(0, b * Math.sin(theta), a * Math.cos(theta)));
    }

    // //Agar ada posisi sphare red
    // let ellipse = [];
    // ellipse[0] = BABYLON.MeshBuilder.CreateLines("e", {points:points}, scene);
    // ellipse[0].color = BABYLON.Color3.Red();
    // ellipse[0].parent = camera;
    // ellipse[0].rotation.y = 5 * Math.PI/ 16;
    // for(let i = 1; i < 23; i++) {
    //         ellipse[i] = ellipse[0].clone("el" + i);
    //         ellipse[i].parent = camera;
    //         ellipse[i].rotation.y = 5 * Math.PI/ 16 + i * Math.PI/16;
    // }
    
    /* New Input Management for Camera
    __________________________________*/
    
    //First remove the default management.
    camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
    camera.inputs.removeByType("FreeCameraMouseInput");
     
    //Key Input Manager To Use Keys to Move Forward and BackWard and Look to the Left or Right
    class FreeCameraKeyboardWalkInput {
        constructor() {
            this._keys = [];

            //Control Position
            this.keysLocForward = [87]; // W key
            this.keysLocBackward = [83]; // S key
            this.keysLocLeft = [65]; // A key
            this.keysLocRight = [68]; // D key
            this.keysLocUpward = [81]; // Q key
            this.keysLocDownward = [69]; // E key


            //Control Rotate
            this.keysRotLeft = [70]; // F key
            this.keysRotRight = [72]; // H key
            this.keysRotUpward = [84]; // T key
            this.keysRotDownward = [71]; // G key
        }
        //Add attachment controls
        attachControl(noPreventDefault) {
            let _this = this;
            let engine = this.camera.getEngine();
            let element = engine.getInputElement();
            if (!this._onKeyDown) {
                element.tabIndex = 1;
                this._onKeyDown = (evt) => {
                    if (_this.keysLocForward.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLocBackward.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLocLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLocRight.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLocUpward.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLocDownward.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRotLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRotRight.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRotUpward.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRotDownward.indexOf(evt.keyCode) !== -1) {
                        let index = _this._keys.indexOf(evt.keyCode);
                        if (index === -1) {
                            _this._keys.push(evt.keyCode);
                        }
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                };
                this._onKeyUp = (evt) => {
                    if (_this.keysLocForward.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLocBackward.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLocLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLocRight.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLocUpward.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLocDownward.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRotLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRotRight.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRotUpward.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRotDownward.indexOf(evt.keyCode) !== -1) {
                        let index = _this._keys.indexOf(evt.keyCode);
                        if (index >= 0) {
                            _this._keys.splice(index, 1);
                        }
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                };
                element.addEventListener("keydown", this._onKeyDown, false);
                element.addEventListener("keyup", this._onKeyUp, false);
            }
        }
        //Add detachment controls
        detachControl() {
            let engine = this.camera.getEngine();
            let element = engine.getInputElement();
            if (this._onKeyDown) {
                element.removeEventListener("keydown", this._onKeyDown);
                element.removeEventListener("keyup", this._onKeyUp);
                BABYLON.Tools.UnregisterTopRootEvents(canvas, [
                    { name: "blur", handler: this._onLostFocus }
                ]);
                this._keys = [];
                this._onKeyDown = null;
                this._onKeyUp = null;
            }
        }
        //Keys movement control by checking inputs
        checkInputs() {
            if (this._onKeyDown) {
                let camera = this.camera;
                for (let index = 0; index < this._keys.length; index++) {
                    let keyCode = this._keys[index];
                    let speed = camera.speed;
                    if (this.keysLocForward.indexOf(keyCode) !== -1) {
                        camera.direction.copyFromFloats(0, 0, speed);
                    } else if (this.keysLocBackward.indexOf(keyCode) !== -1) {
                        camera.direction.copyFromFloats(0, 0, -speed);
                    } else if (this.keysLocRight.indexOf(keyCode) !== -1) {
                        camera.direction.copyFromFloats(speed, 0, 0);
                    } else if (this.keysLocLeft.indexOf(keyCode) !== -1) {
                        camera.direction.copyFromFloats(-speed, 0, 0);
                    } else if (this.keysLocUpward.indexOf(keyCode) !== -1) {
                        camera.direction.copyFromFloats(0, speed, 0);
                    } else if (this.keysLocDownward.indexOf(keyCode) !== -1) {
                        camera.direction.copyFromFloats(0, -speed, 0);
                    } else if (this.keysRotRight.indexOf(keyCode) !== -1) {
                        camera.rotation.y += camera.angularSpeed;
                        camera.direction.copyFromFloats(0, 0, 0);
                    } else if (this.keysRotLeft.indexOf(keyCode) !== -1) {
                        camera.rotation.y -= camera.angularSpeed;
                        camera.direction.copyFromFloats(0, 0, 0);
                    } else if (this.keysRotUpward.indexOf(keyCode) !== -1) {
                        camera.rotation.x -= camera.angularSpeed;
                        camera.direction.copyFromFloats(0, 0, 0);
                    } else if (this.keysRotDownward.indexOf(keyCode) !== -1) {
                        camera.rotation.x += camera.angularSpeed;
                        camera.direction.copyFromFloats(0, 0, 0);
                    }
                    if (camera.getScene().useRightHandedSystem) {
                        camera.direction.z *= -1;
                    }
                    camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
                    BABYLON.Vector3.TransformNormalToRef(camera.direction, camera._cameraTransformMatrix, camera._transformedDirection);
                    camera.cameraDirection.addInPlace(camera._transformedDirection);
                }
            }
        }
        //Add the onLostFocus function
        _onLostFocus(e) {
            this._keys = [];
        }
        //Add the two required functions for the control Name
        getClassName() {
            return "FreeCameraKeyboardWalkInput";
        }
        getSimpleName() {
            return "keyboard";
        }
    }
    



    
    
    //Add the new keys input manager to the camera.
    camera.inputs.add(new FreeCameraKeyboardWalkInput());



    //The Mouse Manager to use the mouse (touch) to search around including above and below
    class FreeCameraSearchInput {
        constructor(touchEnabled) {
            if (touchEnabled === void 0) { touchEnabled = true; }
            this.touchEnabled = touchEnabled;
            this.buttons = [0, 1, 2];
            this.angularSensibility = 2000.0;
            this.restrictionX = 100;
            this.restrictionY = 60;
        }
        //add attachment control which also contains the code to react to the input from the mouse 
        attachControl(noPreventDefault) {
            let _this = this;
            let engine = this.camera.getEngine();
            let element = engine.getInputElement();
            let angle = { x: 0, y: 0 };
            if (!this._pointerInput) {
                this._pointerInput = (p, s) => {
                    let evt = p.event;
                    if (!_this.touchEnabled && evt.pointerType === "touch") {
                        return;
                    }
                    if (p.type !== BABYLON.PointerEventTypes.POINTERMOVE && _this.buttons.indexOf(evt.button) === -1) {
                        return;
                    }
                    if (p.type === BABYLON.PointerEventTypes.POINTERDOWN) {
                        try {
                            evt.srcElement.setPointerCapture(evt.pointerId);
                        }
                        catch (e) {
                            //Nothing to do with the error. Execution will continue.
                        }
                        _this.previousPosition = {
                            x: evt.clientX,
                            y: evt.clientY
                        };
                        if (!noPreventDefault) {
                            evt.preventDefault();
                            element.focus();
                        }
                    }
                    else if (p.type === BABYLON.PointerEventTypes.POINTERUP) {
                        try {
                            evt.srcElement.releasePointerCapture(evt.pointerId);
                        }
                        catch (e) {
                            //Nothing to do with the error.
                        }
                        _this.previousPosition = null;
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                    else if (p.type === BABYLON.PointerEventTypes.POINTERMOVE) {
                        if (!_this.previousPosition || engine.isPointerLock) {
                            return;
                        }
                        let offsetX = evt.clientX - _this.previousPosition.x;
                        let offsetY = evt.clientY - _this.previousPosition.y;
                        angle.x += offsetX;
                        angle.y -= offsetY;
                        if (Math.abs(angle.x) > _this.restrictionX) {
                            angle.x -= offsetX;
                        }
                        if (Math.abs(angle.y) > _this.restrictionY) {
                            angle.y += offsetY;
                        }
                        if (_this.camera.getScene().useRightHandedSystem) {
                            if (Math.abs(angle.x) < _this.restrictionX) {
                                _this.camera.cameraRotation.y -= offsetX / _this.angularSensibility;
                            }
                        }
                        else {
                            if (Math.abs(angle.x) < _this.restrictionX) {
                                _this.camera.cameraRotation.y += offsetX / _this.angularSensibility;
                            }
                        }
                        if (Math.abs(angle.y) < _this.restrictionY) {
                            _this.camera.cameraRotation.x += offsetY / _this.angularSensibility;
                        }
                        _this.previousPosition = {
                            x: evt.clientX,
                            y: evt.clientY
                        };
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                };
            }
            this._onSearchMove = (evt) => {
                if (!engine.isPointerLock) {
                    return;
                }
                let offsetX = evt.movementX || evt.mozMovementX || evt.webkitMovementX || evt.msMovementX || 0;
                let offsetY = evt.movementY || evt.mozMovementY || evt.webkitMovementY || evt.msMovementY || 0;
                if (_this.camera.getScene().useRightHandedSystem) {
                    _this.camera.cameraRotation.y -= offsetX / _this.angularSensibility;
                }
                else {
                    _this.camera.cameraRotation.y += offsetX / _this.angularSensibility;
                }
                _this.camera.cameraRotation.x += offsetY / _this.angularSensibility;
                _this.previousPosition = null;
                if (!noPreventDefault) {
                    evt.preventDefault();
                }
            };
            this._observer = this.camera.getScene().onPointerObservable.add(this._pointerInput, BABYLON.PointerEventTypes.POINTERDOWN | BABYLON.PointerEventTypes.POINTERUP | BABYLON.PointerEventTypes.POINTERMOVE);
            element.addEventListener("mousemove", this._onSearchMove, false);
        }
        //Add detachment control
        detachControl() {
            let engine = this.camera.getEngine();
            let element = engine.getInputElement();
            if (this._observer && element) {
                this.camera.getScene().onPointerObservable.remove(this._observer);
                element.removeEventListener("mousemove", this._onSearchMove);
                this._observer = null;
                this._onSearchMove = null;
                this.previousPosition = null;
            }
        }
        //Add the two required functions for names
        getClassName() {
            return "FreeCameraSearchInput";
        }
        getSimpleName() {
            return "MouseSearchCamera";
        }
    }





    //Add the new mouse input manager to the camera
    camera.inputs.add(new FreeCameraSearchInput());

    return scene;

}

