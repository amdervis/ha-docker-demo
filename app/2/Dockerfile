FROM node:18

WORKDIR /app/2

COPY package.json .
RUN npm install

COPY index.js .

EXPOSE 80

CMD ["npm", "start"]