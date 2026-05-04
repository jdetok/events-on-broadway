#!/usr/bin/env bash

for f in *.png; do 
    ffmpeg -i "$f" -vf "scale=iw*0.2:ih*0.2" "${f%.png}_02.png"; 
done