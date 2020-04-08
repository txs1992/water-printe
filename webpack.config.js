var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

function resolve(dir) {
  return path.resolve(__dirname, "..", dir);
}

module.exports = {
  mode: "development",
  entry: "./examples/index.ts",
  output: {
    path: resolve("dist"),
    publicPath: "/",
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {},
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@examples": path.resolve(__dirname, "./examples/"),
      "@packages": path.resolve(__dirname, "./packages/"),
    },
  },
  devServer: {
    hot: true,
    open: true,
    port: 8000,
    overlay: true,
    publicPath: "/",
    historyApiFallback: true,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      filename: "index.html",
      template: "./examples/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
  ],
};
