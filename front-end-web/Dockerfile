# Use Node.js LTS version as base image for front-end-web
FROM node:lts-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY front-end-web/package*.json ./

# Install dependencies for front-end web app
RUN npm install

# Copy the entire front-end web app directory to /app
COPY front-end-web .

# Build the front-end web app
RUN npm run build

# Expose the front-end web app port
EXPOSE 4200

# Start the front-end web app
CMD ["npm", "run", "start"]
