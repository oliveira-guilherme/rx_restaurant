FROM node:20-alpine3.18 as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run dev

EXPOSE 3000

CMD ["npm", "start"]