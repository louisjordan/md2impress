const { parse } = require('./parser');
const { layout } = require('./layoutEngine');
const { generate } = require('./generator');
const { isSupported } = require('./utils');


function md2impress(
  markdown,
  { layoutName = 'manual', style = 'basic', title = 'Presentation' } = {}
) {
  if (layoutName !== 'manual' && !isSupported('layouts', layoutName))
    throw Error(`Layout '${layoutName}' is not supported`);
  if (style !== 'basic' && !isSupported('styles', style))
    throw Error(`Style '${style}' is not supported`);

  const html = generate(layout(parse(markdown), layoutName), style, title);

  return html;
}

if (typeof window !== 'undefined') window.md2impress = md2impress;

module.exports = md2impress;
