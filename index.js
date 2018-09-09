const fs = require('fs');
const Bot = require('./lib/bot');

const loadTokenFromConfig = () => {
  try {
    let file = fs.readFileSync('config.json', 'utf8');
    return JSON.parse(file).token;
  } catch(err) {
    console.error('Error reading config.json: ' + err);
    process.exit(1);
  }
}

const token = process.env.TOKEN || loadTokenFromConfig();

if (!token) {
  console.error('Specify a token using the TOKEN environment variable');
} else {
  const bot = new Bot({ prefix: '>', token });
  bot.start();
}
