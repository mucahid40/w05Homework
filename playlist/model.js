const Sequelize = require('sequelize');
const sequelize = require('../db');
// const songs = require('../songs/model')

const playlists = sequelize.define('playlists', {
    name: {
        type: Sequelize.STRING,
        field: 'artist',
        allowNull: false
    }
});

module.exports = playlists