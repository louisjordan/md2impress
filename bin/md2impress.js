#!/usr/bin/env node

/**
 * Process commandline parameters
 *
 * Steps:
 * - Use commander to process CLI params     (https://www.npmjs.com/package/commander)
 * - Read input file                          (https://nodejs.org/api/fs.html)
 * - Generate impress HTML
 * - Save impress HTML to output location
 */

const program = require('commander');
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

const md2impress = require('../src');
const { version } = require('../package');

program
  .version(version)
  .usage('-i input.md -o output.html [options]')
  .option('-i, --input <file>', 'Markdown input file path')
  .option('-o, --output <file>', 'HTML output destination')
  .option('-l, --layout [layout]', 'Presentation layout')
  .option('-s, --style [style]', 'Presentation style')
  .option('-t, --title [title]', 'Presentation title')
  .parse(process.argv);

if (!program.input || !program.output) {
  console.log('Error: An input and output path must be provided! *');
  program.help();
  process.exit();
}

/* Read input path -> generate html with md2impress -> write to output path */
const basePath = process.cwd();
const inputPath = path.resolve(basePath, program.input);
const ouputPath = path.resolve(basePath, program.output);

const layout = program.layout || 'manual';
const style = program.style || 'default';
const title = program.title || helpers.prettifyString(helpers.getFilenameFromPath(program.input));

// TODO: Check input/output paths and files exist
// TODO: Input file type is correct

// read input file
fs.readFile(inputPath, 'utf8', (err, input) => {
  if (err) throw err;

  try {
    // generate html
    const html = md2impress(input, { layout, style, title });

    // write to output path
    fs.writeFile(ouputPath, html, err => {
      if (err) throw err;
      console.log(`Save successful!
Base path: ${basePath}
      [MD] /${program.input}
    [HTML] /${program.output}`);
      process.exit();
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
});
