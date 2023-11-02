#!/usr/bin/env bash
for svg in icons/*.svg; do
	for x in 100 200 300 ; do inkscape \
		--export-background-opacity=0 \
		--export-width=${x} \
		--export-type=png \
		--export-filename=${svg%.*}${x}.png ${svg}; 
	done
done

