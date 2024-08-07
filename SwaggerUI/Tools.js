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
  

export const isGitHubUrl = async (url) => {
  const parts = new URL(url);
  if (parts.hostname === 'github.com' && parts.pathname.split('/').length >= 3) {
    return true
  } 
};

  
export class accr {
  constructor() { 
    this.bollean = true;
   }
  accorFunc = (idbtnName,idTarget) => {
    let btnName = document.getElementById(idbtnName);
    let targetElemen = document.getElementById(idTarget);
    if (this.bollean === true) {
      targetElemen.hidden = false;
      btnName.innerHTML = idbtnName+" : Turn OFF";
      this.bollean = false; 
    } else { 
      targetElemen.hidden = true;
      btnName.innerHTML = idbtnName+" : Turn ON";
      this.bollean = true;
    }
  };
}