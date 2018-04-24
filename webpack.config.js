const webpack = require('webpack');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const config = {
  devtool: 'source-map',
  target: 'web',
  entry: './src',
  output: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2']
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
      'process.env.NODE_ENV': `"${env}"`
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

// send a build to web app
const app = Object.assign({}, config, {
  output: {
    path: path.resolve(__dirname, 'app/src/assets'),
    filename: 'md2impress.min.js'
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
    }),
    new webpack.BannerPlugin({ banner: '// eslint-disable-next-line', raw: true })
  ]
});

const md2impress = Object.assign({}, config, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'md2impress.min.js'
  }
});

module.exports = [app, md2impress];
