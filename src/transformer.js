const { loadAssets, isSupported } = require('./utils');

const layouts = loadAssets('layouts');

/**
 * transformer.map
 * accepts an array of steps and a layout
 * returns an array of transformed steps
 *
 * @param {array} input
 * @param {string} layout
 */
function transform(steps, layoutName) {
  if (layoutName !== 'manual' && isSupported('layouts', layoutName)) {
    const layout = layouts[layoutName];
    steps = steps.map(layout.map);
  }

  return steps;
}

module.exports = { transform };
