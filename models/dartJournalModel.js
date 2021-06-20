const { Sequelize, DataTypes, sequelize } = require('./db');

const Dart_Journal = sequelize.define('Dart_Journal', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        validate: {isUUID: 4},
        primaryKey: true,
        comment: 'Unique Dart identifier'
    },
    dart_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {isUUID: 4},
        comment: 'id of the archived dart row'
    },
    when_journaled: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { notEmpty: true },
        comment: 'When Journaled -- should closely match created-at date'
    },
    when_first_reported: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { notEmpty: true },
        comment: 'First report date on board'
    },
    when_last_reported: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { notEmpty: true },
        comment: 'Last report date of board'
    },
    when_no_longer_reported: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: { notEmpty: true },
        comment: 'WHen no longer reported - not on the dartboard anymore - note will be archived'
    },
    times_reported: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: 'Times reported'
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true },
        comment: 'Dartboard Value of landed dart'
    },
    multiplier: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        validate: { notEmpty: true },
        comment: 'Either single double or triple'
    },
    x_coord: {
        type: DataTypes.INTEGER,
        comment: 'x co-ordinate (in mm) of corrected dart'
    },
    y_coord: {
        type: DataTypes.INTEGER,
        comment: 'y co-ordinate (in mm) of corrected dart'
    },
    x_coord_pixels: {
        type: DataTypes.INTEGER,
        comment: 'x co-ordinate in pixels of corrected dart'
    },
    y_coord_pixels: {
        type: DataTypes.INTEGER,
        comment: 'y co-ordinate in pixels of corrected dart'
    },
    w_pixels: {
        type: DataTypes.INTEGER,
        comment: 'width in pixels of dartboard container element'
    },
    h_pixels: {
        type: DataTypes.INTEGER,
        comment: 'height in pixels of dartboard container element'
    },
}, { 
    
});

module.exports = Dart_Journal;

