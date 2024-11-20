const express = require('express')
const router = express.Router()
const AbsensModel = require('../models/absen')
// routing endpoint users data

router.get('/', async (req, res) => {
    const absens = await AbsensModel.findAll()

    res.status(200).json({
        data: absens,
        metadata: "testing absens endpoint wak"
    })
})
router.post('/checkin', async (req, res) => {
    const { nip } = req.body
    const absens = await AbsensModel.create({
        user_nip: nip, status: 'in'
    })

    res.status(200).json({
        data: absens,
        metadata: "Checkin Berhasil"
    })
})
router.post('/checkout', async (req, res) => {
    const { nip } = req.body
    const absens = await AbsensModel.create({
        user_nip: nip, status: 'out'
    })

    res.status(200).json({
        data: absens,
        metadata: "Checkout Berhasil"
    })
})
module.exports = router