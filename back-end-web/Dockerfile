# Use Node.js LTS version as base image for back-end-web
FROM node:lts-alpine as back-end-web

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY back-end-web/package*.json ./

# Install dependencies for back-end web app
RUN npm install

# Copy the entire back-end web app directory to /app
COPY back-end-web .

COPY .env .

# Expose the back-end web app port
EXPOSE 3000

# Build the back-end web app
RUN npm run build

# Start the back-end web app
CMD ["npm", "run", "start"]