FROM node

ENV PORT 80

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE $PORT

#making sure if we already have the network created,
#if not, we create one for Container to Container communication.
RUN create_network.sh 

CMD [ "node", "app.js" ]