const { Sequelize, DataTypes, sequelize } = require('./db');
const Dart = require('./dartModel');

//capture dat values
const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        validate: {isUUID: 4},
        primaryKey: true,
        comment: 'Unique Dart identifier'
    },
    request_id: {
        type: DataTypes.UUID,
        allowNull: true,
        comment: 'Id supplied by Client making this request'
    },
    when_requested: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { notEmpty: true },
        comment: 'Date information was requested the client'
    },
    when_provided: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { notEmpty: true },
        comment: 'Date information was sent back to the client'
    }
}, { 
    
});

Dart.hasMany(Report, {foreignKey: { name: "dart_id" }});
Report.belongsTo(Dart, {foreignKey: { name: "dart_id" }});

module.exports = Report;

