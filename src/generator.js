const marked = require('marked');
const { templates } = require('./templates');

const generator = {
  /**
   * converts presentation steps into html
   *
   * accepts an array of steps
   * returns a html string
   * @param {array} steps
   */
  generate(steps) {
    const stepsHtml = steps.reduce((html, step, index) => {
      const attrHtml = serializeAttributes(step.attributes);
      const contentHtml = marked(step.content).replace(/<!--.+-->\n/, ''); // convert to html and remove comments
      const stepHtml = templates.step
        .replace('{{ id }}', `id-${index}`) // TODO: step id, from h1/h2?
        .replace('{{ attributes }}', attrHtml)
        .replace('{{ content }}', contentHtml);

      html += stepHtml;

      return html;
    }, '');

    // merge html with template
    const html = templates.html
      .replace('{{ impressjs }}', templates.impressjs)
      .replace('{{ impresscss }}', templates.impresscss)
      .replace('{{ steps }}', stepsHtml);

    return html;
  }
};

module.exports = generator;

/**
 * Converts attributes array to string to be used in html
 * @param {object} attributes
 */
const serializeAttributes = attributes => {
  let string = '';

  for (const attr in attributes) {
    if (attributes.hasOwnProperty(attr)) {
      // TODO: Whitelist attributes
      string += `data-${attr}="${attributes[attr]}" `;
    }
  }

  return string;
};
