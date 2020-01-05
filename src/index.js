const { PathPrompt } = require('inquirer-path');
const { CliHelper } = require('./cli-helper');
const commands = require('./commands');

const cli = new CliHelper({
  description: 'Codemods for Web Components',
  defaultCommandMessage: 'Choose the transform to apply',
  commands,
});

CliHelper.registerPrompt('path', PathPrompt);
cli.run();
