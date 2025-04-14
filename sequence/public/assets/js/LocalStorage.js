export class ExecuteLocalStorage {
    // Constructor untuk menetapkan kunci penyimpanan lokal
    constructor() {
        this.localStorageKey = "myLocalStorageData";
    }

    // Fungsi untuk menulis objek JSON ke localStorage
    WriteJSON = async (key, data) => {
        try {
            // Convert objek JSON ke dalam bentuk string sebelum disimpan
            const dataString = JSON.stringify(data);

            // Simpan data ke dalam localStorage dengan nama kunci tertentu
            localStorage.setItem(key, dataString);

            console.log(`Data JSON berhasil ditulis ke localStorage dengan kunci: ${key}`);
        } catch (error) {
            console.error(`Gagal menulis data JSON ke localStorage dengan kunci: ${key}`, error);
        }
    }

    // Fungsi untuk membaca objek JSON dari localStorage
    ReadJSON = async (key) =>{
        try {
            // Ambil data dari localStorage berdasarkan kunci
            const storedDataString = localStorage.getItem(key);

            if (storedDataString) {
                // Jika data ditemukan, convert kembali dari string ke objek JSON
                const storedJSON = JSON.parse(storedDataString);
                console.log(`Data JSON berhasil dibaca dari localStorage dengan kunci: ${key}`, storedJSON);
                return storedJSON;
            } else {
                console.log(`Tidak ada data JSON yang ditemukan di localStorage dengan kunci: ${key}`);
                return null;
            }
        } catch (error) {
            console.error(`Gagal membaca data JSON dari localStorage dengan kunci: ${key}`, error);
            return null;
        }
    }

    // Fungsi untuk menulis buffer ke localStorage
    WriteBuffer = async (key, buffer) => {
        try {
            // Simpan buffer ke dalam localStorage dengan nama kunci tertentu
            localStorage.setItem(key, JSON.stringify(Array.from(new Uint8Array(buffer))));

            console.log(`Buffer berhasil ditulis ke localStorage dengan kunci: ${key}`);
        } catch (error) {
            console.error("Gagal menulis buffer ke localStorage:", error);
        }
    }

    // Fungsi untuk membaca buffer dari localStorage
    ReadBuffer = async (key) => {
        try {
            // Ambil data dari localStorage berdasarkan kunci
            const storedDataString = localStorage.getItem(key);

            if (storedDataString) {
                // Jika data ditemukan, convert kembali dari string ke array buffer
                const storedBuffer = Uint8Array.from(JSON.parse(storedDataString));
                console.log(`Buffer berhasil dibaca dari localStorage dengan kunci: ${key}`, storedBuffer);
                return storedBuffer.buffer;
            } else {
                console.log(`Tidak ada buffer yang ditemukan di localStorage dengan kunci: ${key}`);
                return null;
            }
        } catch (error) {
            console.error(`Gagal membaca buffer dari localStorage dengan kunci: ${key}`, error);
            return null;
        }
    }

    // Fungsi untuk menghapus data dari localStorage berdasarkan kunci
    DeleteByKey(key) {
        try {
            // Hapus data dari localStorage berdasarkan kunci
            localStorage.removeItem(key);

            console.log(`Data berhasil dihapus dari localStorage dengan kunci: ${key}`);
        } catch (error) {
            console.error(`Gagal menghapus data dari localStorage dengan kunci: ${key}`, error);
        }
    }
}

// // Contoh penggunaan
// const executeLocalStorage = new ExecuteLocalStorage();

// // Contoh penggunaan untuk menulis buffer ke localStorage dengan kunci "bufferData"
// const buffer = new Uint8Array([65, 66, 67]).buffer; // Contoh data buffer
// executeLocalStorage.WriteBuffer("bufferData", buffer);

// // Contoh penggunaan untuk membaca buffer dari localStorage dengan kunci "bufferData"
// const storedBuffer = executeLocalStorage.ReadBuffer("bufferData");

// // Contoh penggunaan untuk menetapkan image.src dari hasil buffer
// if (storedBuffer) {
//     const blob = new Blob([storedBuffer], { type: "image/png" });
//     const imageUrl = URL.createObjectURL(blob);

//     const img = new Image();
//     img.src = imageUrl;

//     // Setelah ini, img dapat ditambahkan ke dalam dokumen DOM sesuai kebutuhan.
//     document.body.appendChild(img);
// }
