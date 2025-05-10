import L from 'leaflet';
import { Layer } from '../model/Layer';
import './SideBarStyle.scss';
import superbarContent from './superbar_content.html';
import ColorPickerButton from './ColorPickerButton/ColorPickerButton';
import LayerService from '../layer/LayerService';
import GeometryTypeLabel from './GeometryTypeLabel/GeometryTypeLabel';
import LayerVisibilityToggle from './LayerVisibilityToggle/LayerVisibilityToggle';
import LayerDeleteButton from './LayerDeleteButton/LayerDeleteButton';
import SuperBar_Logo from '../assets/logo/superbar_logo.png';
import addLayer_Logo from '../assets/icons/Add_Layers.png';
import { customLogoUrl } from '../app';

// Define the options interface and include layers
interface SuperBarOptions extends L.ControlOptions {
  layers?: Layer[];
  customLogoUrl?: string | null;
  customHeaderTitle?: string;
}

class SideBar extends L.Class {
  private map: L.Map;
  private superBarVisible: boolean;
  private superBarElement: HTMLElement | null;
  private superBarButton: HTMLButtonElement | null;
  private parser = new DOMParser();
  private htmlDoc = this.parser.parseFromString(superbarContent, 'text/html');
  customLogoUrl: string | null;
  customHeaderTitle: string;

  constructor(map: L.Map, options: SuperBarOptions) {
    super();
    this.map = map;
    this.superBarVisible = true;
    this.superBarElement = null;
    this.superBarButton = null;
    this.customLogoUrl = options.customLogoUrl ?? null;
    this.customHeaderTitle = options.customHeaderTitle ?? 'Superbar';
  }

  /**
   * Create a button as html element on map.
   */
  private createButton(): void {
    this.superBarButton = L.DomUtil.create(
      'button',
      'leaflet-superbar-button'
    ) as HTMLButtonElement;

    const buttonText = document.createElement('span');
    buttonText.innerHTML = '+';
    this.superBarButton.appendChild(buttonText);

    L.DomEvent.on(this.superBarButton, 'click', this.toggleSuperBar, this);
    this.map?.getContainer().appendChild(this.superBarButton);

    // Add listeners to disable and enable map interactions based on cursor position over the button
    this.superBarButton.addEventListener('mouseover', () => {
      this.map.dragging.disable();
      this.map.scrollWheelZoom.disable();
      this.map.doubleClickZoom.disable();
    });

    this.superBarButton.addEventListener('mouseout', () => {
      this.map.dragging.enable();
      this.map.scrollWheelZoom.enable();
      this.map.doubleClickZoom.enable();
    });
  }

  /**
   * Toggle the superbar visibility and rotate the button.
   */
  private toggleSuperBar(): void {
    if (this.superBarVisible) {
      this.closeSuperBar();
      this.superBarButton!.classList.remove('rotated');
    } else {
      this.superBarElement?.classList.add('visible');
      this.superBarButton?.classList.remove('hidden');
      this.superBarButton!.classList.add('rotated');
    }
    this.superBarVisible = !this.superBarVisible;
  }

  /**
   * Close superbar.
   */
  private closeSuperBar(): void {
    if (this.superBarElement) {
      this.superBarElement.classList.remove('visible');
      this.superBarButton?.classList.add('hidden');
    }
  }

  /**
   * Init the sidebar and add it to map.
   */
  public initSideBar() {
    this.createButton();
    const superBarBody = this.htmlDoc.querySelector('.leaflet-superbar__body__layersList');

    // Append the modified content to the map container
    this.superBarElement = L.DomUtil.create('div', 'leaflet-superbar visible');
    this.superBarElement!.innerHTML = this.htmlDoc.body.innerHTML;
    this.map?.getContainer().appendChild(this.superBarElement);
    this.superBarButton?.classList.remove('hidden');

    // Add the dynamic header elements
    const headerElement = this.superBarElement.querySelector('.leaflet-superbar__header');
    if (headerElement) {
      // Create and append the logo
      const logo = L.DomUtil.create('img', 'leaflet-superbar__header-logo') as HTMLImageElement;
      logo.src = this.customLogoUrl ?? SuperBar_Logo;
      logo.alt = 'Logo';
      headerElement.appendChild(logo);

      // Create and append the header title
      const headerTitle = L.DomUtil.create('div', 'leaflet-superbar__header-title');
      headerTitle.textContent = this.customHeaderTitle;
      headerElement.appendChild(headerTitle);
    }

    // Add the toolbar with import button
    const toolbarElement = this.superBarElement.querySelector('.leaflet-superbar__body__toolbar');
    if (toolbarElement) {
      const importButtonContainer = L.DomUtil.create(
        'div',
        'leaflet-superbar__body__tooldbar__import-button'
      );
      // Create the icon
      const importIcon = L.DomUtil.create('img', 'Icon') as HTMLImageElement;
      importIcon.src = addLayer_Logo;
      importButtonContainer.appendChild(importIcon);
      toolbarElement.appendChild(importButtonContainer);
    }

    // Add listeners to disable and enable map interactions based on cursor position
    this.superBarElement.addEventListener('mouseover', () => {
      this.map.dragging.disable();
      this.map.scrollWheelZoom.disable();
      this.map.doubleClickZoom.disable();
    });

    this.superBarElement.addEventListener('mouseout', () => {
      this.map.dragging.enable();
      this.map.scrollWheelZoom.enable();
      this.map.doubleClickZoom.enable();
    });
  }

  /**
   * Add a layer to the superbar.
   */
  public addLayerToSuperBar(layer: Layer) {
    if (this.superBarElement) {
      const superBarBody = this.superBarElement.querySelector(
        '.leaflet-superbar__body__layersList'
      );

      if (superBarBody) {
        const layerContainer = L.DomUtil.create('div', 'leaflet-superbar__body__layersList__layer');
        layerContainer.id = `layer-${layer.layerId}`;

        const firstLineDiv = L.DomUtil.create(
          'div',
          'leaflet-superbar__body__layersList__layer__firstLine'
        );

        // Create and add the visibility toggle checkbox
        const visibilityToggle = new LayerVisibilityToggle(layer, this.map);
        firstLineDiv.appendChild(visibilityToggle.getElement());

        const layerNameDiv = L.DomUtil.create(
          'div',
          'leaflet-superbar__body__layersList__layer__firstLine__layer-name'
        );
        layerNameDiv.textContent = layer.layerName;
        firstLineDiv.appendChild(layerNameDiv);

        // Create and add the color picker button
        const colorPickerButton = new ColorPickerButton(layer.layerId);
        colorPickerButton
          .getElement()
          .addEventListener('input', LayerService.handleColorChange.bind(LayerService));
        firstLineDiv.appendChild(colorPickerButton.getElement());

        // Create and add the delete button
        const deleteButton = new LayerDeleteButton(layer, this.map);
        firstLineDiv.appendChild(deleteButton.getElement());

        layerContainer.appendChild(firstLineDiv);

        const secondLineDiv = L.DomUtil.create(
          'div',
          'leaflet-superbar__body__layersList__layer__secondLine'
        );

        // Create and add the geometry type label
        const geometryTypeLabel = new GeometryTypeLabel(layer.geom as string);
        secondLineDiv.appendChild(geometryTypeLabel.getElement());

        layerContainer.appendChild(secondLineDiv);

        superBarBody.appendChild(layerContainer);
      }
    }
  }
}

export default SideBar;
