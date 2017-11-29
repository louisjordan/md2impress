const parser = {
  /**
   * Parser.parse
   * accepts a markdown string
   * returns an array of steps
   *
   * step = {
   *   attributes: {x: 10, y: 100},
   *   content: '<h1>Slide title</h1>'
   * };
   *
   * @param {string} markdown
   */
  parse(markdown) {
    /* Extract presentation steps and convert into array of objects */
    return extractSteps(markdown).reduce(stepMarkdownReducer, []);
  }
};

/**
 * Split input markdown string into steps based on a regex pattern
 * @param {*} markdown
 */
const extractSteps = markdown => {
  const steps = markdown.split(/-{6}/); // TODO: Improve this splitting regex
  return steps;
};

/**
 * reducer function to convert array of step content strings into array of objects
 * objects contain:
 *   attributes object
 *   content string
 * @param {*} stepAccumulator
 * @param {*} content
 */
const stepMarkdownReducer = (stepAccumulator, content) => {
  stepAccumulator.push({
    attributes: extractStepAttributes(content),
    content
  });

  return stepAccumulator;
};

/**
 * extracts the attributes from a step's first comment
 * supports both colon and equals notations ( : or = )
 * step comments should look like this:
 *   <!-- x:1 y:0 rotate=200 -->
 * @param {*} content
 */
const extractStepAttributes = content => {
  const values = content.match(/\s?(\w+[:=]\w+)\s?/gi) || []; // TODO: 100% needs improvement

  const attributes = values.reduce((attrAccumulator, attr) => {
    const values = attr
      .replace(/^\s+|\s+$/g, '') // remove leading & trailing whitespace
      .split(/[:=]/); // split on : or =

    if (values.length === 2) attrAccumulator[values[0]] = values[1];

    return attrAccumulator;
  }, {});

  return attributes;
};

module.exports = parser;
