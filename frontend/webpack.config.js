const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // тепер один вхідний файл
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/', // для SPA роутів
  },
  devServer: {
    proxy: [
      {
        context: ['/api'],            // paths to proxy
        target: 'http://localhost:8000',  // backend URL
        changeOrigin: true,
        secure: false,
      },
    ],
    static: './dist',
    historyApiFallback: true, // щоб працювали React Router маршрути
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development'
};