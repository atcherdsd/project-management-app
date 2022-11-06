/* eslint-disable */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', 'jsx', '.js'],
  },
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    assetModuleFilename: (pathData) => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name][hash][ext]`;
    },
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './src/index.html', favicon: './src/assets/favicon.svg' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './src/static', to: './', noErrorOnMissing: true }],
    }),
    new ESLintPlugin({ extensions: ['tsx', 'ts'] }),
  ],
  devServer: {
    port: 3000,
    open: true,
    hot: false,
    liveReload: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};