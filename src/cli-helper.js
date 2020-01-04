const yargs = require('yargs');
const inquirer = require('inquirer');
const { prompt } = inquirer;

// Map of prompt types and yargs option types
const TYPES_MAP = {
  input: 'string',
  confirm: 'boolean',
  number: 'number',
};

class CliHelper {
  constructor({
    description,
    defaultCommandMessage = 'Choose a command',
    commands,
  } = {}) {
    this.description = description;
    this.defaultCommandMessage = defaultCommandMessage;
    this.commands = commands;
  }

  registerPrompt(name, handler) {
    inquirer.registerPrompt(name, handler);
  }

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
      .parse();
  }

  getParams(command) {
    return Object.entries(this.commands[command].params);
  }

  /**
   * Builds the default yargs command (*) that prompts for the command to run (used if no command is passed).
   * @param  {String} desc    Command description
   * @param  {String} message Question message
   * @return {Object}         Yargs command
   */
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

  /**
   * Builds a yargs command.
   * The handler prompts for missing params not passed as flags / options.
   * @param  {String} name Command name
   * @return {Object}      yargs command
   */
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

  /**
   * Returns the equivalent type from an inquirer prompt and a yargs option
   * Returns 'string' for unknown types
   * @param  {String} type
   * @return {String} yargs option type
   */
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
