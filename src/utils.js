const supported = require('./supported');
const path = require('path');

const isBrowser = typeof window !== 'undefined';

function isSupported(type, name) {
  if (type && name) return Object.keys(supported).includes(type) && supported[type].includes(name);
  else if (type) return Object.keys(supported).includes(type);
}

function loadAssets(assetType) {
  if (!isSupported(assetType)) return false;

  const ext = assetType === 'layouts' ? 'js' : 'css';
  const assets = supported[assetType]; // find supported assets of the requested type

  const reducer = (assetAcc, asset) => {
    if (isBrowser || assetType === 'layouts') {
      // webpack resolves require if we're in browser
      // in node requires work for js files
      assetAcc[asset] = require(`./${assetType}/${asset}.${ext}`);
    } else {
      // in node, read css from file using node fs module
      const fs = require('fs');
      assetAcc[asset] = fs.readFileSync(path.join(__dirname, `./${assetType}/${asset}.${ext}`), 'utf8');

      const _defaultCss = fs.readFileSync(path.join(__dirname, `./styles/_defaults.css`), 'utf8');

      // replace @import "_defaults.css"; (and other import variations) with _default.css file as the import wont be resolved by node
      assetAcc[asset] = assetAcc[asset].replace(/^@import (url\()?['"]_defaults.css['"]\(?.+$/m, _defaultCss);
    }

    return assetAcc;
  };

  return assets.reduce(reducer, {}); // loop through supported assets and load them
}

module.exports = { loadAssets, isSupported, isBrowser };
