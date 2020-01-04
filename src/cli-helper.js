const yargs = require('yargs');
const inquirer = require('inquirer');
const { prompt } = inquirer;

// Map of prompt types and yargs option types
const TYPES_MAP = {
  input: 'string',
  confirm: 'boolean',
  number: 'number',
};

/**
 * Creates CLIs from the specified commands object.
 * Uses yargs and inquirer to prompt for missing command params not passed as flags / options.
 * The commands object accepts an `action` key (`function`) for each command that will
 * receive the executed command, the program (the name of the executable binary) and the command options as `options` object.
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
 *       action: ({ command, program, options }) => {
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
   * @param  {String} options.defaultCommandMessage Message used in the prompt of the default command
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
  }

  /**
   * Register an inquirer prompt type
   * @param  {String} name    prompt type
   * @param  {Object} handler prompt type handler
   */
  registerPrompt(name, handler) {
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

  getParams(command) {
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
      builder: (yargs) => yargs.options(this.getCommandOptions(name)),
      handler: async (args) => {
        const params = await this.requestMissingParams(name, args);
        const { _, $0: program, ...options } = params;
        const command = name;

        this.commands[name].action({ command, program, options });
      },
    };
  }

  getCommandOptions(command) {
    return this.getParams(command).reduce(
      (obj, [option, config]) =>
        Object.assign(obj, {
          [option]: {
            describe: config.message,
            type: this.getOptionType(config.type),
          },
        }),
      {}
    );
  }

  getOptionType(type) {
    return TYPES_MAP[type] || 'string';
  }

  async requestMissingParams(command, params) {
    const questions = this.getQuestionSets();
    const notInParams = (entry) => !Object.keys(params).includes(entry.name);
    const missingParams = questions[command].filter(notInParams);
    const answers = await prompt(missingParams).catch(yargs.exit);

    return Object.assign(params, answers);
  }

  getQuestionSets() {
    return Object.keys(this.commands).reduce(
      (obj, command) =>
        Object.assign(obj, {
          [command]: this.getCommandQuestions(command),
        }),
      {}
    );
  }

  getCommandQuestions(command) {
    return this.getParams(command).reduce(
      (arr, [option, config]) =>
        arr.concat({
          ...config,
          name: option,
        }),
      []
    );
  }
}

module.exports = { CliHelper };
