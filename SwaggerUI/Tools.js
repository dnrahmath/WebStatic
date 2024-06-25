// Fungsi untuk mendapatkan semua parameter dari URL
export const getAllParameters = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    
    return params;
};

export const convertUrlNameGithub = (URLGithub) => {
    // Pisahkan URL berdasarkan "/"
    const parts = URLGithub.split('/');
  
    // Temukan bagian yang menunjukkan username/organisasi dan repositori
    let usernameRepoIndex = parts.findIndex(part => part === 'github.com');
  
    // Jika tidak ditemukan 'github.com', coba 'githubusercontent.com'
    if (usernameRepoIndex === -1) {
      usernameRepoIndex = parts.findIndex(part => part === 'githubusercontent.com');
    }
  
    // Jika tidak ditemukan, kembalikan URL awal
    if (usernameRepoIndex === -1) {
      return URLGithub;
    }
  
    // Ubah 'github.com' menjadi 'raw.githubusercontent.com'
    parts[usernameRepoIndex] = 'raw.githubusercontent.com';
  
    // Hapus '/blob/' dari path jika ada
    const blobIndex = parts.findIndex(part => part === 'blob');
    if (blobIndex !== -1) {
      parts.splice(blobIndex, 1);
    }
  
    // Gabungkan kembali bagian-bagian URL dan kembalikan hasilnya
    return parts.join('/');
  };
  

export const isGitHubUrl = (url) => {
    // Memeriksa apakah URL dimulai dengan 'github.com'
    return url.startsWith('github.com');
};