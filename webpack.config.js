const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  mode: "development",
  watch: true,
  entry: "./index.tsx",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: true,
    hot: true,
    writeToDisk: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".scss"],
  },
  devtool: "cheap-module-eval-source-map",
  // devtool: "source-map",
  module: {
    rules: [
      { test: /\.json$/, loader: "json-loader" },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              localsConvention: "camelCaseOnly",
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
      },
      {
        test: /\.svg$/,
        loader: "url-loader",
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          ignoreDiagnostics: [
            2739,
            2345,
            7016,
            2741,
            2322,
            2740,
            2339,
            2694,
            2304,
          ],
        },
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
  ],
};
