#!/bin/zsh

# abort on errors
set -e

# build
pnpm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b release
git add -A
git commit -m 'deploy'

# if you are deploying to https://<rainbowflesh>.github.io
git push -f git@github.com:rainbowflesh/rainbowflesh.github.io.git

# if you are deploying to https://<rainbowflesh>.github.io/<REPO>
# git push -f git@github.com:<rainbowflesh>/<REPO>.git main:gh-pages

cd -
