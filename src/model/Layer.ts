import { GeometryType } from "../enum/GeometryType";
import { SourceType } from "../enum/SourceType";
import L from "leaflet"; // Importation de Leaflet

/**
 * Layer object.
 */
export class Layer {
  layerName: string;
  layerId: string;
  geometryType: GeometryType;
  source: SourceType;
  leafletLayer: L.Layer;
  active: boolean;
  range: number;
  visible: boolean;

  constructor(
    layerName: string,
    layerId: string,
    geometryType: GeometryType,
    source: SourceType,
    leafletLayer: L.Layer,
    active: boolean,
    range: number,
    visible: boolean
  ) {
    this.layerName = layerName;
    this.layerId = layerId;
    this.geometryType = geometryType;
    this.source = source;
    this.leafletLayer = leafletLayer;
    this.active = active;
    this.range = range;
    this.visible = visible;
  }
}
