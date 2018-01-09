const layout = require('./radial');

const steps = [
  {
    attributes: {x: 0, y: 0},
    content: 'a'
  },
  {
    attributes: {x: 0, y: 0},
    content: 'b'
  },
  {
    attributes: {x: 0, y: 0},
    content: 'c'
  }
];

// 0 = 0
// 1 = 1000
// 2 = 1000
// 3 = 0
// 4 = -1000
// 5 = -1000



console.log(steps.map(layout.map))