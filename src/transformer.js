const { layouts } = require('./supported');

const transformer = {
  /**
   * transformer.map
   * accepts an array of steps and a layout
   * returns an array of transformed steps
   *
   * @param {array} input
   * @param {string} layout
   */
  transform(steps, layoutName) {
    let output = steps;

    if (layoutName !== 'manual') {
      if (!Object.keys(transformer.layouts).includes(layoutName)) throw Error(`Layout "${layoutName}" not found`);

      const layout = transformer.layouts[layoutName];
      output = steps.map(layout.map);
    }

    return output;
  },
  layouts: loadLayouts(layouts)
};

/**
 * load supported css files
 * @param {string} style
 */
function loadLayouts(layouts) {
  return layouts.reduce((acc, curr) => {
    acc[curr] = require(`./layouts/${curr}`);
    return acc;
  }, {});
}

module.exports = transformer;
