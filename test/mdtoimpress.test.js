const mdtoimpress = require('../src');

describe('mdtoimpress', () => {
  test('should return a string', () => {
    expect(typeof mdtoimpress('hi')).toBe('string');
  });
});
