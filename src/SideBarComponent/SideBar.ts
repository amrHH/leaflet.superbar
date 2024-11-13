// src/SideBar/SideBar.ts
import L from "leaflet";
import { Layer } from "../model/Layer";
import "./SideBarStyle.scss";
import superbarContent from "./superbar_content.html";
import ColorPickerButton from "./ColorPickerButton/ColorPickerButton";
import LayerService from "../layer/LayerService";
import GeometryTypeLabel from "./GeometryTypeLabel/GeometryTypeLabel";

// Define the options interface and include layers
interface SuperBarOptions extends L.ControlOptions {
  layers?: Layer[];
}

class SideBar extends L.Class {
  private map: L.Map;
  private superBarVisible: boolean;
  private superBarElement: HTMLElement | null;
  private superBarButton: HTMLButtonElement | null;
  private parser = new DOMParser();
  private htmlDoc = this.parser.parseFromString(superbarContent, "text/html");

  constructor(map: L.Map, options: SuperBarOptions) {
    super();
    this.map = map;
    this.superBarVisible = true;
    this.superBarElement = null;
    this.superBarButton = null;
  }

  /**
   * Create a button as html element on map.
   */
  private createButton(): void {
    this.superBarButton = L.DomUtil.create(
      "button",
      "leaflet-superbar-button"
    ) as HTMLButtonElement;

    const buttonText = document.createElement("span");
    buttonText.innerHTML = "+";
    this.superBarButton.appendChild(buttonText);

    L.DomEvent.on(this.superBarButton, "click", this.toggleSuperBar, this);
    this.map?.getContainer().appendChild(this.superBarButton);

    // Add listeners to disable and enable map interactions based on cursor position over the button
    this.superBarButton.addEventListener("mouseover", () => {
      this.map.dragging.disable();
      this.map.scrollWheelZoom.disable();
      this.map.doubleClickZoom.disable();
    });

    this.superBarButton.addEventListener("mouseout", () => {
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
      this.superBarButton!.classList.remove("rotated");
    } else {
      this.superBarElement?.classList.add("visible");
      this.superBarButton?.classList.remove("hidden");
      this.superBarButton!.classList.add("rotated");
    }
    this.superBarVisible = !this.superBarVisible;
  }

  /**
   * Close superbar.
   */
  private closeSuperBar(): void {
    if (this.superBarElement) {
      this.superBarElement.classList.remove("visible");
      this.superBarButton?.classList.add("hidden");
    }
  }

  /**
   * Init the sidebar and add it to map.
   */
  public initSideBar() {
    // create button
    this.createButton();

    // Get the leaflet-superbar__body element
    const superBarBody = this.htmlDoc.querySelector(
      ".leaflet-superbar__body__layersList"
    );

    // Append the modified content to the map container
    this.superBarElement = L.DomUtil.create("div", "leaflet-superbar visible");
    this.superBarElement!.innerHTML = this.htmlDoc.body.innerHTML;
    this.map?.getContainer().appendChild(this.superBarElement);
    this.superBarButton?.classList.remove("hidden");

    // Add listeners to disable and enable map interactions based on cursor position
    this.superBarElement.addEventListener("mouseover", () => {
      this.map.dragging.disable();
      this.map.scrollWheelZoom.disable();
      this.map.doubleClickZoom.disable();
    });

    this.superBarElement.addEventListener("mouseout", () => {
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
        ".leaflet-superbar__body__layersList"
      );

      if (superBarBody) {
        const layerContainer = L.DomUtil.create(
          "div",
          "leaflet-superbar__body__layersList__layer"
        );

        const firstLineDiv = L.DomUtil.create(
          "div",
          "leaflet-superbar__body__layersList__layer__firstLine"
        );

        const layerNameDiv = L.DomUtil.create(
          "div",
          "leaflet-superbar__body__layersList__layer__firstLine__layer-name"
        );
        layerNameDiv.textContent = layer.layerName;
        firstLineDiv.appendChild(layerNameDiv);

        // Create and add the color picker button
        const colorPickerButton = new ColorPickerButton(layer.layerId);
        colorPickerButton
          .getElement()
          .addEventListener(
            "input",
            LayerService.handleColorChange.bind(LayerService)
          );
        firstLineDiv.appendChild(colorPickerButton.getElement());

        layerContainer.appendChild(firstLineDiv);

        const secondLineDiv = L.DomUtil.create(
          "div",
          "leaflet-superbar__body__layersList__layer__secondLine"
        );

        // Create and add the geometry type label
        const geometryTypeLabel = new GeometryTypeLabel(layer.geom as string);
        secondLineDiv.appendChild(geometryTypeLabel.getElement());

        layerContainer.appendChild(secondLineDiv);

        superBarBody.appendChild(layerContainer);

        console.log(
          `Layer added: ${layer.layerName}, Geometry type: ${layer.geom}`
        );
      }
    }
  }
}

export default SideBar;
