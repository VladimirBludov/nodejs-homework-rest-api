FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8087

CMD [ "node", "server.js" ]
