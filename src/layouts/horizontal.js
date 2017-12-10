const defaults = require('./_defaults');

const horizontal = {
  map: (step, index) => {
    step.attributes = {
      x: String(defaults.stepWidth * index)
    };

    return step;
  }
};

module.exports = horizontal;
