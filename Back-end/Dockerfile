FROM node:16

ENV PORT=${PORT}
ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_DATABASE=${DB_DATABASE}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV ENV=${ENV}

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","start"]
