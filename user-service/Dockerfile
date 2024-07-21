# user-service/Dockerfile

FROM node:16

WORKDIR /Learnings/micro-services-proj/post-service

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
