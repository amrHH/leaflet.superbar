// Importation du module Layer (si nécessaire, sinon cette ligne peut être supprimée)
// import { Layer } from "./model";

// Initialiser la carte centrée sur les coordonnées de Coors Field
var map = L.map("map").setView([45.193367631417679, 5.724206376557372], 13);

document.getElementById("input_files").addEventListener("change", (event) => {
  let fileInput = event.target.files;
  let file = fileInput[0];
  let fr = new FileReader();

  // Effacer l'entrée de fichier
  fileInput.value = "";

  let extension = file.name.split(".").pop();
  if (extension === "geojson") {
    fr.onload = function () {
      let read = fr.result;
      let jsonRead = JSON.parse(read);
      L.geoJSON(jsonRead).addTo(map);
    };
    fr.readAsText(file);
  } else {
    console.log("Unsupported file type.");
  }
});

fetch("test.geojson")
  .then((response) => response.json())
  .then((data) => {
    data.features.forEach((feature) => {
      console.log(feature);
    });
  })
  .catch((error) => {
    console.error("Error fetching the geojson file:", error);
  });

// Ajouter une couche de tuiles OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

/**
 * List of layers.
 */
const layers = [];

// /**
//  * Import data from local.
//  */
// const importData = () => {
//   // Example implementation of file selection and parsing
//   // file = SelectFileFromLocal()
//   // const layer = Controller.parseData(file);
//   // Controller.addLayer(layer);

//   // Placeholder implementation (you'll need to implement SelectFileFromLocal, Controller.parseData, and Controller.addLayer):
//   const file = SelectFileFromLocal(); // Function to select file from local
//   const layer = Controller.parseData(file); // Assuming Controller is defined and imported correctly
//   Controller.addLayer(layer); // Assuming Controller is defined and imported correctly
// };

// /**
//  * Display layer on sideBar.
//  */
// const displayLayers = (layers) => {
//   layers.forEach((layer) => {
//     // Example of how you might display a layer in the sidebar
//     // You will need to implement the actual DOM manipulation to display the layer

//     const sidebar = document.getElementById("sidebar"); // Assuming there is an element with id 'sidebar'
//     const layerItem = document.createElement("div");
//     layerItem.innerHTML = `<p>${layer.layerName}</p>`;
//     sidebar.appendChild(layerItem);
//   });
// };

// // Placeholder implementations for SelectFileFromLocal and Controller for completeness
// const SelectFileFromLocal = () => {
//   // Implement file selection logic here
//   return {}; // Return a file object
// };

// const Controller = {
//   parseData: (file) => {
//     // Implement data parsing logic here
//     return new Layer(
//       "Example Layer",
//       "layer1",
//       "point",
//       "geojson",
//       null,
//       true,
//       100,
//       true
//     );
//   },
//   addLayer: (layer) => {
//     // Implement add layer logic here
//     layers.push(layer);
//   },
// };

// export { importData, displayLayers, layers };
