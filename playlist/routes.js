const { Router } = require('express')
const playlists = require('./model')
const songs = require('../songs/model')

const router = new Router()

//playlist part!!
//get playlist and set a limit on howmany you can see
router.get('/playlists', (req, res, next) => {
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0

  Promise.all([
    playlists.count(),
    playlists.findAll({ limit, offset })
  ])
    .then(([total, playlists]) => {
      res.send({
        playlists, total
      })
    })
    .catch(error => next(error))
})

//create new playlist
router.post('/playlists', (req, res, next) => {
  playlists
    .create(req.body)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `playlist does not exist`
        })
      }
      return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})


//playlist :id part!!
//get specefic playlist
router.get('/playlists/:id', (req, res, next) => {
  console.log("hellloooo",req.params)
  playlists
    .findByPk(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `playlist does not exist`
        })
      }
      return res.send(playlist)
    })
    .catch(error => next(error))
})

//delete specific playlist
router.delete('/playlists/:id', (req, res, next) => {
  playlists
    .findByPk(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `playlist does not exist`
        })
      }
      return playlist.destroy()
        .then(() => res.send({
          message: `playlist was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router;