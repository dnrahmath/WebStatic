import * as CallTheCanvas from './CallTheCanvas.js';
import * as Tools from './Tools.js';
import * as canvastool from './canvastool.js';

const myModalUpload = document.querySelectorAll('div[id="myModalUpload"]')[0];
const idUploadGLB = document.querySelectorAll('input[id="idUploadGLB"]')[0];
const idPNGPanoramic = document.querySelectorAll('input[id="idPNGPanoramic"]')[0];

document.addEventListener("DOMContentLoaded", async () => {
        myModalUpload.style.display = "block";

        const btnShowPanoramicUpload = "btnShowPanoramicUpload";
        const accrClass0 = new Tools.accr;
        document.getElementById(btnShowPanoramicUpload).addEventListener("click", () => {
          accrClass0.accorFunc(btnShowPanoramicUpload,'uploadPNGPanoramicWrap');
        });

        idUploadGLB.addEventListener('change', async (event) => {
            let file = event.target.files[0];
            if (file) {
                const blobUrl = URL.createObjectURL(file);
                try {
                    canvastool.CanvasGLBButtonOnClick(1,1);
                    await CallTheCanvas.ExecuteCanvasGLB(blobUrl);
                    myModalUpload.style.display = "none";
                } catch (error) {
                    console.error("Error executing canvas GLB:", error);
                }
            };
        });

        //bisa langsung jika kosong
        await CallTheCanvas.ExecuteCanvasPanoramic([]);

        idPNGPanoramic.addEventListener('change', async (event) => {
            let files = event.target.files;
            if (files.length > 0) {
                try {
                    const blobUrlArray = [];
                    for (let i = 0; i < files.length; i++) {
                        blobUrlArray.push(URL.createObjectURL(files[i]));
                    }
                    canvastool.CanvasPanoramicButtonOnClick(1,1);
                    await CallTheCanvas.ExecuteCanvasPanoramic(blobUrlArray);
                    myModalUpload.style.display = "none";
                } catch (error) {
                    console.error("Error executing canvas GLB:", error);
                }
            };
        });

        // Mendapatkan semua parameter dari URL
        const allParameters = Tools.getAllParameters();

        // Menampilkan nilai parameter pada halaman
        if (Object.keys(allParameters).length > 0) {
            console.log('<h1>Nilai Semua Parameter:</h1>');
            for (const key in allParameters) {
                console.log(`<p>${key}: ${allParameters[key]}</p>`);
            }
        } else {
            console.log('<h1>Tidak ada parameter yang diterima</h1>')
        }
    }
);

/* ================================================== */
/* ================================================== */
