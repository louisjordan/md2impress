const helpers = {
  formatString: str => str.replace(/[-_]/g, ' ').replace(/^(\w)|\s(\w)/g, l => l.toUpperCase()),
  getFilenameFromPath: path => {
    const dirs = path.split('/');
    return dirs[dirs.length - 1].split('.')[0];
  },
  getLocationFromPath: path => {
    let dirs = path.split('/');

    if (path.indexOf('.') > 0) {
      dirs.splice(-1);
    }

    dirs = dirs.join('/');

    return dirs;
  }
};

module.exports = helpers;
