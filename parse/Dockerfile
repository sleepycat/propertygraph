FROM node:12-alpine
LABEL maintainer="mike.williamson@cds-snc.ca"

ENV NODE_ENV production

WORKDIR /app
COPY src ./src
COPY index.js ./index.js
COPY package* ./
RUN npm ci

USER node
EXPOSE 3000
CMD ["npm",  "start"]

