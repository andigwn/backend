const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('absensi', 'root', 'Keyzz082253!', {
    dialect: "mysql",
    host: "localhost",
})
module.exports = sequelize