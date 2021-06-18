![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/estebangarviso/WebDevFinalProject)
![Lines of code](https://img.shields.io/tokei/lines/github/estebangarviso/WebDevFinalProject)
# Desarrollo Web desde cero HTML5, CSS, Javascript & GIT/Github 🚀 [FINAL PROJECT]
Este es el proyecto final del curso de Desarrollo Web para la Certificación de Desarrollador Web de Escalab Academy LATAM.

## Instalación 🔧
1. **Manual**
   - Descarga el repositorio en formato .zip y descomprímelo en una carpeta.
   - Seleccione la carpeta y haga clic derecho en abrir con su editor de código preferido.
   - Abra el archivo index.html en su navegador.
2. **Desde la terminal**
   - Descargue e instale [GIT] (https://git-scm.com/downloads)
   - Abra el terminal CMD o BASH y escriba.
```
cd <TU_DIRECTORIO>
git clone --branch <NOMBRE_DE_RAMA> https://github.com/estebangarviso/WebDevFinalProject
```
# Web Development from zero HTML5, CSS, Javascript & GIT/Github 🚀 [FINAL PROJECT]
This is the final proyect of Web Development course in order to Web Developer Certification from Escalab Academy LATAM.

## Install 🔧
1. **Manual**
  - Download the repository in .zip format and unzip to a folder.
  - Select the folder and right click open with your preferred code editor.
  - Open index.html file in your browser.
2. **From terminal**
  - Download and install [GIT](https://git-scm.com/downloads)
  - Open CMD or BASH terminal and type.

```
cd <YOUR_PATH>
git clone --branch <BRANCH_NAME> https://github.com/estebangarviso/WebDevFinalProject
```
  - Go to the cloned folder and open index.html in your browser.
### Status 📖
![GitHub branch checks state](https://img.shields.io/github/checks-status/estebangarviso/WebDevFinalProject/main?style=solid)
### Lenguagues utilizados/Languages Used 🛠️
![HTML5](https://img.shields.io/badge/HTML-v5.0.0-E34F26?style=solid&logoColor=ffffff&labelColor=E34F26&logo=html5)
![CSS3](https://img.shields.io/badge/CSS-v3.0.0-1572B6?style=solid&labelColor=1572B6&logo=css3)
![Javascript](https://img.shields.io/badge/Javascript-ES9-F7DF1E?style=solid&labelColor=F7DF1E&logoColor=000000&logo=JavaScript)
![Git](https://img.shields.io/badge/Git-2.31.0-F05032?style=solid&labelColor=F05032&logoColor=ffffff&logo=Git)
![Github](https://img.shields.io/badge/Github--181717?style=solid&labelColor=181717&logoColor=ffffff&logo=GitHub)
### Librerias/Libraries
![FontAwesome](https://img.shields.io/badge/FontAwesome-v5.15-339AF0?style=solid&logoColor=339AF0&labelColor=ffffff&logo=fontawesome)
### Features
  - SVG Logo Design
  - Back to top
  - Contact form with Google Maps API and Waze Travel
  - Javascript Web Scraping SEO Keywords from dev console in [Wordtracker.com](https://www.wordtracker.com/)
```
(function(){
  var keywords = document.querySelectorAll("#main-results-holder td.keyword span.keyword");
  var tmp = [];
  keywords.forEach((item, index)=>{
      if(typeof item.innerText !== 'undefined'){
          tmp.push(item.innerText);
      }
  })  
  return prompt('Presiona CTRL + C para copiar',tmp.join(", "));
})();
```
### Contribuciones/Contributions 🖇️
Las solicitudes de extracción son bienvenidas. Para cambios importantes, abra un problema primero para discutir qué le gustaría cambiar.

Asegúrese de actualizar las pruebas en consecuencia.

Pull requests are welcome. For important changes, open an issue first to discuss what you would like to change.

Be sure to update the tests accordingly.

## Licencia/License 📄
[MIT](https://choosealicense.com/licenses/mit/)

