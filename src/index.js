'use strict';

const { CliHelper } = require('./cli-helper');
const { PathPrompt } = require('inquirer-path');
const commands = require('./commands');

const cli = new CliHelper({
  description: 'Codemods for Web Components',
  defaultCommandMessage: 'Choose the transform to apply',
  commands,
});

cli.registerPrompt('path', PathPrompt);
cli.run();
