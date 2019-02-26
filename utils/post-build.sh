#!/bin/bash

cat build/options.html | grep -v '<script src="http://localhost:8097"></script>' > options.html.tmp
mv options.html.tmp build/options.html
