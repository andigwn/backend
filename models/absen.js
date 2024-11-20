const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db.config')
class Absens extends Model { }
Absens.init({
    user_nip: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.ENUM('in', 'out')
    }
}, {
    sequelize,
    modelName: 'Absens'
})
module.exports = Absens