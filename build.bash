#!/usr/bin/env bash

set -e

build_dir=www
upload=upload

test -d $build_dir && rm -r $build_dir

echo "Generating static files from sources"
wintersmith build
cd $build_dir
for f in c/*.css
do
	echo "Minifying $f"
	java -jar `which closure-stylesheets.jar` --allow-unrecognized-properties $f > $f.tmp
	mv $f.tmp $f
done
zopfli -v --i1000 {,**/}*.{html,css,png}
cd .. # Done

tree $build_dir

read -e -p "Upload: " -i y choice
shopt -s nocasematch
[[ $choice == "Y" ]] && test -x ./$upload && ./$upload
