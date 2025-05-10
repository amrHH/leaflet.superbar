import L from 'leaflet';
import { Layer } from '../../model/Layer';
import LayerService from '../../layer/LayerService';

class LayerVisibilityToggle {
  private layer: Layer;
  private map: L.Map;
  private checkbox: HTMLInputElement;

  constructor(layer: Layer, map: L.Map) {
    this.layer = layer;
    this.map = map;
    this.checkbox = this.createCheckbox();
  }

  /**
   * Create a checkbox element for the layer visibility.
   */
  private createCheckbox(): HTMLInputElement {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = this.layer.visible;
    checkbox.addEventListener('change', this.toggleVisibility.bind(this));

    return checkbox;
  }

  /**
   * Toggle the visibility of the layer.
   */
  private toggleVisibility(): void {
    if (this.checkbox.checked) {
      LayerService.showLayer(this.layer);
      this.layer.leafletLayer.addTo(this.map);
    } else {
      LayerService.hideLayer(this.layer, this.map);
    }
  }

  /**
   * Get the checkbox element.
   */
  public getElement(): HTMLInputElement {
    return this.checkbox;
  }
}

export default LayerVisibilityToggle;
