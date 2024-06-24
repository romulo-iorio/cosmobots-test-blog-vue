FROM node:18.12-alpine AS build-deps

WORKDIR /vue

COPY package*.json  ./

RUN rm -rf node_modules
RUN rm -rf build

RUN npm install --force --silent && npm cache clean --force

RUN rm -f .npmrc

FROM node:18.12-alpine

WORKDIR /vue

COPY --from=build-deps /vue ./

COPY . .

EXPOSE 5173
