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

    return parser.splitSteps(markdown).map((content, index) => {
      // map step string to step object
      const step = {
        attributes: parser.parseStepAttributes(content),
        content
      };

      // if no id attribute specified, look for a heading. Failing that, use a step index
      if (!step.attributes.id) {
        const heading = content.match(/^#{1,6}\s(.+)/);
        step.id =
          heading && heading.length
            ? parser.sanitize(heading[0])
            : `step-${index}`;
      } else {
        // if found, move id from step.attribute into step so it doesn't get over written
        step.id = step.attributes.id;
        delete step.attributes.id;
      }

      return step;
    });
  },
  /**
   * Split input markdown string into steps based on a regex pattern
   * @param {*} markdown
   */
  splitSteps(markdown) {
    const steps = markdown.split(/-{6}/); // TODO: Improve this splitting regex
    return steps;
  },

  /**
   * parses the attributes from a step's first comment
   * supports both colon and equals notations ( : or = )
   * step comments should look like this:
   *   <!-- x:1 y:0 rotate=200 -->
   * @param {*} content
   */
  parseStepAttributes(content) {
    const attrs = content.match(/(\w+[:=][-\w]+)/gi) || []; // TODO: 100% needs improvement

    const attributes = attrs.reduce((attrAccumulator, attr, i) => {
      const values = attr
        .replace(/^\s+|\s+$/g, '') // remove leading & trailing whitespace
        .split(/[:=]/); // split on : or =

      if (values.length === 2) attrAccumulator[values[0]] = values[1];

      return attrAccumulator;
    }, {});

    return attributes;
  },
  // replace spaces with hyphens and remove any non-word characters
  sanitize: str => str.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]+/g, '')
};

module.exports = parser;
