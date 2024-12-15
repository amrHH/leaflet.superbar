import L from 'leaflet';
import { Layer } from '../model/Layer';
import { SourceType } from '../enum/SourceType';
import { GeometryType } from '../enum/GeometryType';

class LayerService {
  private static incerementalId = 0;
  private static layers: Layer[] = [];

  /**
   * @returns all layers.
   */
  static getLayers(): Layer[] {
    return this.layers;
  }

  /**
   * Adding layer.
   * @param layer
   */
  static addLayer(layer: Layer): void {
    if (!this.layers.find((e) => e.layerName === layer.layerName)) {
      // Add layer to the internal layers array
      this.layers.push(layer);
    }
  }

  /**
   * Removing layer.
   * @param layer
   * @param map
   */
  static deleteLayer(layer: Layer, map: L.Map): void {
    const index = this.layers.indexOf(layer);
    if (index !== -1) {
      this.layers.splice(index, 1);
      map.removeLayer(layer.leafletLayer);
    }
  }

  /**
   * Show a hidden layer.
   * @param layer
   */
  static showLayer(layer: Layer): void {
    // Change visible state.
    layer.visible = true;
  }

  /**
   * Hide a layer.
   * @param layer
   */
  static hideLayer(layer: Layer, map: L.Map): void {
    // Hide the layer from the map
    layer.visible = false;
  }

  /**
   * Activate a layer.
   * @param layer
   */
  static activateLayer(layer: Layer): void {
    // Implement layer activation logic
    layer.active = true;
  }

  /**
   * Deactivate a layer.
   * @param layer
   */
  static desactivateLayer(layer: Layer): void {
    // Implement layer deactivation logic
    layer.active = false;
  }

  /**
   * Change layer level.
   * @param layer
   * @param range
   */
  static changeLayerLevel(layer: Layer, range: number): void {
    // Implement logic to change layer level
    layer.range = range;
    // TODO: conceptualize mouse handlers and events.
  }

  /**
   * Load a layer from desktop data.
   * //TODO: add more file types (dont forget the if close)
   * @param file
   * @returns Promise
   */
  static async loadLayerFromFile(file: File): Promise<Layer | null> {
    // Readfile function is async
    return new Promise((resolve, reject) => {
      // Check file type.
      if (file.name.endsWith('.geojson')) {
        const fileReader = new FileReader();
        // Init layer.
        let layer: Layer | null = null;
        fileReader.onload = function () {
          try {
            const readingResult = fileReader.result as string;
            const jsonRead = JSON.parse(readingResult);

            const geometryType = jsonRead.features[0].geometry.type.toLowerCase();
            let geomType = geometryType;
            /*             switch (geometryType) {
              case "point":
                geomType = GeometryType.POINT;
                break;
              case 'linestring':
                geomType = GeometryType.POLYLINE;
                break;
              case 'polygon':
                geomType = GeometryType.POLYGONE;
                break;
              default:
                geomType = GeometryType.NONE;
            } */

            // Creating new layer.
            layer = new Layer(
              jsonRead.name,
              LayerService.incerementalId.toString(),
              geomType,
              SourceType.LOCAL,
              L.geoJSON(jsonRead, {
                pointToLayer: (feature, latlng) => {
                  return L.circleMarker(latlng, {
                    radius: 8,
                    fillColor: '#3388ff',
                    color: '#000',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                  });
                },
              }),
              true,
              1,
              true,
              false
            );
            LayerService.incerementalId++;
            LayerService.addLayer(layer);

            // Return created layer.
            resolve(layer);
          } catch (error) {
            console.error('Error parsing JSON or creating layer:', error);
            reject(null);
          }
        };
        // Handle file reader error.
        fileReader.onerror = function (error) {
          console.error('Error reading file:', error);
          reject(null);
        };

        // Read file as text.
        fileReader.readAsText(file);
      } else {
        reject(new Error('File is not a GeoJSON file'));
      }
    });
  }

  public static on(event: string, callback: () => void) {
    document.addEventListener(event, callback);
  }

  private static emit(event: string) {
    const eventToEmit = new Event(event);
    document.dispatchEvent(eventToEmit);
  }

  /**
   * Handle color change for a specific layer.
   */
  static handleColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const colorPickerId = input.id;
    const layer = this.layers.find((layer) => layer.layerId === colorPickerId);
    if (layer) {
      if (layer.geom === GeometryType.POINT) {
        layer.leafletLayer.setStyle({
          fillColor: input.value,
          color: input.value,
        });
      } else {
        layer.leafletLayer.setStyle({ color: input.value });
      }
    }
  }
}
export default LayerService;
