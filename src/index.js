const { parse } = require('./parser');
const { transform, layouts } = require('./transformer');
const { generate, styles } = require('./generator');

function md2impress(markdown, { layout = 'manual', style = 'default', title = 'Presentation' } = {}) {
  if (layout !== 'manual' && !Object.keys(layouts).includes(layout)) throw Error(`Layout '${layout}' is not supported`);
  if (style !== 'default' && !Object.keys(styles).includes(style)) throw Error(`Style '${style}' is not supported`);

  return generate(transform(parse(markdown), layout), style, title);
}

if (typeof window !== 'undefined') window.md2impress = md2impress;

module.exports = md2impress;
