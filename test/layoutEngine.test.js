const { applyLayout } = require('../src/layoutEngine');

const simpleSteps = [{ attributes: { x: '0', y: '0' } }];

describe('layoutEngine', () => {
  test('should return an array of steps', () => {
    expect(Array.isArray(applyLayout(simpleSteps))).toBe(true);
  });

  test('should not alter attributes if a null or manual layout is provided', () => {
    expect(applyLayout(simpleSteps)[0].attributes.x).toBe('0');
    expect(applyLayout(simpleSteps)[0].attributes.y).toBe('0');
    expect(applyLayout(simpleSteps, 'manual')[0].attributes.x).toBe('0');
    expect(applyLayout(simpleSteps, 'manual')[0].attributes.y).toBe('0');
  });
});

// TODO: test manual layout
// TODO: test horizontal layout
// TODO: test vertical layout
