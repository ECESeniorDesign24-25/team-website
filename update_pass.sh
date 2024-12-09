#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <new_password>"
    exit 1
fi

NEW_PASSWORD=$1

# update password
sed -i '' "s/export const PASSWORD = \".*\";/export const PASSWORD = \"$NEW_PASSWORD\";/" "Website/pass.ts"

# redeploy
./deploy_vercel.sh
./deploy_myweb.sh

echo "Updated password to '$NEW_PASSWORD'."
