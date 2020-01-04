const yargs = require('yargs');
const inquirer = require('inquirer');
const { prompt } = inquirer;

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

  registerPrompt(type, promptHandler) {
    inquirer.registerPrompt(type, promptHandler);
  }

  run() {
    yargs.command(this.buildDefaultCommand());

    for (const command of Object.keys(this.commands)) {
      yargs.command(this.buildCommand(command));
    }

    yargs.help().parse();
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
        const { _: command, $0: program, ...options } = params;

        this.commands[name].action({
          command: command[0],
          program,
          options,
        });
      },
    };
  }

  getCommandOptions(command) {
    return this.getParams(command).reduce(
      (obj, [option, config]) =>
        Object.assign(obj, {
          [option]: { describe: config.message },
        }),
      {}
    );
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
      (obj, key) =>
        Object.assign(obj, {
          [key]: this.getCommandQuestions(key),
        }),
      {}
    );
  }

  getCommandQuestions(command) {
    return this.getParams(command).reduce((arr, [option, config]) => {
      arr.push({ ...config, name: option });

      return arr;
    }, []);
  }
}

module.exports = { CliHelper };
