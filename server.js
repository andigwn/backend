const express = require('express')
const cors = require('cors')
const PORT = 3004
const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('database ready!!'))

const userEndpoint = require('./routes/users')
const absensEndpoit = require('./routes/absen')
const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', userEndpoint)
app.use('/absens', absensEndpoit)

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})