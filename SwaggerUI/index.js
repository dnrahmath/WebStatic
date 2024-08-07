import * as Tools from './Tools.js';

// ============================================================================

const getUrl = async () => {
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
        src = Tools.convertUrlNameGithub(url)
    } else {
        src = url
    }

    return src
}

// ============================================================================

const loadSwaggerSrc = async (defaultUrl) => {
    await fetch(defaultUrl)
      .then(response => response.text())
      .then(data => {
        document.getElementById('swagger-text').value = data;
      })
      .catch(error => {
        console.error('Error loading default URL:', error);
      });
  
    document.getElementById('load-swagger').addEventListener('click', attachSwagger);
}

// ============================================================================

const attachSwagger = async () => {
    const swaggerText = document.getElementById('swagger-text').value;
    let swaggerDoc;
    try {
      // Try to parse as JSON
      swaggerDoc = JSON.parse(swaggerText);
    } catch (e) {
      try {
        // If JSON parsing fails, try to parse as YAML
        swaggerDoc = jsyaml.load(swaggerText);
      } catch (e) {
        alert('Invalid JSON or YAML');
        return;
      }
    }
    
    window.ui = SwaggerUIBundle({
      spec: swaggerDoc,
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      layout: "StandaloneLayout",
    });
}

// ============================================================================

window.onload = async () => {
    const accrClass0 = new Tools.accr;
    document.getElementById("hideSwagger").addEventListener("click", () => {
      accrClass0.accorFunc("hideSwagger",'wrapSwagger');
    });

    let src = await getUrl();

    console.log("dasds: ",src);
    
    await loadSwaggerSrc(src);
    await attachSwagger();
}

// ============================================================================