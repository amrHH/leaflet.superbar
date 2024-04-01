/**
 * Layer object. 
 */
export interface  layer  {
    layerName : string,
    layerId : string,
    geometryType : geometryTypes,
    source: sources,
    // Geomtry
    leafletLayer : L.Layer,
    active : boolean,
    range : number,
    visible : boolean
}

/**
 * Handled geometries.
 */
export enum geometryTypes {
    POINT = "point",
    POLYLINE = "polyline",
    POLYGONE = "polygone",
    NONE = "none"
}

/**
 * Sources types.
 */
export enum sources {
    BDD = "postgresql",
    LOCAL = "geojson",
}