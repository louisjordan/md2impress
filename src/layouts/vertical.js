const stepHeight = 700;

const vertical = {
  map: (step, index) => {
    step.attributes = {
      y: String(stepHeight * index)
    };

    return step;
  }
};

module.exports = vertical;
