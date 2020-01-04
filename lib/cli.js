'use strict';

const { CliHelper } = require('./cli-helper');

const filesParam = {
  desc: 'Files where the command will be executed',
  promptType: 'input',
};
const COMMANDS = {
  'block-scope-to-iife': {
    desc: 'Replaces brackets used as scope in a file by an IIFE',
    params: {
      files: filesParam,
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
      files: filesParam,
    },
    action: console.log,
  },
};

const cli = new CliHelper({
  description: 'Codemods for Web Components',
  defaultCommandMessage: 'Choose the transform to apply',
  commands: COMMANDS,
});

cli.run();
