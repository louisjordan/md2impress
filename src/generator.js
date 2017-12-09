const marked = require('marked');
const path = require('path');
const { templates } = require('./templates');
const { styles } = require('./supported');

const generator = {
  /**
   * converts presentation steps into html
   *
   * accepts an array of steps
   * returns a html string
   * @param {array} steps
   */
  generate(steps, style, title = 'Presentation') {
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
      .replace('{{ title }}', title)
      .replace('{{ impressjs }}', templates.impressjs)
      .replace('{{ css }}', generator.styles[style])
      .replace('{{ steps }}', stepsHtml);

    return html;
  },
  styles: loadStyles(styles),
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

/**
 * load supported css files
 * @param {string} style
 */
function loadStyles(styles) {
  const reducer =
    typeof window !== 'undefined'
      ? // if in browser, use webpack's raw-loader
        (acc, curr) => {
          acc[curr] = require(`./styles/${curr}.css`);
          return acc;
        }
      : // if in node, use fs
        (() => {
          const fs = require('fs'); // load fs won't load in browser
          return (acc, curr) => {
            acc[curr] = fs.readFileSync(path.join(__dirname, `./styles/${curr}.css`), 'utf8');
            return acc;
          };
        })();

  return styles.reduce(reducer, {});
}

module.exports = generator;
