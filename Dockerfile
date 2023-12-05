###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20 As development
RUN npm install -g pnpm
ENV ADDRESS=0.0.0.0 PORT=3000

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm fetch --prod

COPY --chown=node:node . .
RUN pnpm install

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20 As build
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN pnpm build

ENV NODE_ENV production
ENV ADDRESS=0.0.0.0 PORT=3000

USER node

###################
# PRODUCTION
###################

FROM node:20-alpine As production
ENV NODE_ENV production
ENV ADDRESS=0.0.0.0 PORT=3000

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
