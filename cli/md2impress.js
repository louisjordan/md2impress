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
  .option('-i, --input <file|dir>', 'Markdown input file path')
  .option('-o, --output <dir>', 'HTML output directory')
  .option('-l, --layout [layout]', 'Presentation layout')
  .option('-s, --style [style]', 'Presentation style')
  .option('-t, --title [title]', 'Presentation title')
  .parse(process.argv);

if (!program.input) {
  console.log('Error: An input path must be provided! *');
  program.help();
  process.exit();
}

/* Read input path -> generate html with md2impress -> write to output path */
const basePath = process.cwd();
const inputPath = path.resolve(basePath, program.input);
const outputPath = program.output ? path.resolve(basePath, program.output) : helpers.getLocationFromPath(inputPath);
const layout = program.layout;
const style = program.style;

const outputIsDir = fs.lstatSync(outputPath).isDirectory();
const inputIsDir = fs.lstatSync(inputPath).isDirectory();

if (!outputIsDir) {
  console.log('Error: Output path must be a valid directory *');
  program.help();
  process.exit();
}

const inputFilePaths = inputIsDir
  ? fs
      .readdirSync(inputPath)
      .map(file => path.resolve(basePath, inputPath, file))
      .filter(file => file.match(/\.md$/))
  : [inputPath];

console.log('\n*** welcome to md2impress ***\n');
console.log(`Generating ${inputFilePaths.length} presentation${inputFilePaths.length > 1 ? 's' : ''}...`);

// generate presentations
inputFilePaths.forEach((inPath, index) => {
  const filename = helpers.getFilenameFromPath(inPath);
  const outPath = path.resolve(outputPath, filename + '.html');

  const title =
    program.title && inputIsDir ? `${program.title}_${index}` : helpers.formatString(program.title || filename);

  // read input file
  fs.readFile(inPath, 'utf8', (err, input) => {
    if (err) throw err;

    try {
      // generate html
      const html = md2impress(input, { layout, style, title });

      // write to output path
      fs.writeFile(outPath, html, err => {
        if (err) console.error(err);
        console.log(`\n[\u2713] [${title}]`);
        console.log(`    [MD] ${inPath}\n  [HTML] ${outPath}`);
      });
    } catch (error) {
      console.error(error);
      process.exit();
    }
  });
});
