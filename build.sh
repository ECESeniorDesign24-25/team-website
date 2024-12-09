#!/bin/bash -e

./setup.sh
cd Website
echo "Removing old build..."
rm -rf web-build

echo "Building web files..."
expo build:web