const yargs = require('yargs');
const { prompt } = require('inquirer');

class CliHelper {
  constructor(commands) {
    this.commands = commands;
  }

  getParams(command) {
    return Object.entries(this.commands[command].params);
  }

  buildDefaultCommand(desc, message = 'Choose a command') {
    return {
      command: '*',
      desc,
      handler: async () => {
        const { command } = await prompt({
          message,
          type: 'list',
          name: 'command',
          choices: Object.keys(this.commands),
        }).catch(yargs.exit);

        yargs.parse(command);
      },
    };
  }

  buildCommand(name) {
    const command = this.commands[name];

    return {
      command: name,
      desc: command.desc,
      builder: (yargs) => yargs.options(this.getCommandOptions(name)),
      handler: async (args) => {
        const params = await this.requestMissingParams(name, args);
        command.action(params);
      },
    };
  }

  getCommandOptions(command) {
    return this.getParams(command).reduce(
      (obj, [key, value]) =>
        Object.assign(obj, {
          [key]: { describe: value.desc },
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
    return this.getParams(command).reduce((arr, [key, value]) => {
      arr.push({
        type: value.promptType,
        message: value.desc,
        name: key,
      });

      return arr;
    }, []);
  }
}

module.exports = {
  CliHelper,
  prompt,
  yargs,
};
