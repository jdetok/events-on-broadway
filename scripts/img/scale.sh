#!/usr/bin/env bash

for f in *.png; do 
    ffmpeg -i "$f" -vf "scale=iw*0.4:ih*0.4" "${f%.png}_04.png"; 
done