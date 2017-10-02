const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mdtoimpress.min.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  target: 'web',
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor-[hash].min.js'
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    })
  ]
};

module.exports = config;
