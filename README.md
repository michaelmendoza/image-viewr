# Image Viewr - A image processing analysis tool

A web framework/library which uses html canvas to load/display images and do basic image processing

## Getting Started

### Setup local environment

For Mac: 
Install Homebrew (https://brew.sh/)
Install zmq with brew (for macOS): 
```
brew install zmq
brew install pkg-config
```

For All:
Add python dependencies: 
```
pip install zerorpc
```

Install NodeJS/NPM (https://nodejs.org/)

Install Webpack
```
npm install -g webpack
```

### Run simple local environment

```
npm install
npm test
```

Your app should be now running on http://localhost:3000/

### Setup for running local python server

Install Mongodb
For Mac:
Install mongo 
```
brew install mongo
```
Set up data directory 
```
mkdir -p /data/db
```
Run mongo
```
mongod
```

Start Server
cd server
./start-server.sh

Your app should be now running on http://localhost:3001/


