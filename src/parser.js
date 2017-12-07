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
    if (typeof markdown !== 'string')
      throw Error(`Input must be of type string not ${typeof markdown}`);

    // reducer function to convert array of step content strings into array of objects
    const stepMarkdownReducer = (stepAccumulator, content) => {
      stepAccumulator.push({
        attributes: parseStepAttributes(content),
        content
      });

      return stepAccumulator;
    };

    return parseSteps(markdown).reduce(stepMarkdownReducer, []);
  }
};

/**
 * Split input markdown string into steps based on a regex pattern
 * @param {*} markdown
 */
const parseSteps = markdown => {
  const steps = markdown.split(/-{6}/); // TODO: Improve this splitting regex
  return steps;
};

/**
 * parses the attributes from a step's first comment
 * supports both colon and equals notations ( : or = )
 * step comments should look like this:
 *   <!-- x:1 y:0 rotate=200 -->
 * @param {*} content
 */
const parseStepAttributes = content => {
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
