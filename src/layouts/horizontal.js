const stepWidth = 900;

const horizontal = {
  map: (step, index) => {
    step.attributes.x = String(stepWidth * index);
    return step;
  }
};

module.exports = horizontal;