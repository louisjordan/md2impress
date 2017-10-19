const parser = require('../src/parser.js');

let simpleTest, complexTest;

beforeAll(() => {
  simpleTest = parser.parse(`# Test 1`);
  complexTest = parser.parse(
    `<!-- x=100 y=10 --> 
    # H1 
    ------ 
    <!-- x=200 y=20 --> 
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
  test('should contain the correct attributes', () => {
    expect(complexTest[0].attributes.x).toBe('100');
    expect(complexTest[0].attributes.y).toBe('10');
    expect(complexTest[1].attributes.x).toBe('200');
    expect(complexTest[1].attributes.y).toBe('20');
  });
});

describe('step content string', () => {
  test('should contain correct html', () => {
    expect(simpleTest[0].content).toBe('<h1>Test 1</h1>');
    expect(complexTest[0].content).toBe('<h1>H1</h1>');
    expect(complexTest[1].content).toBe('<h2>H2</h2>');
  });
});
