FROM node:alpine

WORKDIR /blog/client

RUN npm install -g pnpm

COPY ./.npmrc ./
COPY ./package.json ./
RUN pnpm install

COPY ./ ./

CMD ["pnpm", "start"]
