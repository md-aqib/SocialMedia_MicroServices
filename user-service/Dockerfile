# user-service/Dockerfile

# Use the official Node.js image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /home/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm ci

# Copy the rest of the application code
COPY . . 

# Expose the port the application runs on
EXPOSE 3000

# Define the command to run the application
CMD [ "npm", "run", "dev" ]
