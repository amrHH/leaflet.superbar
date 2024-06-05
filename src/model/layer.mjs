import { GeometryTypes } from './geometryTypes'; // Adjust the import path as necessary
import { Sources } from './sources'; // Adjust the import path as necessary

/**
 * Layer object.
 */
class Layer {
    constructor(layerName, layerId, geometryType, source, leafletLayer, active, range, visible) {
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

export { Layer };
