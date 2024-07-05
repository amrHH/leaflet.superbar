import { Layer } from "./model/Layer";
import L from "leaflet";
import LayerService from "./layer/LayerService";
import { superBar } from "./view/sidebar.view";
import { GeometryType } from "./enum/GeometryType";
import { SourceType } from "./enum/SourceType";

// Initializing map
let map = L.map("map").setView([45.1885, 5.7245], 13);

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Get HTML elements
  const inputFiles = document.getElementById("input_files") as HTMLInputElement;
  const fileErrorDiv = document.getElementById(
    "error_message"
  ) as HTMLDivElement;

  // Function to import data from local files
  const importDesktopData = (): void => {
    inputFiles.addEventListener("change", async (event: Event) => {
      fileErrorDiv.innerHTML = "";
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        try {
          await LayerService.loadLayerFromFile(file);
          let layers = LayerService.getLayers();
          const superBarControl = superBar({ layers }).addTo(map);
          displayLayers(layers);
        } catch (error) {
          fileErrorDiv.innerHTML = (error as Error).message;
        }
      }
    });
  };

  /**
   * Display layers on sideBar (not implemented) and map
   * @param layers
   */
  const displayLayers = (layers: Layer[]): void => {
    // For each layer in layers, display it on the side bar.
    layers.forEach((layer) => {
      layer?.leafletLayer?.addTo(map);
    });
  };
  // Initialize import data functionality
  importDesktopData();
});
