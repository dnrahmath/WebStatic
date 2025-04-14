
// Helper to pad a number with leading zeros
export const pad = (number, length) => {
    var str = String(number);
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

// Helper to handle image index updates
export const handlecurrentTimeUpdate = (currentTime,minTime,maxTime) => {
    if (currentTime > maxTime) {
        currentTime = minTime;
    } else if (currentTime < minTime) {
        currentTime = maxTime;
    }
    return currentTime;
}

// Fungsi untuk mendapatkan semua parameter dari URL
export const getAllParameters = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    
    return params;
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

/* ================================================== */
/* ================================================== */