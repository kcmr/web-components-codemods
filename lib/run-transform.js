'use strict';

const path = require('path');
const execa = require('execa');
const dargs = require('dargs');
const transformsDir = path.join(__dirname, '../', 'transforms');
const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');

module.exports = function runTransform({ command, program, options }) {
  const { files } = options;
  const transformScript = path.join(transformsDir, `${command}.js`);
  const excludes = ['files'];
  const jscodeshiftArgs = [
    files,
    '-t',
    transformScript,
    ...dargs(options, { excludes }),
    '-d',
  ];

  const result = execa.sync(jscodeshiftExecutable, jscodeshiftArgs, {
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }
};
