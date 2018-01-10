const defaults = require('./_defaults');

const vertical = {
  map: (step, index) => {
    step.layout = {
      y: String(defaults.stepHeight * index)
    };

    return step;
  }
};

module.exports = vertical;
