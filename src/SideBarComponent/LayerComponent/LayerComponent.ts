import L, { Map } from 'leaflet';
import { Layer } from '../../model/Layer';
import ColorPickerButton from '../ColorPickerButton/ColorPickerButton';
import LayerService from '../../layer/LayerService';

export class LayerComponent {
  layer: Layer;
  element: HTMLElement;
  lmap: Map;

  constructor(layer: Layer, lmap: Map) {
    this.layer = layer;
    this.lmap = lmap; // Ajout de la carte (lmap) comme propriété de la classe
    this.element = this.createLayerElement(layer);
  }

  public createLayerElement = (layer: Layer): HTMLElement => {
    const div = L.DomUtil.create('div', 'leaflet-superbar__body__layersList__layer');
    div.textContent = layer.layerName;

    // Toggle layer activation.
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Désactiver';
    // toggleButton.addEventListener("click", () => this.toggleLayer());
    div.appendChild(toggleButton);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', () => LayerService.deleteLayer(layer, this.lmap)); // Utilisation de this.lmap pour accéder à la carte
    div.appendChild(deleteButton);

    // Create and add the color picker button
    const colorPickerButton = new ColorPickerButton(layer.layerId);
    colorPickerButton
      .getElement()
      .addEventListener('input', LayerService.handleColorChange.bind(LayerService));
    div.appendChild(colorPickerButton.getElement());

    return div; // Retourne l'élément div créé
  };
}
