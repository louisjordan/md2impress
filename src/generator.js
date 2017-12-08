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
      const attrHtml = generator.serializeAttributes(step.attributes);
      const contentHtml = marked(step.content).replace(/<!--.+-->\n/, ''); // convert to html and remove comments

      const stepHtml = templates.step
        .replace('{{ id }}', step.id)
        // TODO: check for 'class' in attributes -> insert into step html -> remove from attributes
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
        if (attr !== 'id') {
          string += `data-${attr}="${attributes[attr]}" `;
        }
      }
    }

    return string;
  }
};

module.exports = generator;
