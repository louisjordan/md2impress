const { applyLayout } = require('../src/layoutEngine');

describe('layoutEngine', () => {
  test('should return an array of steps', () => {
    const step = [{ layout: { x: '100', y: '200' } }];
    expect(Array.isArray(applyLayout(step))).toBe(true);
  });

  test('[LE1] does not alter layout attributes if ‘manual’ or no layout is chosen', () => {
    const step = [{ layout: { x: '100', y: '200' } }];

    expect(applyLayout(step)[0].layout.x).toBe(step[0].layout.x);
    expect(applyLayout(step)[0].layout.y).toBe(step[0].layout.y);

    expect(applyLayout(step, 'manual')[0].layout.x).toBe(step[0].layout.x);
    expect(applyLayout(step, 'manual')[0].layout.y).toBe(step[0].layout.y);
  });

  test('[LE2] layout modules replace entire layout attribute object', () => {
    const steps = [{ layout: { x: '100', y: '200' } }, { layout: { x: '1000', z: '30' } }];

    expect(applyLayout(steps, 'horizontal')[0].layout.x).toBe('0');
    expect(applyLayout(steps, 'horizontal')[0].layout.y).toBeUndefined();

    expect(applyLayout(steps, 'horizontal')[1].layout.x).toBe('1300');
    expect(applyLayout(steps, 'horizontal')[1].layout.z).toBeUndefined();
  });

  test('[LE3] horizontal layout module formats presentation slides horizontally using the constant step width value', () => {
    const steps = [{ layout: {} }, { layout: {} }, { layout: {} }];

    expect(applyLayout(steps, 'horizontal')[0].layout.x).toBe('0');
    expect(applyLayout(steps, 'horizontal')[1].layout.x).toBe('1300');
    expect(applyLayout(steps, 'horizontal')[2].layout.x).toBe('2600');
  });

  test('[LE4] vertical layout module formats presentation slides vertically using the constant step height value', () => {
    const steps = [{ layout: {} }, { layout: {} }, { layout: {} }];

    expect(applyLayout(steps, 'vertical')[0].layout.y).toBe('0');
    expect(applyLayout(steps, 'vertical')[1].layout.y).toBe('900');
    expect(applyLayout(steps, 'vertical')[2].layout.y).toBe('1800');
  });
});
