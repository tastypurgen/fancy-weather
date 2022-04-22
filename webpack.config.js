const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env, options) => {
  const isProd = options.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',
    watch: !isProd,
    entry: ['./src/script.js', './src/sass/style.scss'],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'script.js',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, './dist')
      },
      compress: true,
      historyApiFallback: true,
      https: false,
      open: true,
      hot: true,
      port: 9002,
      proxy: {
        '/api': 'http://localhost:9000'
      },
      devMiddleware: {
        writeToDisk: true,
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: 'index.html' }),
      new MiniCssExtractPlugin({ filename: 'style.css' }),
      new CopyPlugin({
        patterns: [
          { from: './src/img', to: './img' },
          { from: './server', to: './' },
        ],
      }),
    ],

  };
};
