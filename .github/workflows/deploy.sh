#!/bin/bash

pnpm run build

cd dist

git init
git checkout -b release
git add -A
git commit -m 'deploy'

git push -f git@github.com:rainbowflesh/rainbowflesh.github.io.git
# git push -f git@github.com:<username>/<username>.github.io.git
