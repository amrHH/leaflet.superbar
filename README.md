# Leaflet Superbar

<a href="https://www.npmjs.com/package/leaflet.superbar"><img alt="npm" src="https://img.shields.io/npm/dt/leaflet.superbar"></a>
<a href="https://www.npmjs.com/package/leaflet.superbar"><img alt="npm" src= "https://img.shields.io/npm/v/leaflet.superbar?color=red"></a>

**Leaflet Superbar** is a customizable sidebar component for [Leaflet](https://leafletjs.com/) maps that enables users to **manage, import, and style vector layers** directly from the UI. This plugin is designed to enhance mapping applications with a rich, interactive panel that supports both data control and visual customization.

## Features

- **Import Layers**: Easily load layers via file input (e.g., GeoJSON).
- **Layer Management**: Toggle visibility, set color, view geometry type, and delete layers.
- **Customizable UI**:
  - Header background and title colors
  - Logo and title text
  - Font family and sizes
  - Toolbar and toggle button styles
  - Layer name styling and geometry color
- **Minimal and extensible layout** designed for plugin or app integration.

## Requirements

Leaflet 1.0.0 and plus

## Installation

```bash
npm i leaflet.superbar
```

then add this line in your main html file :

```html
<script src="https://unpkg.com/leaflet.superbar@latest/dist/superbar.js"></script>
```

## Usage

You can customize the appearance of **Leaflet Superbar** using the `applyStyles` function before calling `initializeApp`. Here are all available customization options:

### 🔧 Customization Options

| Property                       | Description                            | Type     | Example                |
| ------------------------------ | -------------------------------------- | -------- | ---------------------- |
| `HEAD_COLOR`                   | Background color of the sidebar header | `string` | `"#2c3e50"`            |
| `HEAD_TITLE`                   | Text shown in the header               | `string` | `"My Map"`             |
| `HEAD_TITLE_COLOR`             | Header title text color                | `string` | `"#ffffff"`            |
| `HEAD_TITLE_FONT_FAMILY`       | Font family for the header title       | `string` | `"Arial, sans-serif"`  |
| `HEAD_TITLE_FONT_SIZE`         | Font size for the header title         | `string` | `"1.5rem"`             |
| `HEAD_LOGO_WIDTH`              | Logo image width                       | `string` | `"30px"`               |
| `HEAD_LOGO_HEIGHT`             | Logo image height                      | `string` | `"30px"`               |
| `HEAD_LOGO_URL`                | Custom logo image URL                  | `string` | `"./assets/logo.png"`  |
| `BODY_COLOR`                   | Background color of the body           | `string` | `"#f4f4f4"`            |
| `TOOLBAR_COLOR`                | Background color of the toolbar        | `string` | `"#ecf0f1"`            |
| `TOOLBAR_IMPORT_BUTTON_WIDTH`  | Width of the import button             | `string` | `"40px"`               |
| `TOOLBAR_IMPORT_BUTTON_HEIGHT` | Height of the import button            | `string` | `"40px"`               |
| `TOGGLE_BUTTON_COLOR`          | Color of the floating toggle button    | `string` | `"#3498db"`            |
| `TOGGLE_TEXT_COLOR`            | Text color on the toggle button        | `string` | `"#ffffff"`            |
| `LAYERS_NAME_COLOR`            | Color of layer name text               | `string` | `"#2c3e50"`            |
| `LAYERS_NAME_FONT_SIZE`        | Font size of the layer name            | `string` | `"1rem"`               |
| `LAYERS_NAME_FONT_FAMILY`      | Font family of the layer name          | `string` | `"Roboto, sans-serif"` |
| `LAYERS_GEOMETRY_COLOR`        | Default color of geometry preview      | `string` | `"#e74c3c"`            |

---

### Example

```js
<script
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  crossorigin=""
></script>
<script src="https://unpkg.com/leaflet.superbar@latest/dist/superbar.js"></script>
<script>
  const map = L.map("map").setView([48.8566, 2.3522], 13);
  const customStyles = {
    HEAD_COLOR: "#1abc9c",
    HEAD_TITLE: "My Custom Map",
    HEAD_TITLE_COLOR: "#ffffff",
    HEAD_LOGO_URL: "./my_logo.png",
    HEAD_LOGO_WIDTH: "40px",
    HEAD_LOGO_HEIGHT: "40px",
    TOOLBAR_COLOR: "#16a085",
    TOGGLE_BUTTON_COLOR: "#27ae60",
    LAYERS_NAME_COLOR: "#34495e",
    LAYERS_GEOMETRY_COLOR: "#e67e22",
  };
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);
  SuperBar.applyStyles(customStyles);
  SuperBar.initializeApp(map);
</script>
```

## Licence

This plugin is released under the MIT License. See the [LICENSE](https://opensource.org/license/mit/) file for details.

## 🤝 Contributing

Contributions are welcome! 😄 If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on the GitHub repository.

If you like this project, don’t forget to ⭐ star it on GitHub — it really helps and is much appreciated!
