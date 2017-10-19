const layoutEngine = require('../src/layout-engine');

const steps = [{ attributes: { x: 0, y: 0 } }];

describe('layout engine', () => {
  test('should return an array of steps', () => {
    expect(Array.isArray(layoutEngine.map(steps))).toBe(true);
  });
});

// TODO: test manual layout
// TODO: test horizontal layout
// TODO: test vertical layout
