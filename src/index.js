const { parse } = require('./parser');
const { applyLayout } = require('./layoutEngine');
const { generate } = require('./generator');
const { isSupported } = require('./utils');
const supported = require('./supported');

function md2impress(markdown, { layout = 'manual', style = 'basic', title = 'Presentation' } = {}) {
  if (layout !== 'manual' && !isSupported('layouts', layout)) throw Error(`Layout '${layout}' is not supported`);
  if (style !== 'basic' && !isSupported('styles', style)) throw Error(`Style '${style}' is not supported`);

  const html = generate(applyLayout(parse(markdown), layout), style, title);

  return html;
}

if (typeof window !== 'undefined') {
  window.md2impress = md2impress;
  window.supported = supported;
}

module.exports = md2impress;
