# leaflet.superbar

A sidebar allowing easy layer management on a Leaflet map.

## Project Initialization

The project is now a TypeScript project. Here are the steps that were applied to initialize and set up the project:

### Initialize Node Project

To initialize the project as a Node.js project, run:

```bash
npm init -y
```

### Install TypeScript

To install TypeScript and allow running TypeScript without needing to compile each time, run:

```bash
npm install typescript --save-dev
npm install ts-node --save-dev
```

```
Install Leaflet
```

To install Leaflet and its TypeScript types, run:

```
npm install leaflet
npm install @types/leaflet --save-dev
```

### Create tsconfig.json

Create a `tsconfig.json` file to specify the input file and output directories/files. This configuration file tells TypeScript how to compile the project.

### Install Webpack

To install Webpack for configuring the compilation process, run:

```bash
npm install webpack webpack-cli --save-dev
```

### Create webpack.config.js

Create a `webpack.config.js` file. This configuration file should include the line `devtool: "source-map"` to enable access to development files in the dev edition. Remember to remove this line in production!

```js
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "superbar.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
};
```

### Update package.json Scripts

In the `package.json` file, add the following lines under the "scripts" section:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch"
}
```

- "build": To execute the build script.
- "watch": To automatically watch for changes and rebuild without needing to manually run npm run build each time.

## Building and Watching Changes

To build the project, run:

```bash
npm run build
```

To watch for changes and rebuild automatically, run:

```
npm run watch
```

- Ensure to remove devtool: "source-map" from webpack.config.js in the production environment.
- The resulting file from the compilation, used by index.html, is superbar.js.
- This setup provides a streamlined development environment for building and managing a Leaflet map project using TypeScript and Webpack.
