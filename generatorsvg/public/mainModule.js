import * as hotkeyPackage from "./module/hotkeys.min.js";
import * as svgClass from "./module/svgEngine.js";






//-----------------------------------------------
//menampilkan modal
//const btn = document.getElementById("myBtn");

const btn = document.querySelectorAll('button[id="myBtn"]')[0];
btn.addEventListener("click", () => {
  modal.style.display = "block";
});

// menutup modal tombol [X]
const span = document.querySelectorAll('span[class="close"]')[0];
span.addEventListener("click", () => {
  modal.style.display = "none";
});

// menutup modal menekan bagian hitam
const modal = document.querySelectorAll('div[id="myModal"]')[0];
document.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})
//------------------------------------------------




//------------------------------------------------

//var bollean = false; // default  FAQ
class accr {
  constructor() { 
    this.bollean = true;
   }
  accorFunc = (idbtnName,idTarget) => {
    let btnName = document.getElementById(idbtnName);
    let targetElemen = document.getElementById(idTarget);
    if (this.bollean === true) {
      targetElemen.hidden = false;
      btnName.innerHTML = idbtnName+" : Turn Off";
      this.bollean = false; 
    } else { 
      targetElemen.hidden = true;
      btnName.innerHTML = idbtnName+" : Turn On";
      this.bollean = true;
    }
  };
}


const idBtn0 = "btnAccor0";
const accrClass0 = new accr;
document.getElementById(idBtn0).addEventListener("click", () => {
  accrClass0.accorFunc(idBtn0,'targetAccor0');
});

const idBtn1 = "btnAccor1";
const accrClass1 = new accr;
document.getElementById(idBtn1).addEventListener("click", () => {
  accrClass1.accorFunc(idBtn1,'targetAccor1');
});

const idBtn2 = "btnAccor2";
const accrClass2 = new accr;
document.getElementById(idBtn2).addEventListener("click", () => {
  accrClass2.accorFunc(idBtn2,'targetAccor2');
});

const idBtn3 = "btnAccor3";
const accrClass3 = new accr;
document.getElementById(idBtn3).addEventListener("click", () => {
  accrClass3.accorFunc(idBtn3,'targetAccor3');
});

//------------------------------------------------




//load document pertama kali

document.addEventListener('load', () => {
  const accrClass0 = new accr;
  accrClass0.accorFunc(idBtn0,'targetAccor0'); // mengisi value awal - supaya engga double click
  const accrClass1 = new accr;
  accrClass1.accorFunc(idBtn1,'targetAccor1'); // mengisi value awal - supaya engga double click
  const accrClass2 = new accr;
  accrClass2.accorFunc(idBtn2,'targetAccor2'); // mengisi value awal - supaya engga double click
  const accrClass3 = new accr;
  accrClass3.accorFunc(idBtn3,'targetAccor3'); // mengisi value awal - supaya engga double click


})





//------------------------------------------------

let inpEgain = document.getElementById("inputEgain");
inpEgain.addEventListener("click", (e) => {
  const elmInput = document.querySelectorAll('input[id="idFileInput"]')[0];
  elmInput.value = "";
  const fileNama0 = document.querySelectorAll('div[id="idFileNama"]')[0];
  fileNama0.innerHTML = "";
  //elmInput.click();
});

let file = document.querySelectorAll('input[id="idFileInput"]')[0];
file.addEventListener("change", () => {
  innerValue();
})

//merubah innerisi file
const innerValue = () => {
  let classSvg =  new svgClass.SvgEngine();
  let arrFile = classSvg.getInfoFile(`idFileInput`);
  // ----------------------------------------------------
  //const fileNama = document.querySelector('#idFileNama');
  const fileNama0 = document.querySelectorAll('div[id="idFileNama"]')[0];

  const fileNama1 = document.querySelectorAll('div[id="idFileNama"]')[1];
  const fileSize = document.querySelector('#idFileSize');
  const fileType = document.querySelector('#idFileType');
  const fileModDate = document.querySelector('#idFilelastModifiedDate');
  const fileLength = document.querySelectorAll('div[id="idFileLength"]')[0];

  fileNama0.innerHTML = "";
  for (let i = 0; i < arrFile.length; i++) {
    fileNama0.innerHTML += arrFile[i][0]+"<br>";
  }

  fileNama1.innerHTML = arrFile[0][0];
  fileSize.innerText = arrFile[0][1];
  fileType.innerText = arrFile[0][2];
  fileModDate.innerText = arrFile[0][3];
  
  fileLength.innerText = arrFile.length; 
  // ----------------------------------------------------
  let embed = classSvg.embedVector("idEmbedOut","idEmbed",arrFile);  //menjalankan class
  
}



