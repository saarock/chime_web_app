FROM node:22

WORKDIR /app

# Install app dependencies
COPY package*.json .
RUN npm install 

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]

