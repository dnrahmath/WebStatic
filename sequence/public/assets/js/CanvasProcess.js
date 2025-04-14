import 'https://cdn.jsdelivr.net/npm/jszip/dist/jszip.min.js';

/*============================================================================*/

export const loopAnimation = (i, jumlahIterasiInside, inputFPS, funcOnIterasi, funcOnStop) => {
    let timerId;

    const iterasi = () => {
        i++;
        if (i < jumlahIterasiInside) {
            funcOnIterasi(i,jumlahIterasiInside);
            timerId = setTimeout(iterasi, 1000/inputFPS);
        } else {
            i = 0;
            funcOnStop();
        }
    }

    const Play = () => {
        if (i >= jumlahIterasiInside) {
            i = 0;
        }
        iterasi();
    }

    const Pause = () => {
        clearTimeout(timerId);
    }

    const StopAndReset = () => {
        clearTimeout(timerId);
        i = 0;
        funcOnStop();
    }

    return {
        Play: Play,
        Pause: Pause,
        StopAndReset: StopAndReset
    };
}

/*============================================================================*/

export const downloadImage =  (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = "LayerEnv-Frame0001.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Fungsi untuk mendownload gambar-gambar dalam format zip
export const downloadImagesInZip = async (imageUrls) => {
    const zip = new window.JSZip();
    try {
        // Ensure imageUrls is an array
        if (!Array.isArray(imageUrls)) {
            throw new Error('Invalid input: imageUrls should be an array.');
        }
        // Menggunakan Promise.all untuk menunggu semua fetch selesai
        await Promise.all(imageUrls.map(async (imageUrl, i) => {
            const fileName = `Frame${i + 1}.png`;
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            zip.file(fileName, blob);
        }));

        // Generate file zip setelah semua file ditambahkan
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        // Buat link untuk mendownload file zip
        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        link.download = 'downloadedImages.zip';

        // Menambahkan link ke dalam body dan mengkliknya untuk memulai pengunduhan
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error occurred while creating zip file:', error.message);
    }
};
