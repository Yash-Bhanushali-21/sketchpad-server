FROM node

ENV PORT 80

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE $PORT

CMD [ "node", "app.js" ]