# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container's working directory
COPY . .

# Expose the port that your Express app will run on
EXPOSE 5000

# Command to start the app when the container is run
CMD ["node", "index.js"]
