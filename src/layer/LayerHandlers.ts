import L from 'leaflet';
import LayerService from '../layer/LayerService';
import SideBar from '../SideBarComponent/SideBar';
import { Layer } from '../model/Layer';

export function displayLayers(layers: Layer[], map: L.Map, sideBar: SideBar): void {
  layers.forEach((layer) => {
    if (!layer.displayed) {
      layer?.leafletLayer?.addTo(map);
      sideBar.addLayerToSuperBar(layer);
      layer.displayed = true;
    }
  });
}

export function updateLayers(map: L.Map, sideBar: SideBar): void {
  const layers = LayerService.getLayers();
  displayLayers(layers, map, sideBar);
}

export function importDesktopData(
  inputFiles: HTMLInputElement,
  map: L.Map,
  sideBar: SideBar
): void {
  inputFiles.addEventListener('change', async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      try {
        await LayerService.loadLayerFromFile(file);
        const layers = LayerService.getLayers();
        displayLayers(layers, map, sideBar);
      } catch (error) {
        console.error((error as Error).message);
      }
      target.value = '';
    }
  });
}
