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
      if (Object.keys(transformer.whitelist).includes(layoutName)) {
        const layout = transformer.whitelist[layoutName];
        output = steps.map(layout.map);
      } else {
        throw Error(`Layout "${layoutName}" not found`);
      }
    }

    return output;
  },
  whitelist: {
    horizontal: require('./layouts/horizontal'),
    vertical: require('./layouts/vertical')
  }
};

module.exports = transformer;
