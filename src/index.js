const { parse } = require('./parser');
const { transform } = require('./transformer');
const { generate } = require('./generator');

function md2impress(markdown, layout = 'manual') {
  // TODO: Check layout is supported - transformer.whitelist
  return generate(transform(parse(markdown), layout));
}

if (typeof window !== 'undefined') window.md2impress = md2impress;

module.exports = md2impress;
