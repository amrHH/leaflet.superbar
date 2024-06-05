import { GeometryType } from "../enum/GeometryType";
import { SourceType } from "../enum/SourceType";

/**
 * Layer object.
 */
export interface Layer {
  layerName: string;
  layerId: string;
  geometryType: GeometryType;
  source: SourceType;
  // Geomtry
  leafletLayer: L.Layer;
  active: boolean;
  range: number;
  visible: boolean;
}
