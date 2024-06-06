FROM node:20-alpine As node_development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN npm install 

COPY . .

RUN npm run build

FROM node:20-alpine as node_production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

#RUN npm i -g @nestjs/cli

#RUN npm i jsonwebtoken

RUN npm install --only=production

#COPY ../.. .

#COPY --from=node_development  /usr/src/app/package*.json ./
#COPY --from=node_development  /usr/src/app/node_modules/ ./node_modules/
COPY --from=node_development /usr/src/app/dist ./dist

#RUN ls -l
#CMD ["node", "./dist/src/main.js"]
