# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose the application port
EXPOSE 4000

# Run the app
CMD ["npm", "run", "start"]
