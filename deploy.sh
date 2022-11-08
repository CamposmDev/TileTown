#!/usr/bin/env bash

# Install node modules for the client and the server
npm --prefix ./client install
npm --prefix ./server install

# Cleanup any old build files
rm -rf client/build
rm -rf server/build

# Run the build scripts for the client and the server
npm --prefix ./client run build
npm --prefix ./server run build

# Move the client build files into the server
mkdir server/build/server/client
cp -r client/build/* server/build/server/client

# Start running the server with nodemon
npm --prefix ./server run start