//membaca file menjadi string
const stringFile = () => {
  const content = document.querySelector('#outputTxt');
  const file = document.querySelectorAll('input[id="idFileInput"]')[0].files;
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    content.innerText = reader.result;
  }, false);
  if (file) {
    reader.readAsText(file[1]);
  }

}
//------------------------------------------------
















//-START-USING-Hotkey------------------------------------------------------------------------------------------------------------------

//isPressed
hotkeys('b', function(event,handler){
  //event.srcElement: input 
  //event.target: input
  if(event.target === "input"){
      alert('you pressed b!')
      console.log(hotkeys.getPressedKeyCodes());
  }
  alert('you pressed b!') 
  console.log(hotkeys.getPressedKeyCodes());
});
//hotkeys.unbind('a');  //disable hotkeys a



var lastB = null; //variabel double click

//keyup
hotkeys('a,w,ctrl+a,alt+a+s,ctrl+s,ctrl+c,ctrl+v', {keyup: true}, function(event, handler) {
  if (event.type === 'keydown') {
    console.log('keydown:', event.type, handler, handler.key);
    console.log('lastButton: ', lastB);
  }

  if (event.type === 'keyup') {
    console.log('keyup:', event.type, handler, handler.key);
    
    if (handler.key === lastB) {                     //membuat jika tombol sembelum === sesudah {ini double click}
      console.log('DoubleClick: ', handler.key);
    }
    
    lastB = handler.key;                    // menyimpan click terakhir (pastikan setelah if else double-click)
    console.log('lastButton: ', lastB);
  }
  
  
  console.log('PressedKeyCodes', hotkeys.getPressedKeyCodes());  //Mendapat kode tombol yg ditekan
});


//https://stackoverflow.com/questions/20372394/how-to-disable-ctrlu-using-javascript
//Disable Ctrl+S Proses

document.onkeydown = function(e) {
            /*
            if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 117 || e.keyCode === 83)) {//Alt+c, Alt+v, Ctrl+s, will also be disabled sadly.
                alert('not allowed');
            } */
            
            /*
            if (e.ctrlKey && (e.keyCode === 87)) {//Ctrl+w , Disable Hotkeys , GAGAL
                return false; //Disable Hotkeys
                alert('not allowed');
            }
            */
            
            if (e.ctrlKey && (e.keyCode === 65)) {//Ctrl+a , Disable Hotkeys
                return false; //Disable Hotkeys
            }
            
            if (e.ctrlKey && (e.keyCode === 67)) {//Ctrl+c , Disable Hotkeys
                return false; //Disable Hotkeys
            }
            
            if (e.ctrlKey && (e.keyCode === 86)) {//Ctrl+v , Disable Hotkeys
                return false; //Disable Hotkeys
            }
            
            if (e.ctrlKey && (e.keyCode === 83)) {//Ctrl+s , Disable Hotkeys
                //alert('not allowed');
                return false; //Disable Hotkeys
            }
            
            //return false; //Disable Hotkeys
};

/*
document.keypress = function(e) {
            event.preventDefault();

            if (event.which == 87 && event.ctrlKey) {
                alert("Ctrl-W pressed");
                return false;
            }  
            
            if (e.ctrlKey && (e.keyCode === 87)) {//Ctrl+w , Disable Hotkeys
                return false; //Disable Hotkeys
                alert('not allowed');
            }  

    return false;
};
*/

/*
document.beforeunload = function(e) {
    if(hasUnsaved()) {
        //return 'You have unsaved stuff. Are you sure you want to leave?';
        alert('not allowed');
    }
    else { alert('not allowed'); }
};
*/

//-END-USING-Hotkey------------------------------------------------------------------------------------------------------------------

