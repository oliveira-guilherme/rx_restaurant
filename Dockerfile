FROM node:20-alpine3.18 as build

WORKDIR /app

COPY package*.json ./

COPY ./ /dist/app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]