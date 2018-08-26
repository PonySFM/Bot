const Discord = require('discord.js');
const debug = require('debug')('bot');
const fs = require('fs');
const path = require('path');

const CMDS_DIR = path.join(__dirname, 'cmds');

class Bot {
  constructor(props) {
    this.client = new Discord.Client();
    this.prefix = props.prefix;
    this.token = props.token;

    this.client.on('ready', this.onReady.bind(this));
    this.client.on('message', this.onMessage.bind(this));

    this.cmds = {};

    /* Autoload all commands from the cmds
     * directory */
    fs.readdirSync(CMDS_DIR).forEach((file) => {
      if (file.endsWith('.js')) {
        const cmd = require(path.join(CMDS_DIR, file));
        this.cmds[cmd.name] = cmd;
        debug(`loaded command: ${cmd.name}`);
      }
    });

    /* Help is a builtin command */
    this.cmds.help = {
      name: 'help',
      description: 'Show help and bot usage',
      func: (args, msg) => {
        let s = "Hi, I'm the PonySFM-Bot!\n\n";
        s += '**Available commands**\n';

        Object.keys(this.cmds).forEach((key) => {
          const cmd = this.cmds[key];
          s += `${this.prefix}${cmd.name}: ${cmd.description}\n`;
        });

        msg.author.send(s);

        if (msg.deletable) {
          msg.delete();
        }
      },
    };
  }

  start() {
    console.log('Starting PonySFM Bot...');
    this.client.login(this.token);
  }

  onReady() {
    console.log(`Up and running as ${this.client.user.tag}!`);
  }

  onMessage(msg) {
    /* Silently ignore DMs */
    if (msg.channel instanceof Discord.DMChannel) {
      return;
    }

    if (msg.content.startsWith(this.prefix)) {
      this.handleCommand(msg.content.substring(this.prefix.length), msg);
    }
  }

  handleCommand(cmd, msg) {
    debug(`handleCommand: ${cmd}`);

    const parts = cmd.split(' ');
    const name = parts[0];

    if (this.cmds[name]) {
      this.cmds[name].func(parts.slice(1), msg);
    } else {
      debug(`could not find command with name: ${name}`);
    }
  }
}

module.exports = Bot;
