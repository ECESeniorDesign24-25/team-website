#!/bin/bash -e

./build.sh
pip install -r requirements.txt
python3 SFTPUpload.py