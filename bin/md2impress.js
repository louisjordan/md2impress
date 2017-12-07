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

const md2impress = require('../src');
const { version } = require('../package');

program
  .version(version)
  .usage('-i input.md -o output.html [options]')
  .option('-i, --input <file>', 'Markdown input file path')
  .option('-o, --output <file>', 'HTML output destination')
  .option('-l, --layout [layout]', 'Presentation layout')
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

// read input file
fs.readFile(inputPath, 'utf8', (err, input) => {
  if (err) throw err;

  const html = md2impress(input, layout); // TODO: Handle error here if layout is not supported

  fs.writeFile(ouputPath, html, err => {
    if (err) throw err;
    console.log(`
Save successful!
Base path: ${basePath}
      [MD] /${program.input}
    [HTML] /${program.output}`);
    process.exit();
  });
});
