FROM node:14-alpine
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 8626
CMD npm start
