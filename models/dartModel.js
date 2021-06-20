const { Sequelize, DataTypes, sequelize } = require('./db');

//capture dat values
const Dart = sequelize.define('Dart', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        validate: {isUUID: 4},
        primaryKey: true,
        comment: 'Unique Dart identifier'
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
    sequence: {
        type: DataTypes.STRING,
        comment: 'large sequence number from dart post - indicating relative time stamp'
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
        comment: 'x co-ordinate in mm of landed dart'
    },
    y_coord: {
        type: DataTypes.INTEGER,
        comment: 'y co-ordinate in mm of landed dart'
    },
    v_degrees: {
        type: DataTypes.FLOAT,
        comment: 'vector degrees'
    },
    v_distance_mm: {
        type: DataTypes.FLOAT,
        comment: 'vector length in millimeters'
    },
    x_coord_pixels: {
        type: DataTypes.INTEGER,
        comment: 'x co-ordinate in pixels of landed dart'
    },
    y_coord_pixels: {
        type: DataTypes.INTEGER,
        comment: 'y co-ordinate in pixels of landed dart'
    },
    w_pixels: {
        type: DataTypes.INTEGER,
        comment: 'width in pixels of dartboard container element'
    },
    h_pixels: {
        type: DataTypes.INTEGER,
        comment: 'height in pixels of dartboard container element'
    },
    v_distance_pixels: {
        type: DataTypes.FLOAT,
        comment: 'vector length in pixels'
    }
}, { 
    
});

module.exports = Dart;

