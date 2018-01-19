const fs = require('fs');
const path = require('path');

const TEST_DATA_ROOT = './test/data';

const loadTestInputs = () => {
  return fs.readdirSync(TEST_DATA_ROOT).reduce((acc, file) => {
    if (file.indexOf('input') > -1) acc.push(fs.readFileSync(`${TEST_DATA_ROOT}/${file}`, 'utf8'));
    return acc;
  }, []);
};

const loadTestOutputs = () => {
  return fs.readdirSync(TEST_DATA_ROOT).reduce((acc, file) => {
    if (file.indexOf('output') > -1) acc.push(fs.readFileSync(`${TEST_DATA_ROOT}/${file}`, 'utf8'));
    return acc;
  }, []);
};

module.exports.loadTestInputs = loadTestInputs;
module.exports.loadTestOutputs = loadTestOutputs;
