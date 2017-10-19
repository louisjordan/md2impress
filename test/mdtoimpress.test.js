const helpers = require('./helpers');
const mdtoimpress = require('../src');

describe('mdtoimpress', () => {
  test('should return a string', () => {
    expect(typeof mdtoimpress('hi')).toBe('string');
  });

  describe('should return the correct html output for a given markdown input', () => {
    let inputs, outputs;

    beforeAll(() => {
      inputs = helpers.loadTestInputs();
      outputs = helpers.loadTestOutputs();
    });

    test('test_1_input.md should return test_1_output.html', () => {
      expect(mdtoimpress(inputs[0])).toBe(outputs[0]);
    });
  });
});
