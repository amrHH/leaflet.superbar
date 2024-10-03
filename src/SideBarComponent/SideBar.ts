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
    this.superBarButton.innerHTML = "open";
    L.DomEvent.on(this.superBarButton, "click", this.toggleSuperBar, this); // Change event handler to toggleSuperBar
    this.map?.getContainer().appendChild(this.superBarButton);
  }

  /**
   * Add or remove classes on elements to apply css propertie.
   */
  private toggleSuperBar(): void {
    if (this.superBarVisible) {
      // Close super bar if visible
      this.closeSuperBar();
    } else {
      // Open super bar if not visible
      this.superBarElement?.classList.add("visible");
      this.superBarButton?.classList.remove("hidden");
    }
    this.superBarVisible = !this.superBarVisible; // Toggle visibility state
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
        const div = L.DomUtil.create(
          "div",
          "leaflet-superbar__body__layersList__layer"
        );
        div.textContent = layer.layerName;
        console.log(
          `Layer added: ${layer.layerName}, Geometry type: ${layer.geom}`
        );

        // Create and add the color picker button
        const colorPickerButton = new ColorPickerButton(layer.layerId);
        colorPickerButton
          .getElement()
          .addEventListener(
            "input",
            LayerService.handleColorChange.bind(LayerService)
          );
        div.appendChild(colorPickerButton.getElement());

        // Create and add the geometry type label
        const geometryTypeLabel = new GeometryTypeLabel(layer.geom as string);
        div.appendChild(geometryTypeLabel.getElement());

        superBarBody.appendChild(div);
      }
    }
  }
}

export default SideBar;
