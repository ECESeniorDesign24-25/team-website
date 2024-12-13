#!/bin/bash -e

cd Website
echo "Removing old build..."
rm -rf web-build
chmod +x setup_site.sh
./setup_site.sh
echo "Building web files..."
expo build:web