const supported = require('./supported');
const path = require('path');

function isSupported(type, name) {
  if (type && name) return Object.keys(supported).includes(type) && supported[type].includes(name);
  else if (type) return Object.keys(supported).includes(type);
}

function loadAssets(type) {
  if (!isSupported(type)) return false;

  const isBrowser = typeof window !== 'undefined';
  const ext = type === 'layouts' ? 'js' : 'css';
  const assets = supported[type];

  const reducer = (assetAcc, asset) => {
    if (isBrowser) {
      assetAcc[asset] = require(`./${type}/${asset}.${ext}`);
    } else {
      const fs = require('fs');
      assetAcc[asset] = fs.readFileSync(path.join(__dirname, `./${type}/${asset}.${ext}`), 'utf8');
    }

    return assetAcc;
  };

  return assets.reduce(reducer, {});
}

module.exports = { loadAssets, isSupported };
