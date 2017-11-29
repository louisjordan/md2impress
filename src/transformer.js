const transformer = {
  /**
   * transformer.map
   * accepts an array of steps and a layout
   * returns an array of transformed steps
   *
   * @param {array} input
   * @param {string} layout
   */
  apply(steps, layoutName = 'manual') {
    let output = steps;

    if (layoutName !== 'manual' && Object.keys(this.whitelist).includes(layoutName)) {
      const layout = this.whitelist[layoutName];
      output = steps.map(layout.map);
    }

    return output;
  },
  whitelist: {
    horizontal: require('./layouts/horizontal')
    // vertical: require('./layouts/vertical')
  }
};

module.exports = transformer;
