const helpers = {
  prettifyString: str => str.replace(/[-_]/g, ' ').replace(/^(\w)|\s(\w)/g, l => l.toUpperCase()),
  getFilenameFromPath: path => {
    const dirs = path.split('/');
    return dirs[dirs.length - 1].split('.')[0];
  }
};

module.exports = helpers;
