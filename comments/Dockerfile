FROM node:alpine

WORKDIR /blog/comments

RUN npm install -g pnpm

COPY ./package.json ./
RUN pnpm install

COPY ./ ./

CMD ["pnpm", "start"]
