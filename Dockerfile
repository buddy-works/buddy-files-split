FROM node:8-alpine
ADD . /app
WORKDIR /app
ENTRYPOINT ["node", "index.js"]