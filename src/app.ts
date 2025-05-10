import L from 'leaflet';
import SideBar from './SideBarComponent/SideBar';
import LayerService from './layer/LayerService';
import config from './assets/styles/config.json';
import { PluginStyles } from './assets/styles/PluginStyles';
import { updateLayers, importDesktopData } from './layer/LayerHandlers';

let currentConfig = { ...config };
let customLogoUrl: string | null = null;
let customHeaderTitle: string = 'Superbar';
export { customLogoUrl, customHeaderTitle };

export function applyStyles(userStyles: PluginStyles = {}) {
  currentConfig = { ...currentConfig, ...userStyles };

  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      --head-color: ${currentConfig.HEAD_COLOR};
      --head-title-color: ${currentConfig.HEAD_TITLE_COLOR};
      --head-title-font-family: ${currentConfig.HEAD_TITLE_FONT_FAMILY};
      --head-title-font-size: ${currentConfig.HEAD_TITLE_FONT_SIZE};
      --head-logo-width: ${currentConfig.HEAD_LOGO_WIDTH};
      --head-logo-height: ${currentConfig.HEAD_LOGO_HEIGHT};
      --body-color: ${currentConfig.BODY_COLOR};
      --toolbar-color: ${currentConfig.TOOLBAR_COLOR};
      --toolbar-import-button-width: ${currentConfig.TOOLBAR_IMPORT_BUTTON_WIDTH};
      --toolbar-import-button-height: ${currentConfig.TOOLBAR_IMPORT_BUTTON_HEIGHT};
      --toggle-button-color: ${currentConfig.TOGGLE_BUTTON_COLOR};
      --toggle-text-color: ${currentConfig.TOGGLE_TEXT_COLOR};
      --layers-name-color: ${currentConfig.LAYERS_NAME_COLOR};
      --layers-name-font-size: ${currentConfig.LAYERS_NAME_FONT_SIZE};
      --layers-name-font-family: ${currentConfig.LAYERS_NAME_FONT_FAMILY};
      --layers-geometry-color: ${currentConfig.LAYERS_GEOMETRY_COLOR};
    }
  `;
  if (userStyles.HEAD_LOGO_URL) {
    customLogoUrl = userStyles.HEAD_LOGO_URL;
  }
  if (userStyles.HEAD_TITLE) {
    customHeaderTitle = userStyles.HEAD_TITLE;
  }
  const oldStyle = document.getElementById('superbar-styles');
  if (oldStyle) {
    oldStyle.remove();
  }

  style.id = 'superbar-styles';
  document.head.appendChild(style);
}

export function initializeApp(map: L.Map) {
  // Load and apply styles from config
  applyStyles();

  // Initializing sidebar
  const sideBar = new SideBar(map, { customLogoUrl, customHeaderTitle });
  sideBar.initSideBar();

  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Get HTML elements
    const inputFiles = document.querySelector(
      '.leaflet-superbar__body__input-files'
    ) as HTMLInputElement;
    const importButton = document.querySelector(
      '.leaflet-superbar__body__tooldbar__import-button'
    ) as HTMLDivElement;

    // Show file input when the button is clicked
    importButton.addEventListener('click', () => {
      inputFiles.click();
    });

    // Initialize import data functionality
    importDesktopData(inputFiles, map, sideBar);

    // Listen for custom events to update layers
    LayerService.on('layer-added', () => updateLayers(map, sideBar));
    LayerService.on('layer-removed', () => updateLayers(map, sideBar));
    LayerService.on('layer-updated', () => updateLayers(map, sideBar));
  });
}
