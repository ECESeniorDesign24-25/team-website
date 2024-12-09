#!/bin/bash -e

npm install -g vercel
./build.sh
cd Website/web-build
vercel --prod --yes