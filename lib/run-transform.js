'use strict';

const path = require('path');
const execa = require('execa');
const dargs = require('dargs');
const transformsDir = path.join(__dirname, '../', 'transforms');
const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');

module.exports = function runTransform({ command, program, options }) {
  const transformScript = path.join(transformsDir, `${command}.js`);
  const excludes = ['files'];
  const args = [
    options.files,
    '-t',
    transformScript,
    '--ignore-pattern=**/node_modules/**',
    ...dargs(options, { excludes }),
  ];

  if (options.dry) {
    args.push('--print');
  }

  const result = execa.sync(jscodeshiftExecutable, args, {
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }
};
