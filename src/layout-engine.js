const layoutEngine = {
  /**
   * layoutEngine.map
   * accepts an array of steps and a layout
   * returns an array of transformed steps
   * 
   * @param {array} input 
   * @param {string} layout
   */
  map: (input, layoutName = 'manual') => {
    let output = input;

    if (layoutName != 'manual') {
      const layout = require(`./layouts/${layoutName}`);
      output = input.map(layout.map);
    }

    return output;
  }
};

module.exports = layoutEngine;
