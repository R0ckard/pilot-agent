# Use Node.js LTS as base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose no ports — this is a background app, not a web server

# Run the Pilot Agent
CMD [ "node", "index.js" ]
