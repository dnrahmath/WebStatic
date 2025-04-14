export class SvgEngine {
  constructor() {
    //super(brand);
    this.svgEngine = "mod";
    this.ArrFile = [];
    this.result;

    this.infoArrFile = [];
    this.resultFile;
    this.embedI;

    this.getInfoFile.bind(this);
    this.embedVector.bind(this);

    this.plusAnim = [];
    this.digabung = "";
    this.fullfile = "";
  }


  getInfoFile = (idInput) => {
    let selector = 'input[id="'+idInput+'"]';
    let getElm = document.querySelectorAll(selector)[0];
    let file = getElm.files;

    //file nama nampilin banyak
    for(let i=0; i<file.length; i++ ) {
      this.infoArrFile.push( [] );
      
      this.infoArrFile[i][0] = file[i].name;
      this.infoArrFile[i][1] = file[i].size;
      this.infoArrFile[i][2] = file[i].type;
      this.infoArrFile[i][3] = file[i].lastModifiedDate;
      this.infoArrFile[i][4] = file[i];

      //console.log("ukuran :"+file.length);
      //console.log("ukuran this.infoArrFile :"+this.infoArrFile.length);
      //console.log("0 :"+this.infoArrFile[i][0]);
      //console.log("1 :"+this.infoArrFile[i][1]);
      //console.log("2 :"+this.infoArrFile[i][2]);
      //console.log("3 :"+this.infoArrFile[i][3]);
      //console.log("4 dataImg :"+this.infoArrFile[i][4]);
    }
    return this.infoArrFile;
  }


// -------------
  embedVector = (targetEmbedOut,targetEmbed,embedArr) => {

    if (embedArr[0][2] != "image/svg+xml" ) {
      console.log("ini bukan file vector : "+embedArr[0][2]);
    } else {
      
      this.embedI = 0;
      this.resultFile = [];
      while (this.embedI < embedArr.length) {
        this.funcRead(this.embedI,embedArr,targetEmbed,targetEmbedOut);  //pengulangan Read File
        this.embedI = this.embedI + 1;
      }
    }
  }

  funcRead = (i,embedArr,targetEmbed,targetEmbedOut) => {
    let fR = new FileReader();
    fR.readAsText(embedArr[i][4]);
    fR.addEventListener('load', (event) => {

      //ditempel---
      let emd = document.getElementById(targetEmbed);
      this.resultFile += `<div id="file`+i+`">`+event.target.result+`</div>`;
      emd.innerHTML = this.resultFile;

      //ditempelOut---
      let emdOut = document.getElementById(targetEmbedOut);
      //dijadikan 1 file
      if(document.getElementById(`file`+i) != null){ //sering engga ditemukan
        // ---
        let elemIdChild = document.getElementById("file"+i).children[0];
        let getInner = `<g>`+elemIdChild.innerHTML+`</g>`;
        
        let elmAnm;
        let bfore = i - 1;
        if (bfore < 0) {
          elmAnm = `<animate
                    id="frame`+i+`"
                    attributeName="display"
                    values="none;none;inline;none"
                    keyTimes="0;0.33;0.66;1"
                    dur="`+embedArr.length+`s"
                    begin="0s"
                    repeatCount="indefinite" />`;
        } else {
          elmAnm =  `<animate
                    id="frame`+i+`"
                    attributeName="display"
                    values="none;none;inline;none"
                    keyTimes="0;0.33;0.66;1"
                    dur="`+embedArr.length+`s"
                    begin="frame`+bfore+`.begin+1s"
                    repeatCount="indefinite" />`;
        }
        this.plusAnim[i] = `<g>`+getInner+elmAnm+`</g>`; //gagal terinput

        // --- dilengkapi
        const valHeight = document.querySelectorAll('input[id="nmHeight"]')[0].value;
        const valWidth = document.querySelectorAll('input[id="nmWidth"]')[0].value;

        this.digabung += this.plusAnim[i];
        this.fullfile = `<svg id="svg-play" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="`+valWidth+`" height="`+valHeight+`" >`
                        +this.digabung+
                        `</svg>`;
        // ---

        let arrLast = embedArr.length-1; 
        if (i != arrLast) {
        } else {//jika sudah sampai array terakhir
          const d = new Date();
          const tgl = d.getTime()+"Q";
          let link = document.createElement('a');
          link.download = tgl+embedArr[0][0];//+'.svg' [file svg ini]
          let blob = new Blob([this.fullfile], {type: 'image/svg+xml'});
          let reader = new FileReader();
          reader.readAsDataURL(blob); // converts the blob to base64 and calls onload

          reader.onload = () => {
            link.href = reader.result; // data url
            link.click();
            emdOut.innerHTML = this.fullfile;
          };
        }
        // ---
        

      }

    }) //akhir - onload
    
  }
// -------------



  stringSvg(){
    //const outputTxt = document.getElementById(id);  //melihat gambar yg didalam array 0
    
    const readerDua = new FileReader();
    readerDua.addEventListener('load', event => { //diberi event -> Load File, src diupdate mengarah ke ke Array File
      this.result = "test";
      //outputTxt.innerHTML = event.target.result;
    }, false); 
    readerDua.readAsText(this.ArrFile[0]);     //Array File dibaca lalu dijadikan URL

    console.log("data Console stringSvg() : "+this.result);
    
    return this.result;
  }



  downloadTypeTxt(){
    let link = document.createElement('a');
    link.download = 'hello.svg';

    let svgData = `<svg version="1.1" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <path d="m110.7 174.04c-29.701 4.874-12.369 48.005-6.96 65.518 2.137 6.92 7.056 11.866 10.626 18 11.706 20.112 32.439 34.587 52.334 45.514 14.732 8.091 27.634 14.153 45 11.021 11.112-2.003 29.085-6.905 37.999-13.925 13.425-10.574 22.8-32.486 27.001-48.61 4.016-15.414 11.307-43.173-13-45.66-15.107-1.545-19.872 13.048-22.499 24.66-2.506 11.076-5.831 28.613-14.891 36.436-3.335 2.879-9.486 3.781-13.61 5.221-5.524 1.928-11.165 4.639-17 2.268-20.526-8.339-46.024-28.001-54.773-48.925-6.354-15.195-4.968-55.663-30.227-51.518z" fill="#0df598"/>
   </svg>`;

    //svg file
    let blob = new Blob([svgData], {type: 'image/svg+xml'});

    let reader = new FileReader();
    reader.readAsDataURL(blob); // converts the blob to base64 and calls onload

    reader.onload = function() {
      link.href = reader.result; // data url
      link.click();
    };

    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
    console.log("data Array 0 : "+this.ArrFile[0]);  //this.ArrFile[0] melihat array ke 0
    const outputArr = document.getElementById('outputArr');  //melihat gambar yg didalam array 0
    outputArr.src = "";

    const readerDua = new FileReader();
    readerDua.readAsDataURL(this.ArrFile[0]);     //Array File dibaca lalu dijadikan URL
    readerDua.addEventListener('load', event => { //Ketika Load File, src diupdate mengarah ke ke Array File
      outputArr.src = event.target.result;
    });  

  }





  download_image(){
    var canvas = document.getElementById("idcanvas");
    image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    var link = document.createElement('a');
    link.download = "my-image.png";
    link.href = image;
    link.click();
  }


  
}
