#!/bin/bash

check_status() {
    if [ $? -ne 0 ]; then
        echo "ERROR: $1 failed"
        exit 1
    fi
}

current_dir=$(pwd)

if [[ "$current_dir" =~ /ericgong2005.github.io$ ]]; then
    cd docs
fi

if [[ "$current_dir" =~ /tools$ ]]; then
    cd ..
    cd docs
fi

current_dir=$(pwd)
    
if [[ ! "$current_dir" =~ /docs$ ]]; then
    echo "Not in the correct directory. Please navigate to /docs"
    exit 1
fi

echo "RUNNING: bundle exec jekyll build"
bundle exec jekyll build
check_status "Jekyll build"

echo "RUNNING: sitemap_generator.py"
python ../tools/sitemap_generator.py
check_status "Sitemap Generator"

echo "RUNNING: bundle exec jekyll build"
bundle exec jekyll build
check_status "Jekyll build"

echo "RUNNING: Change to parent directory"
cd ..

echo "RUNNING: Commit and push changes"
git add .
check_status "Git Add"
git commit -a -m "Automated Deployment"
check_status "Git Commit"
git push
check_status "Git Push"

echo "DEPLOYMENT SUCCESSFUL"
