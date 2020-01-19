const yargs = require('yargs');
const inquirer = require('inquirer');

const { prompt } = inquirer;

/**
 * Creates CLIs from the specified commands object.
 * Uses yargs and inquirer to prompt for missing command params not passed as flags / options.
 * The commands object accepts an `action` key (`function`) for each command that will
 * receive the executed command and the command options as `options` object.
 * Command params use the same options that inquirer questions.
 *
 * @example
 * ```js
 * const { CliHelper } = require('./cli-helper');
 * const cli = new CliHelper({
 *   description: 'My awesome CLI',
 *   commands: {
 *     'print': {
 *       desc: 'Prints something',
 *       params: {
 *         color: {
 *           message: 'Use colors in output',
 *           type: 'boolean'
 *         }
 *       },
 *       action: ({ command, options }) => {
 *         console.log(`${command} executed with ${options.color}`);
 *       }
 *     }
 *   }
 * });
 * cli.run();
 * ```
 */
class CliHelper {
  /**
   * CliHelper constructor
   * @param  {String} options.description           Main command description
   * @param  {String} options.defaultCommandMessage Prompt message of the
   * default command
   * @param  {Object} options.commands              CLI commands
   */
  constructor({
    description,
    defaultCommandMessage = 'Choose a command',
    commands,
  } = {}) {
    this.description = description;
    this.defaultCommandMessage = defaultCommandMessage;
    this.commands = commands;
    this.yargsOptionTypeForPromptType = {
      input: 'string',
      confirm: 'boolean',
      number: 'number',
    };
  }

  /**
   * Register an inquirer prompt type
   * @param  {String} name    prompt type
   * @param  {Object} handler prompt type handler
   */
  static registerPrompt(name, handler) {
    inquirer.registerPrompt(name, handler);
  }

  /**
   * Runs the command
   */
  run() {
    for (const command of Object.keys(this.commands)) {
      yargs.command(this.buildCommand(command));
    }

    yargs
      .command(this.buildDefaultCommand())
      .help()
      .alias('help', 'h')
      .version()
      .alias('version', 'v')
      .wrap(null)
      .parse();
  }

  getCommandParams(command) {
    return Object.entries(this.commands[command].params);
  }

  buildDefaultCommand() {
    return {
      command: '*',
      desc: this.description,
      handler: async () => {
        const { command } = await prompt({
          message: this.defaultCommandMessage,
          type: 'list',
          name: 'command',
          choices: Object.keys(this.commands),
        }).catch(yargs.exit);

        yargs.parse(command);
      },
    };
  }

  buildCommand(name) {
    return {
      command: name,
      desc: this.commands[name].desc,
      builder: () => yargs.options(this.getCommandOptions(name)),
      handler: async (args) => {
        const params = await this.requestMissingParams(name, args);
        const { _, $0, ...options } = params;
        const command = name;

        this.commands[name].action({ command, options });
      },
    };
  }

  getCommandOptions(command) {
    const commandOptions = {};

    for (const [option, config] of this.getCommandParams(command)) {
      commandOptions[option] = {
        describe: config.message,
        type: this.getOptionType(config.type),
      };
    }

    return commandOptions;
  }

  getOptionType(type) {
    return this.yargsOptionTypeForPromptType[type] || 'string';
  }

  async requestMissingParams(command, params) {
    const questions = this.getAllCommandsQuestions();
    const notInParams = (entry) => !Object.keys(params).includes(entry.name);
    const missingParams = questions[command].filter(notInParams);
    const answers = await prompt(missingParams).catch(yargs.exit);

    return Object.assign(params, answers);
  }

  getAllCommandsQuestions() {
    const allCommandsQuestions = {};

    for (const command of Object.keys(this.commands)) {
      allCommandsQuestions[command] = this.getCommandQuestions(command);
    }

    return allCommandsQuestions;
  }

  getCommandQuestions(command) {
    const commandQuestions = [];

    for (const [option, config] of this.getCommandParams(command)) {
      commandQuestions.push({
        ...config,
        name: option,
      });
    }

    return commandQuestions;
  }
}

module.exports = { CliHelper };
