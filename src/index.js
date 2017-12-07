const { parse } = require('./parser');
const { transform, whitelist } = require('./transformer');
const { generate } = require('./generator');

function md2impress(markdown, layout = 'manual') {
  if (layout !== 'manual' && !Object.keys(whitelist).includes(layout))
    throw Error(`Layout '${layout}' is not supported`);

  return generate(transform(parse(markdown), layout));
}

if (typeof window !== 'undefined') window.md2impress = md2impress;

module.exports = md2impress;
