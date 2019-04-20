const Sequelize = require('sequelize');
const sequelize = require('../db');
const playlists = require('../playlist/model')

const songs = sequelize.define('songs', {
  title: {
    type: Sequelize.STRING,
    field: 'title',
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    field: 'artist',
    allowNull: false
  },
  album: {
    type: Sequelize.STRING,
    field: 'album',
    allowNull: false
  }
});

songs.belongsTo(playlists)
module.exports = songs