# NOTE: You can read more about this Dockerfile in this blog post: https://www.tomray.dev/nestjs-docker-production

###################
# BUILD FOR LOCAL DEVELOPMENT
###################

# FROM node:20.13.1 As development

# ARG NPM_TOKEN=${NPM_TOKEN}

# Create app directory
# WORKDIR /app

# Copy package.json and yarn.lock files into the container.
# COPY --chown=node:node package.json ./
# COPY --chown=node:node yarn.lock ./

# install python for node-gyp to build the unix-dgram
# RUN apk add --no-cache --virtual .gyp python3 make g++

# Install only production dependencies
# RUN npm install --force

# Bundle app source
# COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
# USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20.13.1 As build

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./
# COPY --chown=node:node --from=development /app/node_modules ./node_modules

RUN yarn install

COPY . .

# Run the build command which creates the production bundle
# TODO Current build fails, skipping for now
# RUN yarn run build

# Set NODE_ENV environment variable
# ENV NODE_ENV production

RUN yarn build
RUN yarn cache clean


###################
# PRODUCTION
###################

FROM nginxinc/nginx-unprivileged:stable-alpine As production

ARG CF_REVISION=""
LABEL COMMIT_SHA=${CF_REVISION}
ENV COMMIT_SHA=${CF_REVISION}

# Copy the bundled code from the build stage to the production image
# TODO Current build fails, skipping for now
# COPY --chown=node:node --from=build /app/node_modules ./node_modules
# TODO Current build fails, skipping for now
# COPY --chown=node:node --from=build /app/config ./config

# Copy the nginx configuration file
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

COPY --chown=nginx:nginx --from=build /app/dist /usr/share/nginx/html

# USER 101

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
