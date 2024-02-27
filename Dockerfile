FROM node:16.15.1-alpine3.16

WORKDIR /app

COPY . .

RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm config set registry http://registry.npmjs.org/
# RUN npm set registry=https://registry.npmjs.org/
RUN npm install --legacy-peer-deps

# ENV NODE_ENV development
RUN npm run build

COPY package.json dist/

RUN adduser -D myuser

RUN chown -R myuser: /app

ENV HOME /home/myuser

USER myuser

CMD ["node", "dist/main.js"]
