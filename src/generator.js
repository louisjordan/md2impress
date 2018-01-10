const marked = require('marked');
const path = require('path');
const { templates } = require('./templates');
const { loadAssets } = require('./utils');

const styles = loadAssets('styles');

/**
 * converts presentation steps into html
 *
 * accepts an array of steps
 * returns a html string
 * @param {array} steps
 */
function generate(steps, style, title = 'Presentation') {
  const stepsHtml = steps.reduce((html, step, index) => {
    const attrHtml = serializeLayoutAttributes(step.layout);
    const contentHtml = marked(step.content).replace(/<!--.+-->\n/, ''); // convert to html and remove comments

    const stepHtml = templates.step
      .replace('{{ id }}', step.metadata.id)
      .replace('{{ class }}', step.metadata.class ? step.metadata.class : '')
      .replace('{{ attributes }}', attrHtml)
      .replace('{{ content }}', contentHtml);

    html += stepHtml;

    return html;
  }, '');

  // merge html with template
  const html = templates.html
    .replace('{{ title }}', title)
    .replace('{{ impressjs }}', templates.impressjs)
    .replace('{{ css }}', styles[style])
    .replace('{{ steps }}', stepsHtml);

  return html;
}

/**
 * Converts attributes array to string to be used in html
 * @param {object} attributes
 */
function serializeLayoutAttributes(attributes) {
  let string = '';

  for (const attr in attributes) {
    if (attributes.hasOwnProperty(attr)) {
      string += `data-${attr}="${attributes[attr]}" `;
    }
  }

  return string;
}

module.exports = { generate };
