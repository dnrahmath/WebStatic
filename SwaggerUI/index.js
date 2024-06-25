import * as Tools from './Tools.js';

document.addEventListener("DOMContentLoaded", async () => {
    
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

    let url = allParameters["src"]
    let src

    if (Tools.isGitHubUrl(url)) {
        src = Tools.convertUrlNameGithub(allParameters["src"])
    } else {
        src = url
    }
    
    // Initialize Swagger UI
    const ui = SwaggerUIBundle({
        // url: "https://raw.githubusercontent.com/dnrahmath/wsp-tenda/master/docs/swagger.yaml", // URL to your Swagger file
        url: src,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      })

      window.ui = ui
})