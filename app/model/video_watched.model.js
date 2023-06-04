const db = require('../model/index.model')

module.exports = (sequelize, Sequelize) => {
    const VideoWatched = sequelize.define('video_watched', {
        durationSec: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        startTime: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endTime: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        underscored: true
    })
    return VideoWatched
}