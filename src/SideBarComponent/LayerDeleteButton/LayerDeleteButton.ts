import L from 'leaflet';
import { Layer } from '../../model/Layer';
import LayerService from '../../layer/LayerService';
import './LayerDeleteButton.scss';
import deleteLayerIcon from '../../assets/icons/delete_layer.png';
class LayerDeleteButton {
  private layer: Layer;
  private map: L.Map;
  private deleteIcon: HTMLImageElement;

  constructor(layer: Layer, map: L.Map) {
    this.layer = layer;
    this.map = map;
    this.deleteIcon = this.createDeleteIcon();
  }

  /**
   * Create a clickable delete icon for the layer.
   */
  private createDeleteIcon(): HTMLImageElement {
    const deleteIcon = document.createElement('img');
    deleteIcon.src = deleteLayerIcon;
    deleteIcon.alt = 'Delete';
    deleteIcon.className = 'layer-delete-icon';
    deleteIcon.addEventListener('click', this.deleteLayer.bind(this));

    return deleteIcon;
  }

  /**
   * Delete the layer from the map and the sidebar.
   */
  private deleteLayer(): void {
    LayerService.deleteLayer(this.layer, this.map);
    this.removeLayerFromSidebar();
  }

  /**
   * Remove the layer from the sidebar.
   */
  private removeLayerFromSidebar(): void {
    const layerElement = document.getElementById(`layer-${this.layer.layerId}`);
    if (layerElement) {
      layerElement.remove();
    }
  }

  /**
   * Get the delete icon element.
   */
  public getElement(): HTMLImageElement {
    return this.deleteIcon;
  }
}

export default LayerDeleteButton;
