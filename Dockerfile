# build environment
FROM node:16.13.0 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm i

COPY . ./

EXPOSE 4723

VOLUME /app/report/

CMD [ "npm", "run", "test-web"]

# docker build -t hepsiburada .
# docker run -d -v <REPORT-PATH>:/app/report/ --network host hepsiburada