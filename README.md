# Librarian Mongo Data

## Installation
```
$ npm install librarian-mongo-data
```

## Usage
```js
const express = require( 'express' )
const librarian = require( 'librarian' )
const MongoMeta = require( 'librarian-mongo-meta' )

let meta = new MongoMeta({
  host: '192.168.0.44:27017', // optional, defaults to 'localhost'
  database: 'myAwesomeDb', // optional, defaults to 'librarian'
  collection: 'myUploads' // optional, defaults to 'files'
})
let app = express()
app.use('/files', librarian({
  meta: meta
}))
app.listen(8888, function(){
  console.log( 'app listening' )
})
```
