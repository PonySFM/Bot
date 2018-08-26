module.exports = {
  name: 'dice',
  description: 'Throw a dice',
  func: (args, msg) => {
    msg.channel.send(Math.floor(Math.random() * 6) + 1);
  },
};
