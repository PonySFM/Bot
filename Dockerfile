FROM mhart/alpine-node:latest
MAINTAINER Gian Sass <gian.sass@outlook.de>

WORKDIR /psfm_bot

COPY ./package.json /psfm_bot
COPY ./package-lock.json /psfm_bot
RUN npm install

COPY ./ /psfm_bot

CMD ["npm", "run", "dev"]
