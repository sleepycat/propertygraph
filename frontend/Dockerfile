FROM node:13-alpine

WORKDIR /app
EXPOSE 3000
CMD ["npm", "run", "start"]

RUN npm ci
COPY . .
