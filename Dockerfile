FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx playwright install --with-deps chromium

COPY . .

EXPOSE 9100

CMD [ "node", "tests_status_exporter/run-tests-and-export.js" ]