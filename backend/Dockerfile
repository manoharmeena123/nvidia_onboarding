# NOTE: You can read more about this Dockerfile in this blog post: https://www.tomray.dev/nestjs-docker-production

###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20.13.1 As development

# ARG NPM_TOKEN=${NPM_TOKEN}

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lock files into the container.
COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

# install python for node-gyp to build the unix-dgram
# RUN apk add --no-cache --virtual .gyp python3 make g++

# Install only production dependencies
# RUN npm config set //registry.npmjs.org/:_authToken ${NPM_TOKEN} && \
#     yarn install
# RUN npm install --legacy-peer-deps zustand react-select
RUN npm install --force

# Bundle app source
COPY --chown=node:node . .

RUN npm run build

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20.13.1-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm install --force


# Set NODE_ENV environment variable
ENV NODE_ENV production

# Run the build command which creates the production bundle
RUN npm run build

# node_modules used from the base image, clear the cache for a smaller docker image.
# RUN yarn cache clean

USER node

###################
# PRODUCTION
###################

FROM node:20.13.1-alpine As production

                          # <--- Switch active user to “node” (by UID)


ARG CF_REVISION=""
LABEL COMMIT_SHA=${CF_REVISION}
ENV COMMIT_SHA=${CF_REVISION}

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
# COPY --chown=node:node --from=build /app/config ./config
COPY --chown=node:node --from=build /app/dist ./dist

USER 1000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

EXPOSE 3000
