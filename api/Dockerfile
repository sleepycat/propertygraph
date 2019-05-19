FROM node:12-alpine
LABEL maintainer="mike@korora.ca"

ENV NODE_ENV production

WORKDIR /app
COPY . .
RUN npm ci

USER node
EXPOSE 3000
CMD ["npm",  "start"]

