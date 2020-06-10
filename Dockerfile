FROM node:12.18.0-alpine3.11

# Working directory
WORKDIR /usr/src/app

# Copy depedencies
COPY package.json .

# Install dependencies
RUN npm install

# Copy all other source code to work directory
COPY tsconfig.json .
COPY src/ src/

# Compile
RUN npm run build

# open port
EXPOSE 3000

# Start API
CMD [ "node", "dist/index.js" ]
