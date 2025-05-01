FROM node:22

WORKDIR /chime_front

# Install app dependencies
COPY package*.json .
RUN npm install 

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]

