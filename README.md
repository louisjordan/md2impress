# md2impress [![Build Status](https://travis-ci.com/louisjordan/md2impress.svg?token=tF3yA5qbRRzsfTPZf6ue&branch=master)](https://travis-ci.com/louisjordan/md2impress)
:pencil: a Markdown to Impress.js presentation generator

## Installation

```bash
$ npm install md2impress 				# via npm
$ yarn add md2impress					# yarn works too!
$ git clone git@github.com:louisjordan/md2impress.git 	# via github
```

## Usage
md2impress uses the Universal Module Definition (UMD) which means it can work in Node as well as the browser.


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
