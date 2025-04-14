
const CropImage = async (originalCanvas, coordinates, outputImgSize) => {
    // Ensure valid parameters
    if (!originalCanvas || !originalCanvas.getContext || !coordinates) {
        console.error("Invalid parameters for CropImage.");
        return;
    }

    //melakukan set agar crop sesuai canvas
    originalCanvas.width = outputImgSize.width;
    originalCanvas.height = outputImgSize.height;

    const devicePixelRatio = window.devicePixelRatio || 1;

    // Calculate the scaled coordinates for cropping
    const scaledCutLeft = coordinates.cutLeft * devicePixelRatio;
    const scaledCutTop = coordinates.cutTop * devicePixelRatio;
    const scaledCutRight = coordinates.cutRight * devicePixelRatio;
    const scaledCutBottom = coordinates.cutBottom * devicePixelRatio;

    // Create a new canvas for the cropped image
    const croppedCanvas = document.createElement('canvas');
    const ctx = croppedCanvas.getContext('2d');

    // Set the new canvas size to the desired size (1920x1080)
    croppedCanvas.width = outputImgSize.width;
    croppedCanvas.height = outputImgSize.height;

    const sourcewidth = originalCanvas.width - scaledCutLeft - scaledCutRight;
    const sourceheight = originalCanvas.height - scaledCutTop - scaledCutBottom;

    // Draw the cropped image onto the new canvas
    ctx.drawImage(
        originalCanvas,
        scaledCutLeft,  // sourceX
        scaledCutTop,   // sourceY
        sourcewidth,  // sourceWidth
        sourceheight,  // sourceHeight
        0,  // destinationX
        0,  // destinationY
        outputImgSize.width,  // destinationwidth
        outputImgSize.height  // destinationHeight
    );

    const outputCrop = croppedCanvas.toDataURL("image/png");

    // Return the data URL of the cropped image
    return Promise.resolve(outputCrop);
}

/*============================================================================*/

export const generatedImage = async (originalCanvas) => {
    if (!originalCanvas.canvas || !originalCanvas.canvas.toDataURL) {
        console.error("Canvas element is not valid for capturing.");
        return;
    }
    const outputImgSize = {width: 1920, height: 1080}

    // Crop the image using the specified coordinates
    // const cropCoordinates = {cutLeft: 44, cutRight: 46, cutTop: 36, cutBottom: 36}; //jika gunakan browser kecil
    // const cropCoordinates = {cutLeft: 64, cutRight: 66, cutTop: 36, cutBottom: 36}; //jika gunakan browser full
    const cropCoordinates = {cutLeft: 136, cutRight: 142, cutTop: 78, cutBottom: 80}; //jika gunakan browser dan canvas yg bug hitam 1x

    const imageUrl = CropImage(originalCanvas.canvas, cropCoordinates, outputImgSize);

    return {
        imageUrl: imageUrl,
    };
}


/*============================================================================*/

export const CaptureSingleAsArray = async ({ canvasAndEngine, funcAfterCapture }) => {
    const imgUrlArray = [];
    const promises = [];
    let timerId;
    const maxLoop = 3;
    const inputFPS = 6;
    let i = 0;
    
    const iterasi = async () => {
        i++;
        if (i < maxLoop) {
            promises.push(await generatedImage(canvasAndEngine));
            timerId = setTimeout(iterasi, 1000/inputFPS);
        } else {
            i = 0;
            await funcOnStop();
        }
    }

    const Play = async () => {
        if (i >= maxLoop) {
            i = 0;
        }
        await iterasi();
    }

    // const Pause = async () => {
    //     clearTimeout(timerId);
    // }

    // const StopAndReset = async () => {
    //     clearTimeout(timerId);
    //     i = 0;
    //     await funcOnStop();
    // }

    const funcOnStop = async () => {
        //hilangkan array pertama karena bug hitam
        promises.shift();
        // console.log("jumlah promise : ",promises.length);
        
        // Menunggu hingga semua promise selesai dieksekusi
        const images = await Promise.all(promises);

        // Mengumpulkan URL gambar dari hasil yang dihasilkan
        for (const image of images) {
            imgUrlArray.push(image.imageUrl);
        }

        console.log("telah selesai gambar masuk kedalam array");

        // Memanggil fungsi setelah capture dengan array URL gambar
        await funcAfterCapture(imgUrlArray);
    }

    Play();
};


/*============================================================================*/

export const loopAnimationRender = (i, lengthCapture, inputFPS, canvasAndEngine, funcAfterCapture) => {
    let imgUrlArray = [];
    let maxLoop = lengthCapture !== undefined ? lengthCapture : canvasAndEngine.getMostFrame();
    const promises = [];
    let timerId;

    const iterasi = async () => {
        i++;
        if (i < maxLoop) {
            promises.push(await generatedImage(canvasAndEngine));
            timerId = setTimeout(iterasi, 1000/inputFPS);
        } else {
            i = 0;
            await funcOnStop();
        }
    }

    const Play = async () => {
        if (i >= maxLoop) {
            i = 0;
        }
        await iterasi();
    }

    const Pause = async () => {
        clearTimeout(timerId);
    }

    const StopAndReset = async () => {
        clearTimeout(timerId);
        i = 0;
        await funcOnStop();
    }

    const funcOnStop = async () => {
        //hilangkan array pertama karena bug hitam
        promises.shift();
        
        // Menunggu hingga semua promise selesai dieksekusi
        const images = await Promise.all(promises);

        // Mengumpulkan URL gambar dari hasil yang dihasilkan
        for (const image of images) {
            imgUrlArray.push(image.imageUrl);
        }

        console.log("telah selesai gambar masuk kedalam array");

        // Memanggil fungsi setelah capture dengan array URL gambar
        await funcAfterCapture(imgUrlArray);
    }

    return {
        Play: Play,
        Pause: Pause,
        StopAndReset: StopAndReset
    };
}

/*============================================================================*/
