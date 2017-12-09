# md2impress [![Build Status](https://travis-ci.com/louisjordan/md2impress.svg?token=tF3yA5qbRRzsfTPZf6ue&branch=master)](https://travis-ci.com/louisjordan/md2impress)

:pencil: generate web presentations from markdown!

## Installation

```bash
$ npm install md2impress 				# via npm
$ yarn add md2impress					# yarn works too!
$ git clone git@github.com:louisjordan/md2impress.git 	# via github
```

## Usage

md2impress works in the browser _and_ in Node _and_ has a CLI interface

*CLI*

```bash
$ npm install --global md2impress
$ md2impress -i input/path -o output/path -l [layout] -s [style]
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

const html = md2impress(markdown, { layout: 'horizontal', style: 'default' });
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

      const html = window.md2impress(markdown, { layout: 'horizontal', style: 'default' });
    </script>
  </body>
</html>
```

## Features

### Layouts

Layouts apply step coordinate attributes including x & y positions, rotation and
scaling allowing for consistent presentation transitions.

In the CLI you can specify the layout using the `-l [layout]` (default is
`manual`) flag e.g:

```bash
$ md2impress -i input/path -o output/path -l horizontal
```

Via the API you specify the layout in the options object e.g:

```javascript
const html = md2impress(markdown, { layout: 'horizontal' });
```

Alternatively, you can specify your own attributes using the 'manual' layout
mode. md2impress will read attributes for each slide like this:

```markdown
<!-- x:100 y:200 rotation:90 -->

# Hello World!

======

<!-- x: 1000 y:500 rotation:0 scale:2 -->

## Example slide
```

Supported layouts:

| Layout Name | Description                                        |
| ----------- | -------------------------------------------------- |
| manual      | Reads from each step's attributes comment          |
| horizontal  | Display each step one after the other horizontally |
| vertical    | Display each step one after the other vertically   |

### Styles

Styles apply CSS to your presentations allowing for consistent presentation
designs with zero effort.

In the CLI you can specify the style using the `-s [style]` flag (default is
`basic`) e.g:

```bash
$ md2impress -i input/path -o output/path -s minimalist
```

Via the API you specify the style in the options object e.g:

```javascript
const html = md2impress(markdown, { style: 'minimalist' });
```

Supported styles:

| Style Name | Description                               |
| ---------- | ----------------------------------------- |
| basic      | Simple design, nothing too fancy          |
| minimalist | Clean, simple, monochromatic style [TODO] |

# Custom layouts and style
To create a custom layout or style style

_Style_

- add the CSS file to `./src/styles/`

_Layout_

- add a JS file to `./src/layouts/` that exports a `map` iteration function (NOTE: see examples in `./src/layouts/`)

_..._

- add the layout/style name to `./src/supported.json` (NOTE: name _must_ be the same as filename e.g. `./src/style/basic.css = 'basic'`)
- run `npm run build` 

### Custom Styles
It is recommended to import the `_defaults.css` file to your custom stylesheets as a base to work from:

```css
@import '_defaults.css';

h1 { ...
```