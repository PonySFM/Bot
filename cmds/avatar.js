module.exports = {
  name: 'avatar',
  description: 'View a user\'s avatar in high-resolution',
  func: (args, msg) => {
    let url = msg.author.avatarURL;

    if (args.length === 1) {
      const userId = args[0].substring(2, args[0].length - 1);
      const { user } = msg.guild.members.get(userId);
      url = user.avatarURL;
    }

    msg.channel.send(url);
  },
};
