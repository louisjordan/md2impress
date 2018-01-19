const transformer = require('../src/transformer');

const simpleSteps = [{ attributes: { x: '0', y: '0' } }];

describe('transformer', () => {
  test('should return an array of steps', () => {
    expect(Array.isArray(transformer.transform(simpleSteps))).toBe(true);
  });

  test('should not alter attributes if a null or manual layout is provided', () => {
    expect(transformer.transform(simpleSteps)[0].attributes.x).toBe('0');
    expect(transformer.transform(simpleSteps)[0].attributes.y).toBe('0');
    expect(transformer.transform(simpleSteps, 'manual')[0].attributes.x).toBe('0');
    expect(transformer.transform(simpleSteps, 'manual')[0].attributes.y).toBe('0');
  });
});

// TODO: test manual layout
// TODO: test horizontal layout
// TODO: test vertical layout
