# mdtoimpress [![Build Status](https://api.travis-ci.com/louisjordan/mdtoimpress.svg?token=tF3yA5qbRRzsfTPZf6ue&branch=master "Build Status")](https://travis-ci.com/louisjordan/mdtoimpress)
:pencil: a markdown to Impress.js presentation generator

## Installation

```bash
$ npm install mdtoimpress 				# via npm
$ yarn add mdtoimpress					# yarn works too!
$ git clone git@github.com:louisjordan/mdtoimpress.git 	# via github
```

## Usage
mdtoimpress uses the Universal Module Definition (UMD) which means it can work in Node as well as the browser.


*Node*

```javascript
const mdtoimpress = require('mdtoimpress');

const markdown = `
# Example Slide
Welcome to my *example* slide
------
# Slide 2
This is the second slide
`;

const html = mdtoimpress(markdown);
```


*Browser*

```html
<!doctype html>
<html>
	<body>
	
	<script src="path/to/mdtoimpress.min.js"></script>
	<script>
		const markdown = `
# Example Slide
Welcome to my *example* slide
------
# Slide 2
This is the second slide
`;

		const html = window.mdtoimpress(markdown);
	</script>
	</body>
</html>
```
