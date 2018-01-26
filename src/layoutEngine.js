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
function applyLayout(steps, layout) {
  if (layout !== 'manual' && isSupported('layouts', layout)) {
    const layoutModule = layouts[layout];
    steps = steps.map(layoutModule.map);
  }

  return steps;
}

module.exports = { applyLayout };
