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
  'scale',
  'autoplay'
];

/**
 * Parser.parse
 * accepts a markdown string
 * returns an array of steps
 *
 * <!-- x:10 y:100 id:step-1 class:slide,blue -->
 * step = {
 *   layout: {x: 10, y: 100},
 *   metadata: {id: 'step-1', class: 'slide blue'}
 *   content: '<h1>Slide title</h1>'
 * };
 *
 * @param {string} markdown
 */
function parse(markdown) {
  if (typeof markdown !== 'string') throw Error(`Input must be of type string not ${typeof markdown}`);

  const steps = splitSteps(markdown).map((content, index) => {
    const stepAttributes = parseStepAttributes(content);

    const step = {
      layout: stepAttributes.layout,
      metadata: stepAttributes.metadata,
      content
    };

    // if no id attribute specified, look for a heading. Failing that, use step index
    if (!step.metadata.id) {
      const heading = content.match(/^#{1,6}\s+(.+)/m);
      step.metadata.id = heading && heading.length ? sanitize(heading[1]).toLowerCase() : `step-${index}`;
    }

    // if class attribute is found, replace seperator with a space
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
  let steps = markdown.split(/^={4,}$|^-{4,}$/m); // split on at least four hyphens or equals
  steps = steps.map(content => content.trim());
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
  const attrStringMatch = content.match(/^<!--(.+)-->/);

  const attrs =
    attrStringMatch && attrStringMatch.length > 1 && attrStringMatch[1].trim().length
      ? attrStringMatch[1].match(/([\w-]+[:=][,-\w]+)/gi)
      : [];

  // convert attribute strings into object
  const attributes = attrs.reduce((attrAccumulator, attr, i) => {
    const values = attr.trim().split(/[:=]/); // split on : or =

    if (values.length === 2) attrAccumulator[values[0]] = values[1];

    return attrAccumulator;
  }, {});

  return organiseAttributes(attributes);
}

// organise attributes into metadata and layout
function organiseAttributes(attributes) {
  const organisedAttributes = Object.keys(attributes).reduce(
    (acc, attr) => {
      if (layoutAttributes.includes(attr)) {
        acc.layout[attr] = attributes[attr];
      } else {
        acc.metadata[attr] = attributes[attr];
      }

      return acc;
    },
    { metadata: {}, layout: {} }
  );

  return organisedAttributes;
}

module.exports = { parse };
