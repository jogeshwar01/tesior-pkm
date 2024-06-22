FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY tsconfig.json .
COPY src ./src
RUN yarn add typescript
RUN npx tsc -b

COPY . .

CMD ["node", "dist/index.js"]
