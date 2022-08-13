FROM node:alpine

WORKDIR /blog/post

RUN npm install -g pnpm

COPY ./package.json ./
RUN pnpm install

COPY ./ ./

CMD ["pnpm", "start"]
