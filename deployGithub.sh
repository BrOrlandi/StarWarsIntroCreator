#!/bin/bash
if [[ $# -eq 0 ]] ; then
    echo 'Use: ./deployGithub.sh "Commit message"'
    exit 1
fi

git checkout master
npm run build
git checkout gh-pages
git pull
mv dist/* ./
mv dist/.* ./
git add .
git commit -m "$1"
git push
git checkout master
