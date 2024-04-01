import { layer } from "./model";

/**
 * Import data from local.
 */
const parseData = (file): layer => {
  // Call function L.geojson to parse geosjon and add corresponding leaflet object.
  // Create a new instance of layer and right attributes.
  // Return layer
};

/**
 * Adding layer.
 * @param layer
 */
const addLayer = (layer: layer): void => {
  // Add to the layers array.
  // layers.add (layer)
  // Add to map.
};

/**
 * Removing layer.
 * @param layer
 */
const deleteLayer = (layer: layer): void => {
  // Remove from layers array.
  // Remove from map.
};

/**
 * show a hiden layer.
 */
const showLayer = (layer: layer): void => {
  // Turn visible attribute to true.
  // Add to map.
};

/**
 * Unvisible layer.
 */
const hideLayer = (layer: layer): void => {
  // Turn visible attribute to false.
  // Remove from map.
};

/**
 * activate a lyare.
 */
const activateLayer = (layer: layer): void => {
  // Turn activate attribute to true.
};

/**
 * desactivate a lyare.
 */
const desactivateLayer = (layer: layer): void => {
  // Turn activate attribute to false.
};

/**
 * Changing layer level.
 */
const changelayerLevel = (layer: layer): void => {
  //TODO: conceptualise mouse handlers and events. 
};
