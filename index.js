const Bot = require('./lib/bot');

const token = process.env.TOKEN;

if (!token) {
  console.error('Specify a token using the TOKEN environment variable');
} else {
  const bot = new Bot({ prefix: '>', token });
  bot.start();
}
