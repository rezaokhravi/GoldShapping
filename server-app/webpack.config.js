const path = require('path');

module.exports = {
  entry: './dist/app.js',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve('./dist/', '.'),
    filename: 'server.bundle.js'
  }
};
