FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

RUN npm i nodemon

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
