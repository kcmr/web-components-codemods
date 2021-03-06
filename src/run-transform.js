const path = require('path');
const execa = require('execa');
const dargs = require('dargs');
const globby = require('globby');

// eslint-disable-next-line node/no-unpublished-require
const jscodeshift = require.resolve('.bin/jscodeshift');

// Shamelessly stolen from https://github.com/reactjs/react-codemod/blob/master/bin/cli.js
function expandFilePathsIfNeeded(files) {
  const shouldExpandFiles = files.some((file) => file.includes('*'));
  return shouldExpandFiles ? globby.sync(files) : files;
}

module.exports = function runTransform({ command, options }) {
  const transformScript = path.join(
    __dirname,
    '../transforms/',
    `${command}.js`
  );
  const excludes = ['files', 'useTabs'];
  const files = expandFilePathsIfNeeded([options.files]);
  const args = [
    ...files,
    `--transform=${transformScript}`,
    '--ignore-pattern=**/node_modules/**',
    '--ignore-pattern=**/bower_components/**',
    ...dargs(options, {
      excludes,
      allowCamelCase: true,
    }),
  ];

  // always preview in dry-run mode
  if (options.dry) {
    args.push('--print');
  }

  if (options.useTabs) {
    args.push('--useTabs=true');
  }

  const result = execa.sync(jscodeshift, args, { stdio: 'inherit' });

  if (result.error) {
    throw result.error;
  }
};
