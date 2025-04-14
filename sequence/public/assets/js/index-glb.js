// app.js
document.getElementById('glbFileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
  const file = event.target.files[0];

  if (file) {
    const blobUrl = URL.createObjectURL(file);
    try {
      initBabylonScene(blobUrl);
    } catch (error) {
      console.error("Error initializing Babylon scene:", error);
    }
  }
}

function initBabylonScene(blobUrl) {
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);

  const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // Add camera
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 5, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // Use the GLTF loader for GLB files
    BABYLON.SceneLoader.Append("", blobUrl, scene, function (scene) {
      // Code to manipulate the imported model
      console.log("Model imported successfully");
    }, undefined, undefined, ".glb");

    scene.onReadyObservable.addOnce(function () {
      // This code will execute when the scene is ready
      console.log("Scene is ready");

      // Additional code for scene manipulations, if needed
    });

    return scene;
  };

  const scene = createScene();

  engine.runRenderLoop(function () {
    if (scene) {
      scene.render();
    }
  });

  window.addEventListener('resize', function () {
    engine.resize();
  });
}
