const { loadAssets, isSupported } = require('./utils');

const layouts = loadAssets('layouts');

/**
 * layout
 * accepts an array of steps and a layout
 * returns an array of steps with altered layout attributes
 *
 * @param {Array} input
 * @param {String} layout
 */
function layout(steps, layoutName) {
  if (layoutName !== 'manual' && isSupported('layouts', layoutName)) {
    const layoutModule = layouts[layoutName];
    steps = steps.map(layoutModule.map);
  }

  return steps;
}

module.exports = { layout };
