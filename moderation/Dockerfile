FROM node:alpine

WORKDIR /blog/moderation

RUN npm install -g pnpm

COPY ./package.json ./
RUN pnpm install

COPY ./ ./

CMD ["pnpm", "start"]
