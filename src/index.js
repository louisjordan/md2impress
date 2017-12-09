const { parse } = require('./parser');
const { transform, layouts } = require('./transformer');
const generator = require('./generator');

function md2impress(markdown, { layout = 'manual', style = 'basic', title = 'Presentation' } = {}) {
  if (layout !== 'manual' && !Object.keys(layouts).includes(layout)) throw Error(`Layout '${layout}' is not supported`);
  if (style !== 'basic' && !Object.keys(generator.styles).includes(style))
    throw Error(`Style '${style}' is not supported`);

  return generator.generate(transform(parse(markdown), layout), style, title);
}

if (typeof window !== 'undefined') window.md2impress = md2impress;

module.exports = md2impress;
