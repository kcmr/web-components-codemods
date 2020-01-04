'use strict';

const runTransform = require('./run-transform');

const commonParams = {
  files: {
    message: 'Files where the command will be executed',
    type: 'path',
    validate: (input) => true,
  },
  dry: {
    message: "Run in preview mode (don't transform files)",
    type: 'confirm',
    default: false,
  },
};

module.exports = {
  'block-scope-to-iife': {
    desc: 'Replaces brackets used as scope in a file by an IIFE',
    params: {
      ...commonParams,
    },
    action: runTransform,
  },
  'replace-attrs': {
    desc: 'Replaces attributes in the specified tag',
    params: {
      ...commonParams,
      tag: {
        message: 'Tag name (Example: some-tag)',
        type: 'input',
      },
      attrs: {
        message: 'Object with {"old-attr": "new-attr"} pairs to replace',
        type: 'input',
      },
    },
    action: runTransform,
  },
};
