import { Layer } from "./model/Layer";
import L from "leaflet";
import logSomething from "./layer/LayerManager";

/**
 * List of layers.
 */
const layers: Layer[] = [];

/**
 * Import data from local.
 */
const importData = (): void => {
  // file = SelectFileFromLocal()
  // const layer = Controller.parseData(file)
  // controller.addLayer(layer)
};

/**
 * Display layers on sideBar.
 */
const displayLayers = (layers: Layer[]): void => {
  // For each layer in layers.
  // Display layer on side bar.
};

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  let map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
});

logSomething("hello world");
console.log("salut");

