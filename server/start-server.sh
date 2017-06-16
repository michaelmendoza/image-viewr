#!/usr/bin/env sh

echo 'Use ctrl + c to kill both servers'

# start the node server:
echo 'Handler starting node...'
node server.js &

# start the python server:
echo 'Handler starting python...'
python server.py && fg
