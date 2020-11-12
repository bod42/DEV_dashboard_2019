FROM node:12.2.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./src/app/

RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
