const defaults = require('./_defaults');

const thetaStart = 100;
const a = 200;
const b = 1.4;

const spiral = {
  map: (step, index) => {
    // archimedean spiral https://en.wikipedia.org/wiki/Archimedean_spiral
    const theta = thetaStart + index * 200;
    const r = a + b * theta;

    // polar to cartesian conversion https://en.wikipedia.org/wiki/Polar_coordinate_system#Converting_between_polar_and_Cartesian_coordinates
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    // rotation
    const rotate = 60 * index;

    // depth
    const z = -defaults.perspective * index;

    step = {
      ...step,
      layout: { x, y, z, rotate }
    };

    return step;
  }
};

module.exports = spiral;
