const parser = require('../src/parser.js');

beforeAll(() => {
  const simpleTest = parser.parse(`# Test 1`);
  const complexTest = parser.parse(
    `<!-- x=10 y=100 --> 
    # H1 
    ------ 
    <!-- x=100 y=10 --> 
    ## H2`
  );
});

describe('parser', () => {
  test('should return an array', () => {
    expect(typeof simpleTest).toBe('array');
  });

  test('should return the correct size array', () => {
    expect(simpleTest.length).toBe(1);
    expect(complexTest.length).toBe(2);
  });
});

describe('step array item', () => {
  test('should be an object', () => {
    expect(typeof simpleTest[0]).toBe('object');
  });

  test('should contain an attributes object', () => {
    expect(typeof simpleTest[0].attributes).toBe('object');
  });

  test('should contain a content string', () => {
    expect(typeof simpleTest[0].content).toBe('string');
  });
});

describe('step attributes object', () => {
  test('should be an object', () => {
    expect(typeof simpleTest[0]).toBe('object');
  });

  test('should contain an attributes object', () => {
    expect(typeof simpleTest[0].attributes).toBe('object');
  });

  test('should contain a content string', () => {
    expect(typeof simpleTest[0].content).toBe('string');
  });
});
