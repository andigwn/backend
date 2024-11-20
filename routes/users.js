const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')
// routing endpoint users data

router.get('/', async (req, res) => {
    const users = await UsersModel.findAll()

    res.status(200).json({
        data: users,
        metadata: "testing user endpoint wak"
    })
})
router.post("/", async (req, res) => {
    const { nip, nama, password } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10,)

    const users = await UsersModel.create({
        nip, nama, password: encryptedPassword
    })
    res.status(200).json({
        data: users,
        metadata: "testing post data"
    })
})
router.put('/', async (req, res) => {
    const { nip, nama, password, passwordBaru } = req.body
    const check = await passwordCheck(nip, password)
    const encryptedPassword = await bcrypt.hash(passwordBaru, 10,)


    if (check.compare == true) {
        const users = await UsersModel.update({
            nama, password: encryptedPassword
        }, { where: { nip: nip } })
        res.status(200).json({
            users: { update: users[0] },
            metadata: "users update successfully"
        })
    } else {
        res.status(400).json({
            "error": "Data Invalid"
        })
    }
})
router.post('/login', async (req, res) => {
    const { nip, password } = req.body
    const check = await passwordCheck(nip, password)
    if (check.compare == true) {
        res.status(200).json({
            users: check.userData,
            metadata: "Login Berhasil"
        })
    } else {
        res.status(400).json({
            error: "data invalid"
        })
    }

})

router.delete('/', async (req, res) => {
    const { nip } = req.body
    const users = await UsersModel.destroy({ where: { nip: nip } })
    res.status(200).json({
        users: { delete: users },
        metadata: "Delete user successfully"
    })
})
module.exports = router