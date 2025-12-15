require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const DEFAULT_DROPBOX_APP_KEY = process.env.DROPBOX_APP_KEY || "";
const DEFAULT_ONEDRIVE_CLIENT_ID = process.env. ONEDRIVE_CLIENT_ID || "";
const DEFAULT_ONEDRIVE_AUTHORITY = process.env.ONEDRIVE_AUTHORITY || "";
const DEFAULT_REMOTELYSAVE_WEBSITE = process.env.REMOTELYSAVE_WEBSITE || "";
const DEFAULT_REMOTELYSAVE_CLIENT_ID = process.env. REMOTELYSAVE_CLIENT_ID || "";
const DEFAULT_GOOGLEDRIVE_CLIENT_ID = process.env.GOOGLEDRIVE_CLIENT_ID || "";
const DEFAULT_GOOGLEDRIVE_CLIENT_SECRET =
  process.env.GOOGLEDRIVE_CLIENT_SECRET || "";
const DEFAULT_BOX_CLIENT_ID = process.env.BOX_CLIENT_ID || "";
const DEFAULT_BOX_CLIENT_SECRET = process.env.BOX_CLIENT_SECRET || "";
const DEFAULT_PCLOUD_CLIENT_ID = process. env.PCLOUD_CLIENT_ID || "";
const DEFAULT_PCLOUD_CLIENT_SECRET = process.env.PCLOUD_CLIENT_SECRET || "";
const DEFAULT_YANDEXDISK_CLIENT_ID = process.env.YANDEXDISK_CLIENT_ID || "";
const DEFAULT_YANDEXDISK_CLIENT_SECRET =
  process.env.YANDEXDISK_CLIENT_SECRET || "";
const DEFAULT_KOOFR_CLIENT_ID = process.env.KOOFR_CLIENT_ID || "";
const DEFAULT_KOOFR_CLIENT_SECRET = process.env.KOOFR_CLIENT_SECRET || "";

module.exports = {
  entry: "./src/main.ts",
  target: "web",
  output: {
    filename: "main.js",
    path: __dirname,
    libraryTarget: "commonjs",
  },
  plugins: [
    new webpack.DefinePlugin({
      "global.DEFAULT_DROPBOX_APP_KEY": `"${DEFAULT_DROPBOX_APP_KEY}"`,
      "global.DEFAULT_ONEDRIVE_CLIENT_ID": `"${DEFAULT_ONEDRIVE_CLIENT_ID}"`,
      "global.DEFAULT_ONEDRIVE_AUTHORITY": `"${DEFAULT_ONEDRIVE_AUTHORITY}"`,
      "global.DEFAULT_REMOTELYSAVE_WEBSITE": `"${DEFAULT_REMOTELYSAVE_WEBSITE}"`,
      "global.DEFAULT_REMOTELYSAVE_CLIENT_ID": `"${DEFAULT_REMOTELYSAVE_CLIENT_ID}"`,
      "global.DEFAULT_GOOGLEDRIVE_CLIENT_ID": `"${DEFAULT_GOOGLEDRIVE_CLIENT_ID}"`,
      "global.DEFAULT_GOOGLEDRIVE_CLIENT_SECRET":  `"${DEFAULT_GOOGLEDRIVE_CLIENT_SECRET}"`,
      "global.DEFAULT_BOX_CLIENT_ID": `"${DEFAULT_BOX_CLIENT_ID}"`,
      "global.DEFAULT_BOX_CLIENT_SECRET":  `"${DEFAULT_BOX_CLIENT_SECRET}"`,
      "global.DEFAULT_PCLOUD_CLIENT_ID": `"${DEFAULT_PCLOUD_CLIENT_ID}"`,
      "global.DEFAULT_PCLOUD_CLIENT_SECRET": `"${DEFAULT_PCLOUD_CLIENT_SECRET}"`,
      "global.DEFAULT_YANDEXDISK_CLIENT_ID": `"${DEFAULT_YANDEXDISK_CLIENT_ID}"`,
      "global.DEFAULT_YANDEXDISK_CLIENT_SECRET": `"${DEFAULT_YANDEXDISK_CLIENT_SECRET}"`,
      "global.DEFAULT_KOOFR_CLIENT_ID": `"${DEFAULT_KOOFR_CLIENT_ID}"`,
      "global.DEFAULT_KOOFR_CLIENT_SECRET": `"${DEFAULT_KOOFR_CLIENT_SECRET}"`,

      "process.env.NODE_DEBUG": `undefined`,
      "process.env.DEBUG": `undefined`,
      "globalThis.process.versions":  `undefined`,
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack. ProvidePlugin({
      process: "process/browser",
    }),
    new NodePolyfillPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve:  {
          fullySpecified:  false,
        },
      },
      {
        test: /node_modules[\/\\]clean-stack[\/\\]index\.js$/,
        loader: 'string-replace-loader',
        options: {
          search:  "from 'node:url'",
          replace: "from 'url'",
        },
      },
      {
        test: /\.worker\.ts$/,
        loader: "worker-loader",
        options: {
          inline: "no-fallback",
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude:  /node_modules/,
      },
      {
        test:  /\.svg? $/,
        type: "asset/source",
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve:  {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["browser", "module", "main"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      fs: false,
      http: false,
      https: false,
      net: false,
      path: require.resolve("path-browserify"),
      process: require.resolve("process/browser"),
      stream: require.resolve("stream-browserify"),
      tls: false,
      url: require.resolve("url/"),
      "node:url": require.resolve("url/"),
      vm: false,
    },
  },
  externals: {
    obsidian: "commonjs2 obsidian",
  },
  optimization: {
    minimize: true,
    minimizer:  [new TerserPlugin({ extractComments: false })],
  },
};