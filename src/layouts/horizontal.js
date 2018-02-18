const defaults = require('./_defaults');

const horizontal = {
  map: (step, index) => {
    return {
      ...step,
      layout: {
        x: String(defaults.stepWidth * index)
      }
    };
  }
};

module.exports = horizontal;
