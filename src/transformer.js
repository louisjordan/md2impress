const transformer = {
  /**
   * transformer.map
   * accepts an array of steps and a layout
   * returns an array of transformed steps
   * 
   * @param {array} input 
   * @param {string} layout
   */
  apply: (input, layoutName = 'manual') => {
    let output = input;

    // TODO: Add layout file check
    if (layoutName != 'manual') {
      const layout = require(`./layouts/${layoutName}`);
      output = output.map(layout.map);
    }

    return output;
  }
};

module.exports = transformer;
