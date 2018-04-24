const { JSDOM } = require('jsdom');
const { generate } = require('../src/generator');

describe('generator', () => {
  test('[G1] presentation body is wrapped in a div with an id of impress', () => {
    const step = [];
    const dom = new JSDOM(generate(step));
    const doc = dom.window.document;

    expect(doc.querySelectorAll('body > #impress').length).toBe(1);
  });

  test('[G2] each step contains a step class list item', () => {
    const step = [{ content: '' }, { content: '' }];
    const dom = new JSDOM(generate(step));
    const doc = dom.window.document;

    expect(doc.querySelectorAll('#impress > div')[0].className).toContain('step');
    expect(doc.querySelectorAll('#impress > div')[1].className).toContain('step');
  });

  test('[G3] layout attributes are correctly generated as HTML5 data-* attributes', () => {
    const step = [{ layout: { x: '100', y: '200' }, content: '' }];
    const dom = new JSDOM(generate(step));
    const doc = dom.window.document;

    expect(doc.querySelectorAll('#impress .step')[0].dataset).toMatchObject(step[0].layout);
  });

  test('[G4] ID and class attributes are generated correctly (not as data-* attributes)', () => {
    const step = [{ metadata: { id: 'step-one', class: 'slide' }, content: '' }];
    const dom = new JSDOM(generate(step));
    const doc = dom.window.document;

    expect(doc.querySelectorAll('#impress .step')[0].id).toBe(step[0].metadata.id);
    expect(doc.querySelectorAll('#impress .step')[0].classList).toContain(step[0].metadata.class);
  });

  test('[G5] layout attributes are correctly generated as HTML5 data-* attributes', () => {
    const step = [{ content: '# First Slide' }, { content: '## Second Slide' }];
    const dom = new JSDOM(generate(step));
    const doc = dom.window.document;

    expect(doc.querySelector('#impress .step').querySelector('h1').textContent).toBe('First Slide');
    expect(doc.querySelectorAll('#impress .step')[1].querySelector('h2').textContent).toBe('Second Slide');
  });
});
