const defaults = require('./_defaults');

const radial = {
  map: (step, index) => {
    step.attributes = {
      x: Math.sign(Math.sin(index)) * defaults.stepWidth * index,
      y: Math.sign(Math.sin(index)) * defaults.stepHeight * index,
      z: index * 100,
      scale: index,
      rotate: index * 45
    };

    return step;
  }
};

module.exports = radial;
