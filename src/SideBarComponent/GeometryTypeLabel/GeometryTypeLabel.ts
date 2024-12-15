class GeometryTypeLabel {
  private element: HTMLElement;

  constructor(geometryType: string) {
    this.element = document.createElement("div");
    this.element.className =
      "leaflet-superbar__body__layersList__layer__secondLine__geometry-label";
    this.element.textContent = `${geometryType}`;
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}

export default GeometryTypeLabel;
