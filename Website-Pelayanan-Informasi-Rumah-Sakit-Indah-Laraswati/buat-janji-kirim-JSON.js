
document.getElementById("submitForm").onclick = function() {
    FuncHasilForm();
};

function FuncHasilForm() {
    let formNama = document.getElementById("fname").value;
    let formJKelamin = document.getElementById("jkel").value;
    let formTLahir = document.getElementById("tglLahir").value;
    let formPhone = document.getElementById("phone").value;
    let formEmail = document.getElementById("email").value;
    let formJPelayanan = document.getElementById("jPel").value;
    let formJMinggu = document.getElementById("JanjiMingguan").value;


    let dataForm = { 
        "Nama" : formNama,
        "Jenis Kelamin" : formJKelamin,  
        "Tanggal Lahir" : formTLahir,
        "Telpon" : formPhone,
        "Email" : formEmail,
        "Jenis Pelayanan" : formJPelayanan,
        "Buat Janji Pada" : formJMinggu,
      };


    let dataFormJson = JSON.stringify(dataForm, null, 2);
    document.getElementById("formJSON").innerHTML = dataFormJson;
};