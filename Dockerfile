FROM node:8-alpine
ADD . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["node", "index.js"]