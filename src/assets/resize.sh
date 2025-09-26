#!/bin/sh

for file in ./*
do
	echo $file
	SIZE=$(wc -c < $file)
	while [ $SIZE -gt 400000 ]
	do
		echo $SIZE
		convert -resize 50% $file $file
		SIZE=$(wc -c < $file)
	done
	echo "Final Size: $((SIZE/1000)) KB"
done
