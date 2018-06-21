# README

## Table of Contents

- [Details](#details)
- [Requirements](#requirements)
- [Installation](#installation)
- [Build](#build)

## Details
### Name
TvMaze Scraper

### Description
A scraper that loads all the shows from TvMaze into our own DB.
Allow the user to get shows by id using regex search and for performance, reasons get the cast of the show only when required, this allows to do too many requests to TvMaze and get locked.

### Author
Roberto Sousa


## Requirements
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)


## Installation
- Install dependencies
```
npm i
```
- Start the local project
```
npm run dev
```

- Do a get request to 
```
http://localhost:3000/show/{ID}?page={pageNumber}
```

##Build

| npm Scripts               |                                   Description                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`                                 |
| `dev`                     | Start the project with the dev options on                                                         |