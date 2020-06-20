const runTransform = require('./run-transform');

const commonParams = {
  files: {
    message: 'Files where the command will be executed',
    type: 'path',
    validate: () => true,
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
      useTabs: {
        message: 'Use tabs instead of spaces',
        type: 'confirm',
        default: false,
      },
      tabWidth: {
        message: 'Number of spaces used per tab',
        type: 'number',
        default: 4,
        when: (input) => input.useTabs,
      },
    },
    action: runTransform,
  },
  'rename-tag': {
    desc: 'Renames tag names in strings and template literals',
    params: {
      ...commonParams,
      oldTag: {
        message: 'Tag to rename (Example: some-tag)',
        type: 'input',
      },
      newTag: {
        message: 'New tag name (Example: new-tag)',
        type: 'input',
      },
      useTabs: {
        message: 'Use tabs instead of spaces',
        type: 'confirm',
        defautl: false,
      },
      tabWidth: {
        message: 'Number of spaces used per tab',
        type: 'number',
        default: 2,
        when: (input) => input.useTabs,
      },
    },
    action: runTransform,
  },
};
