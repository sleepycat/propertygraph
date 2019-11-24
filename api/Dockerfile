FROM node:13-alpine
LABEL maintainer="mike@korora.ca"

ENV NODE_ENV production

WORKDIR /app
COPY src ./src
COPY index.js ./index.js
COPY package* ./
COPY migrations.js ./
RUN npm ci

USER node
EXPOSE 3000
CMD ["npm",  "start"]
