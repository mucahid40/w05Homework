const playlist = require('../playlist/model');
const { Router } = require('express');
const songs = require('./model');

const router = new Router()

// i did this for testing purposes to see if i have songs
router.get('/playlists/:id/songs', (req, res, next) => {
  songs
  // i can do it inside out because of include but cant do it the other way arround says its not associated with each other
  // tried to use belongsto in playlist but doesnt work says the some or the website crashes
    .findByPk(req.params.id, { include: playlist})
    .then(songs => {
      if (!songs) {
        return res.status(404).send({
          message: `songs does not exist`
        })
      }
      return res.send(songs)
    })
    .catch(error => next(error))
})


//create a song and post it to that playlist
router.post('/playlists/:id/songs', (req, res, next) => {
  songs
    //find the playlist by id and put that in :id
    .findByPk(req.params.id)

  //create a song with the params that i get
  songs
    .create(req.body)
    // then send message if there is a song send created 
    .then(song => {
      //if not created send 404
      if (!song) {
        return res.status(404).send({
          message: `songs does not exist`
        })
      }
      return res.status(201).send(song)
    })
    .catch(error => next(error))


})

router.get('/artists', (req, res, next) => {
 
  Promise.all([
    songs.count(),
    songs.findAll({order: [['artist', 'ASC']]})
//     Object.values(songs.artist).forEach(artist => {
//       let this['artist'] = []
//     });
//     songs.map(song => {
//       if (song.artist === )
    // })
  ])
    .then(( songs ) => {
      res.send({songs})
    })
    .catch(error => next(error))
})
module.exports = router;