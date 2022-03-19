FROM node:16
WORKDIR /usr/chat-app
COPY . .
RUN npm install
CMD [ "npm", "start" ]