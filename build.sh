#!/bin/bash

# Build script for TypeScript Node.js project
# Author: ChatGPT
# Usage: Run using ./build.sh

echo "---- Starting Build Script ----"

# Step 1: Check if TypeScript is installed
if ! command -v tsc &> /dev/null
then
    echo "TypeScript is not installed. Installing TypeScript..."
    sudo npm install -g typescript
else
    echo "TypeScript is already installed."
fi

# Step 2: Install dependencies
echo "Installing project dependencies..."
npm install

# Step 3: Run the build script
echo "Building the project..."
if npm run build; then
    echo "Build completed successfully."
else
    echo "Build failed. Exiting script."
    exit 1
fi

# Step 4: Start the application with PM2
echo "Starting the application with PM2..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null
then
    echo "PM2 is not installed. Installing PM2..."
    sudo npm install -g pm2
else
    echo "PM2 is already installed."
fi

# Stop any existing PM2 process with the name 'master-api'
pm2 delete master-api &> /dev/null

# Start the app with PM2
pm2 start npm --name master-api -- start

# Save PM2 process list
pm2 save

echo "Application successfully started with PM2 as 'master-api'."
echo "---- Build Script Completed ----"
