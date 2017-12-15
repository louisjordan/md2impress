const webpack = require('webpack');
const path = require('path');

const config = {
  devtool: 'source-map',
  target: 'web',
  entry: './src',
  output: {
    path: [path.resolve(__dirname, 'dist'), path.resolve(__dirname, 'gh-pages/src/assets')],
    filename: 'md2impress.min.js',
    libraryTarget: 'browser'
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
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: false
      }
    })
  ]
};

const ghpages = Object.assign({}, config, {
  output: {
    path: path.resolve(__dirname, 'gh-pages/src/assets'),
    filename: 'md2impress.min.js'
  }
});

const md2impress = Object.assign({}, config, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'md2impress.min.js'
  }
});

module.exports = [ghpages, md2impress];
