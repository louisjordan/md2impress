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
  generate(steps, style = 'default') {
    const stepsHtml = steps.reduce((html, step, index) => {
      const attrHtml = generator.serializeAttributes(step.attributes);
      const contentHtml = marked(step.content).replace(/<!--.+-->\n/, ''); // convert to html and remove comments

      const stepHtml = templates.step
        .replace('{{ id }}', step.id)
        .replace('{{ class }}', step.class ? step.class : '')
        .replace('{{ attributes }}', attrHtml)
        .replace('{{ content }}', contentHtml);

      html += stepHtml;

      return html;
    }, '');

    // merge html with template
    const html = templates.html
      .replace('{{ impressjs }}', templates.impressjs)
      .replace('{{ css }}', generator.styles[style].css)
      .replace('{{ steps }}', stepsHtml);

    return html;
  },
  styles: {
    default: require('./styles/default'),
    'impress-demo': require('./styles/impress-demo')
  },
  /**
   * Converts attributes array to string to be used in html
   * @param {object} attributes
   */
  serializeAttributes(attributes) {
    let string = '';

    for (const attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        // TODO: Whitelist attributes
        string += `data-${attr}="${attributes[attr]}" `;
      }
    }

    return string;
  }
};

module.exports = generator;
