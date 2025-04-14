import * as CallTheCanvas from './CallTheCanvas.js';
import * as CanvasProcess from "./CanvasProcess.js";
import * as LocalStorage from "./LocalStorage.js";
import * as Tools from './Tools.js';

/*============================================================================*/

//global variable
let jsonData = {src: []};
let currentTime = 0;

//menampilkan modal
const myModalViewImage = document.querySelectorAll('div[id="myModalViewImage"]')[0];
const myModalUpload = document.querySelectorAll('div[id="myModalUpload"]')[0];
const btnSingleCaptureCanvas = document.querySelectorAll('button[id="btnSingleCaptureCanvas"]')[0];
const btnOpenModalImageCapture = document.querySelectorAll('button[id="btnOpenModalImageCapture"]')[0];
const btnOpenModalUpload = document.querySelectorAll('button[id="btnOpenModalUpload"]')[0];
// const btnCanvasReset = document.querySelectorAll('button[id="btnCanvasReset"]')[0];
const Storage = new LocalStorage.ExecuteLocalStorage();

const setOfImages = document.getElementById("setOfImages");
const modalSequenceImage = document.getElementById('modalSequenceImage');

const PrevImgButton = document.getElementById("PrevImgButton");
const NextImgButton = document.getElementById("NextImgButton");
const downloadButton = document.getElementById('downloadButton');

//default init awal
document.addEventListener("DOMContentLoaded", () => {
  PrevImgButton.onclick = () => {
    currentTime = Tools.handlecurrentTimeUpdate(Math.round(currentTime - 1), 0, jsonData.src.length-1);
    modalSequenceImage.src = jsonData.src[currentTime];
    // displaysNotHidden(currentTime); //jika ingin menggunakan element
  };
  NextImgButton.onclick = () => {
    currentTime = Tools.handlecurrentTimeUpdate(Math.round(currentTime + 1), 0, jsonData.src.length-1);
    modalSequenceImage.src = jsonData.src[currentTime];
    // displaysNotHidden(currentTime); //jika ingin menggunakan element
  };
  // Set up the download button with the correct imageUrl
  downloadButton.onclick = () => {
    // CanvasProcess.downloadImage(jsonData.src);
    CanvasProcess.downloadImagesInZip(jsonData.src)
  };
});


btnSingleCaptureCanvas.addEventListener("click", async () => {
  await CallTheCanvas.captureSingleImage();
});

btnOpenModalImageCapture.addEventListener("click", async () => {
  myModalViewImage.style.display = "block";
});

btnOpenModalUpload.addEventListener("click", () => {
  myModalUpload.style.display = "block";
});

// btnCanvasReset.addEventListener("click", async () => {
//   await CallTheCanvas.setSizeToOriginal();
// });

// menutup modal tombol [X]
const span = document.querySelectorAll('span[class="close"]');
for (let i = 0; i < span.length; i++) {
  span[i].addEventListener("click", async () => {
    myModalViewImage.style.display = "none";
    myModalUpload.style.display = "none";
  });;
}

// menutup modal menekan bagian hitam
document.addEventListener("click", async (event) => {
  if (event.target == myModalViewImage) {
    myModalViewImage.style.display = "none";
  }
  if (event.target == myModalUpload) {
    myModalUpload.style.display = "none";
  }
})

/*============================================================================*/

export const setImage = async (imageUrlArray) => {
  const resolvedImageArray = await Promise.all(imageUrlArray);
  jsonData.src = resolvedImageArray;
  await Storage.WriteJSON("modalImageSrc", jsonData);
};

export const setInsideModalViewImage = async () => {
  jsonData = await Storage.ReadJSON("modalImageSrc");
  if (jsonData) {
    modalSequenceImage.src = jsonData.src[currentTime];
    // await deleteAllImages(); //jika ingin menggunakan element
    // await createImages(jsonData.src); //jika ingin menggunakan element
  }
}

/*============================================================================*/

export const setImageGlobalVar = async (imageUrlArray) => {
  const resolvedImageArray = await Promise.all(imageUrlArray);
  jsonData.src = resolvedImageArray;
};

export const setInsideModalViewImageGlobalVar = async () => {
  if (jsonData) {
    modalSequenceImage.src = jsonData.src[currentTime];
    // await deleteAllImages(); //jika ingin menggunakan element
    // await createImages(jsonData.src); //jika ingin menggunakan element
  }
}

/*============================================================================*/
//jika ingin menggunakan element
/*============================================================================*/
const createImages = async (arrayImgUrl) => {
  if (!Array.isArray(arrayImgUrl)) {
      throw new Error('Invalid input: arrayImgUrl should be an array.');
  }
  for (let i = 0; i < arrayImgUrl.length; i++) {
      var imgElement = document.createElement("img");
      imgElement.id = "sequenceImage";
      imgElement.width = 1920;
      imgElement.height = 1080;
      imgElement.src = arrayImgUrl[i];
      if (i != 0) {
        imgElement.style.display = "none";
      }
      setOfImages.appendChild(imgElement);
  }
}

const deleteAllImages = async () => {
  setOfImages.innerHTML = ''; 
}

const displaysNotHidden = async (indexshow) => {
  const sequenceImage = document.querySelectorAll('img[id="sequenceImage"]');
  if (sequenceImage[indexshow]) {
    sequenceImage[indexshow].style.display = "block"; 
  }
  if (sequenceImage[indexshow+1]) {
    sequenceImage[indexshow+1].style.display = "none"; 
  }
  if (sequenceImage[indexshow-1]) {
    sequenceImage[indexshow-1].style.display = "none"; 
  }
}