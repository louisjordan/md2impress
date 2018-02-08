const { parse } = require('../src/parser.js');
const data = require('./data').parser;

describe('parser', () => {
  test('should return an array', () => {
    expect(Array.isArray(parse(data.p1[0]))).toBe(true);
  });

  test(' [P1] should split the input into the correct number of steps', () => {
    expect(parse(data.p1[0]).length).toBe(1);
    expect(parse(data.p1[1]).length).toBe(2);
  });

  test(' [P2] should split steps on a new line followed by at least four hyphens followed by an end of line', () => {
    expect(parse(data.p2[0]).length).toBe(2);
    expect(parse(data.p2[1]).length).toBe(2);
  });

  test(' [P3] should split steps on a new line followed by at least four equals signs followed by an end of line', () => {
    expect(parse(data.p3[0]).length).toBe(2);
    expect(parse(data.p3[1]).length).toBe(2);
  });

  test(' [P4] should not split steps on a new line followed by less than four hyphens or equals signs followed by an end of line', () => {
    expect(parse(data.p4[0]).length).toBe(1);
    expect(parse(data.p4[1]).length).toBe(1);
  });

  test(' [P5] should not split steps on a new line followed by a combination of least four hyphens and equals signs', () => {
    expect(parse(data.p5[0]).length).toBe(1);
  });

  test(' [P6] should not split the steps if delimiter is not followed by an end of line', () => {
    expect(parse(data.p6[0]).length).toBe(1);
  });

  test(' [P7] should return the correct layout attributes for a step', () => {
    expect(parse(data.p7[0])[0].layout).toMatchObject({ x: '1', y: '2', z: '3', rotate: '180' });
  });

  test(' [P8] should only parse attributes within a comment', () => {
    expect(parse(data.p8[0])[0].layout).toMatchObject({ x: '10' });
  });

  test(' [P9] should allow both colon and equals signs as key/value separator', () => {
    expect(parse(data.p9[0])[0].layout).toMatchObject({ x: '1', y: '2' });
  });

  test('[P10] should properly separate layout attributes and metadata', () => {
    const step = parse(data.p10[0])[0];
    expect(step.layout).toMatchObject({ x: '100' });
    expect(step.metadata).toMatchObject({ id: 'intro', class: 'blue' });
  });

  test('[P11] if no id attribute is supplied for a step, parser should use a sanitized version of the first heading found as id', () => {
    const step = parse(data.p11[0])[0];
    expect(step.layout).toMatchObject({ x: '10' });
    expect(step.metadata).toMatchObject({ id: 'slide-one' });
  });

  test('[P12] if no id attribute is supplied and the step contains no heading, parser should use the step index as id', () => {
    const step = parse(data.p12[0])[0];
    expect(step.layout).toMatchObject({ x: '100' });
    expect(step.metadata).toMatchObject({ id: 'step-0' });
  });

  test('[P13] class metadata attribute values should be split by a comma and stored as a string with each class name separated by a space', () => {
    const step = parse(data.p13[0])[0];
    expect(step.metadata).toMatchObject({ class: 'slide blue' });
  });
});
