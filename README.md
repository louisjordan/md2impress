# md2impress [![Build Status](https://travis-ci.com/louisjordan/md2impress.svg?token=tF3yA5qbRRzsfTPZf6ue&branch=master)](https://travis-ci.com/louisjordan/md2impress)
:pencil: generate web presentations from markdown!

## Installation

```bash
$ npm install md2impress 				# via npm
$ yarn add md2impress					# yarn works too!
$ git clone git@github.com:louisjordan/md2impress.git 	# via github
```

## Usage
md2impress works in the browser *and* in Node *and* has a CLI interface


*CLI*

```bash
$ npm install --global md2impress
$ md2impress -i input/path -o output/path
```

*Node*

```javascript
const md2impress = require('md2impress');

const markdown = `
# Example Slide
Welcome to my *example* slide
------
# Slide 2
This is the second slide
`;

const html = md2impress(markdown);
```


*Browser*

```html
<!doctype html>
<html>
  <body>
    <div id="presentation">
    <script src="path/to/md2impress.min.js"></script>
    <script>
      const markdown = `
# Example Slide
Welcome to my *example* slide
------
# Slide 2
This is the second slide
`;

      const html = window.md2impress(markdown);
    </script>
  </body>
</html>
```
