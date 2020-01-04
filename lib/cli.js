'use strict';

const { CliHelper, prompt, yargs } = require('./cli-helper');

const COMMANDS = {
  'block-scope-to-iife': {
    desc: 'Replaces brackets used as scope in a file by an IIFE',
    params: {
      files: {
        desc: 'Files where the command will be executed',
        promptType: 'input',
      },
    },
    action: console.log,
  },
  'replace-attrs': {
    desc: 'Replaces attributes in the specified tag',
    params: {
      tag: {
        desc: 'Tag name (Example: some-tag)',
        promptType: 'input',
      },
      attrs: {
        desc: 'Object with {"old-attr": "new-attr"} pairs to replace',
        promptType: 'editor',
      },
      files: {
        desc: 'Files where the command will be executed',
        promptType: 'input',
      },
    },
    action: console.log,
  },
};

const cli = new CliHelper(COMMANDS);

function run() {
  yargs
    .command(
      cli.buildDefaultCommand(
        'Codemods for Web Components',
        'Choose the transform to apply'
      )
    )
    .command(cli.buildCommand('replace-attrs'))
    .help()
    .parse();
}

module.exports = { run };
