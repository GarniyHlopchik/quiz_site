const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//
// 🔍 Automatically detect all HTML files in "static" folder
// and generate an entry + HTML plugin for each.
//
const htmlFiles = fs.readdirSync(path.resolve(__dirname, "static"))
  .filter(file => file.endsWith(".html"));

const entries = {};
const htmlPlugins = [];

for (const file of htmlFiles) {
  const name = path.basename(file, ".html");
  const jsPath = `./src/pages/${name}.js`;
  if (fs.existsSync(jsPath)) {
    entries[name] = jsPath;
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: `./static/${file}`,
        filename: `${file}`,
        chunks: [name],
      })
    );
  } else {
    console.warn(`⚠️ No JS entry found for ${file}, skipping`);
  }
}

module.exports = {
  entry: entries,
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlPlugins,
  ],
  optimization: {
    splitChunks: { chunks: "all" },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8080,
    open: true,
  },
  mode: "development",
};