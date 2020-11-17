const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require('fs');
const postcssPlugins = require( '@wordpress/postcss-plugins-preset' );
let UnminifiedWebpackPlugin = require('unminified-webpack-plugin');


module.exports = {
  entry: "./src/index.js",
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "../src"),
    filename: "bundle.min.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/@wordpress"),
          // path.resolve(__dirname, "node_modules/swiper")
        ],
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "node_modules/@wordpress"),
          path.resolve(__dirname, "node_modules/swiper")
        ],
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, "node_modules/@wordpress"),
          path.resolve(__dirname, "node_modules/swiper")
        ],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new UnminifiedWebpackPlugin()
  ],
  // devServer: {
  //   https: true,
  //   host: 'lp5-ann19-dsy.dsone.3ds.com',
  //   port: 8100,
  //   compress: true,
  //   disableHostCheck: true,
  //   https: {
  //     key: fs.readFileSync('C:/xampp/apache/crt/lp5-ann19-dsy.dsone.3ds.com/server.key', 'utf8'),
  //     cert: fs.readFileSync('C:/xampp/apache/crt/lp5-ann19-dsy.dsone.3ds.com/server.crt', 'utf8'),
  //   },
  //   contentBase: path.join(__dirname, 'src'),
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  //     "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  //   }
  // }
};
