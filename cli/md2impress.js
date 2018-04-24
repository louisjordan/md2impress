#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const helpers = require('./helpers');

const md2impress = require('../src');
const { version } = require('../package');

program
  .version(version, '-v, --version')
  .usage('md2impress --input <file|dir> --output <dir> [options]')
  .option('-i, --input [input]', 'Markdown input directory or file path (default: current directory)')
  .option('-o, --output [output]', 'HTML output directory (default: current directory)')
  .option('-t, --title [title]', 'Presentation title (default: input filename)')
  .option('-l, --layout [layout]', "Presentation layout (default: 'manual')")
  .option('-s, --style [style]', "Presentation style (default: 'basic')")
  .option('-z, --zip', 'Save input and output togather as a zip archive')
  .parse(process.argv);

const basePath = process.cwd();
const inputPath = program.input ? path.resolve(basePath, program.input) : basePath;
const outputPath = program.output ? path.resolve(basePath, program.output) : helpers.getLocationFromPath(inputPath);
const layout = program.layout;
const style = program.style;
const title = typeof program.title === 'string' ? program.title : '';
const saveAsZip = program.zip || false;

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
  const outPath = path.resolve(outputPath, `${filename}.html`);

  const docTitle =
    title && inputIsDir && inputFilePaths.length > 1 ? `${title} ${index}` : title || helpers.formatString(filename);

  // read input file
  fs.readFile(inPath, 'utf8', async (err, input) => {
    if (err) throw err;

    try {
      // generate html
      const html = await md2impress(input, { layout, style, title: docTitle });

      if (saveAsZip) {
        const zip = new JSZip();
        const zipPath = path.resolve(outputPath, `${filename}.zip`);

        zip.file(`${filename}.zip`, input);
        zip.file(`${filename}.html`, html);
        zip
          .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
          .pipe(fs.createWriteStream(zipPath))
          .on('finish', err => {
            if (err) console.error(err);
            console.log(`\n[\u2713] [${docTitle}]`);
            console.log(`    [MD] ${inPath}\n   [ZIP] ${zipPath}`);
          });
      } else {
        // write html to output path
        fs.writeFile(outPath, html, err => {
          if (err) console.error(err);
          console.log(`\n[\u2713] [${docTitle}]`);
          console.log(`    [MD] ${inPath}\n  [HTML] ${outPath}`);
        });
      }
    } catch (error) {
      console.error(error);
      process.exit();
    }
  });
});
