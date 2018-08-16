#!/usr/bin/env bash

yarn build
yarn docs:build
yarn build:demo
currentBranch=`git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'`
git checkout gh-pages
mkdir -p docs
yes | cp -rf dist/docs/* docs
git add -A
git commit -m "docs update"
git checkout $currentBranch
