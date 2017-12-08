const transformer = {
  /**
   * transformer.map
   * accepts an array of steps and a layout
   * returns an array of transformed steps
   *
   * @param {array} input
   * @param {string} layout
   */
  transform(steps, layoutName = 'manual') {
    let output = steps;

    if (layoutName !== 'manual') {
      if (!Object.keys(transformer.layouts).includes(layoutName))
        throw Error(`Layout "${layoutName}" not found`);

      const layout = transformer.layouts[layoutName];
      output = steps.map(layout.map);
    }

    return output;
  },
  layouts: {
    horizontal: require('./layouts/horizontal'),
    vertical: require('./layouts/vertical')
  }
};

module.exports = transformer;
