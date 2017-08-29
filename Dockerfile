FROM node:8-alpine

WORKDIR /app
ADD . .

RUN npm i --production
CMD ["node", "index.js"]
