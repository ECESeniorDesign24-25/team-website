#!/bin/bash -e

chmod +x setup_site.sh
./setup_site.sh
cd Website
echo "Removing old build..."
rm -rf web-build
echo "Building web files..."
expo build:web