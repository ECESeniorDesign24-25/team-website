#!/bin/bash -e

./build_site.sh
pip install -r requirements.txt
python3 SFTPUpload.py