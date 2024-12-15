import L from 'leaflet';
import SideBar from './SideBarComponent/SideBar';
import LayerService from './layer/LayerService';
import { Layer } from './model/Layer';

export function initializeApp(map: L.Map) {
  // Initializing sidebar
  const sideBar = new SideBar(map, {});
  sideBar.initSideBar();

  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Get HTML elements
    const inputFiles = document.querySelector(
      '.leaflet-superbar__body__input-files'
    ) as HTMLInputElement;
    const importButton = document.querySelector(
      '.leaflet-superbar__body__tooldbar__import-button'
    ) as HTMLDivElement;

    // Show file input when the button is clicked
    importButton.addEventListener('click', () => {
      inputFiles.click();
    });

    // Function to import data from local files
    const importDesktopData = (): void => {
      inputFiles.addEventListener('change', async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const file = target.files[0];
          try {
            await LayerService.loadLayerFromFile(file);
            let layers = LayerService.getLayers();
            displayLayers(layers);
          } catch (error) {
            console.error((error as Error).message);
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
      console.log(layers);
      layers.forEach((layer) => {
        if (!layer.displayed) {
          layer?.leafletLayer?.addTo(map);
          sideBar.addLayerToSuperBar(layer);
          layer.displayed = true;
        }
      });
    };

    const updateLayers = (): void => {
      let layers = LayerService.getLayers();
      displayLayers(layers);
    };

    // Listen for custom events to update layers
    LayerService.on('layer-added', updateLayers);
    LayerService.on('layer-removed', updateLayers);
    LayerService.on('layer-updated', updateLayers);

    // Initialize import data functionality
    importDesktopData();
  });
}
