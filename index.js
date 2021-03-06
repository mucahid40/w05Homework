const express = require('express');
const bodyParser = require('body-parser');
const playlistRouter = require('./playlist/routes');
const songsRouter = require('./songs/routes');
const login = require('./auth/routes');
const usersRouter = require('./users/routes');


const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(playlistRouter)
  .use(songsRouter)
  .use(login)
  .use(usersRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))