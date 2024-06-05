import { layer } from "./model";

/**
 * Import data from local.
 */
const parseData = (file) => {
  // Call function L.geojson to parse geojson and add corresponding leaflet object.
  // Create a new instance of layer and set attributes.
  // Return layer

  // Example implementation (assuming L.geoJson and layer constructor are available):
  const geoJsonLayer = L.geoJson(file);
  const newLayer = new layer(); // Replace with actual constructor if different
  newLayer.geoJsonLayer = geoJsonLayer; // Assuming layer has a geoJsonLayer attribute
  return newLayer;
};

/**
 * Adding layer.
 * @param layer
 */
const addLayer = (layer) => {
  // Add to the layers array.
  // layers.add(layer)
  // Add to map.

  layers.push(layer); // Assuming layers is an array defined elsewhere
  map.addLayer(layer.geoJsonLayer); // Assuming map is the Leaflet map object
};

/**
 * Removing layer.
 * @param layer
 */
const deleteLayer = (layer) => {
  // Remove from layers array.
  // Remove from map.

  const index = layers.indexOf(layer);
  if (index > -1) {
    layers.splice(index, 1);
  }
  map.removeLayer(layer.geoJsonLayer); // Assuming map is the Leaflet map object
};

/**
 * show a hidden layer.
 */
const showLayer = (layer) => {
  // Turn visible attribute to true.
  // Add to map.

  layer.visible = true; // Assuming layer has a visible attribute
  map.addLayer(layer.geoJsonLayer); // Assuming map is the Leaflet map object
};

/**
 * Hide layer.
 */
const hideLayer = (layer) => {
  // Turn visible attribute to false.
  // Remove from map.

  layer.visible = false; // Assuming layer has a visible attribute
  map.removeLayer(layer.geoJsonLayer); // Assuming map is the Leaflet map object
};

/**
 * Activate a layer.
 */
const activateLayer = (layer) => {
  // Turn activate attribute to true.

  layer.activate = true; // Assuming layer has an activate attribute
};

/**
 * Deactivate a layer.
 */
const deactivateLayer = (layer) => {
  // Turn activate attribute to false.

  layer.activate = false; // Assuming layer has an activate attribute
};

/**
 * Change layer level.
 */
const changeLayerLevel = (layer) => {
  //TODO: conceptualize mouse handlers and events.
  // Implementation will depend on the specific requirements and context
};

export {
  parseData,
  addLayer,
  deleteLayer,
  showLayer,
  hideLayer,
  activateLayer,
  deactivateLayer,
  changeLayerLevel,
};
