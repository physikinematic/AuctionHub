# Use official Node.js image as base
FROM node:22-alpine

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to install dependencies
COPY ./Server/Nest/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY ./Server/Nest .

# Build the project (optional step if your project requires building)
RUN npm run build --if-present

# Expose the port your application will use (replace with your app's port)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
