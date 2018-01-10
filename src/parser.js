// replace spaces with hyphens and remove any non-word characters
const sanitize = str => str.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]+/g, '');

const layoutAttributes = [
  'x',
  'y',
  'z',
  'rotate',
  'rotate-x',
  'rotate-y',
  'rotate-z',
  'rotate-order',
  'scale'
];

/**
 * Parser.parse
 * accepts a markdown string
 * returns an array of steps
 *
 * step = {
 *   attributes: {x: 10, y: 100},
 *   content: '<h1>Slide title</h1>',
 *   id: 'step-1',
 *   class: 'slide blue'
 * };
 *
 * @param {string} markdown
 */
function parse(markdown) {
  if (typeof markdown !== 'string')
    throw Error(`Input must be of type string not ${typeof markdown}`);

  const steps = splitSteps(markdown).map((content, index) => {
    // map step string to step object

    const stepAttributes = parseStepAttributes(content);

    const step = {
      layout: extractLayoutAttributes(stepAttributes),
      metadata: extractMetaData(stepAttributes),
      content
    };

    // if no id attribute specified, look for a heading. Failing that, use a step index
    if (!step.metadata.id) {
      const heading = content.match(/^#{1,6}\s+(.+)/);
      step.metadata.id =
        heading && heading.length ? sanitize(heading[1]) : `step-${index}`;
    }

    // if class attribute is found, replace delimiter with a space
    if (step.metadata.class) {
      step.metadata.class = step.metadata.class.replace(/,/g, ' ');
    }

    return step;
  });

  return steps;
}

/**
 * Split input markdown string into steps based on a regex pattern
 * @param {*} markdown
 */
function splitSteps(markdown) {
  const steps = markdown.split(/[-=]{4,8}/); // TODO: Improve this splitting regex
  return steps;
}

/**
 * parses the attributes from a step's first comment
 * supports both colon and equals notations ( : or = )
 * step comments should look like this:
 *   <!-- x:1 y:0 rotate=200 -->
 * @param {*} content
 */
function parseStepAttributes(content) {
  const attrs = content.match(/(\w+[:=][,-\w]+)/gi) || []; // TODO: 100% needs improvement

  const attributes = attrs.reduce((attrAccumulator, attr, i) => {
    const values = attr
      .replace(/^\s+|\s+$/g, '') // remove leading & trailing whitespace
      .split(/[:=]/); // split on : or =

    if (values.length === 2) attrAccumulator[values[0]] = values[1];

    return attrAccumulator;
  }, {});

  return attributes;
}

function extractLayoutAttributes(attributes) {
  return Object.keys(attributes).reduce((acc, attr) => {
    if (layoutAttributes.indexOf(attr) > -1) {
      acc[attr] = attributes[attr];
    }
    return acc;
  }, {});
}

function extractMetaData(attributes) {
  return Object.keys(attributes).reduce((acc, attr) => {
    if (layoutAttributes.indexOf(attr) === -1) {
      acc[attr] = attributes[attr];
    }
    return acc;
  }, {});
}

module.exports = { parse };
