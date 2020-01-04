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

  buildCommand(name, callback) {
    return {
      command: name,
      desc: this.commands[name].desc,
      builder: (yargs) => yargs.options(this.getCommandOptions(name)),
      handler: async () => {
        const params = await this.requestAnswers(name);
        callback(params);
      },
    };
  }

  // TODO
  async requestAnswers(command) {
    const questions = {
      'replace-attrs': this.getCommandQuestions('replace-attrs'),
    };

    return await prompt(questions[command]).catch(yargs.exit);
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
