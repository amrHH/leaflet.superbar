const path = require("path");

module.exports = {
  entry: "./src/app.ts",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "superbar.js",
    path: path.resolve(__dirname, "dist"),
    sourceMapFilename: "[file].map", // Explicitly specify source map file name
  },
};
