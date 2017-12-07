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
    const stepMarkdownReducer = (stepAccumulator, content, index) => {
      stepAccumulator.push({
        attributes: parseStepAttributes(content, index),
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
const parseStepAttributes = (content, index) => {
  const attrs = content.match(/(\w+[:=][-\w]+)/gi) || []; // TODO: 100% needs improvement

  const attributes = attrs.reduce((attrAccumulator, attr, i) => {
    const values = attr
      .replace(/^\s+|\s+$/g, '') // remove leading & trailing whitespace
      .split(/[:=]/); // split on : or =

    if (values.length === 2) attrAccumulator[values[0]] = values[1];

    return attrAccumulator;
  }, {});

  if (!attributes.id) {
    // if no id specified, look for a heading. Failing that, use a step index.
    const heading = content.match(/^#{1,6}\s(.+)/);

    attributes.id = heading
      ? heading[0].replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]+/g, '')
      : `step-${index}`;
  }

  return attributes;
};

module.exports = parser;
