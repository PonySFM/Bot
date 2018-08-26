const request = require('request');
const querystring = require('querystring');

const DB_URL = 'https://derpibooru.org';
const SEARCH_URL = `${DB_URL}/search.json`;

fetchJSON = url => new Promise((resolve, reject) => {
  request({ url, json: true }, (err, res, body) => {
    if (err) {
      reject(err);
    } else {
      resolve(body);
    }
  });
});

module.exports = {
  name: 'db',
  description: 'Post random image from Derpibooru using the given query',
  func: (args, msg) => {
    const qstr = querystring.stringify({
      q: args.join(' '),
      random_image: true,
    });

    fetchJSON(`${SEARCH_URL}?${qstr}`)
      .then(body => fetchJSON(`${DB_URL}/${body.id}.json`))
      .catch((err) => {
        console.error(`Error calling Derpibooru API: ${err}`);
      })
      .then((body) => {
        if (body && body.representations) {
          const url = `https:${body.representations.medium}`;
          return msg.channel.send({
            files: [url],
          });
        }
        return msg.channel.send('I found nuffin\'');
      })
      .catch(console.error);
  },
};
