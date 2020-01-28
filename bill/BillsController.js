const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

const Bill = require('./Bill')

router.get('/info',(req, res) => {

    res.status(200).send("Version 0.1")
})

//Create new Invoice
router.post('/create', (req,res) => {
    console.log(req)
    Bill.create({
        afm : req.body.afm,
        name : req.body.name,
        billNumber : req.body.billNumber,
        billDate : Date.parse(req.body.billDate),
        //paymentDates : req.body.paymentDates,
        remainingAmount: req.body.remainingAmount
    }, (err, Bill)=>{
        if (err) {
            console.log(err)
            //change error response
            return res.status(500).send(err)
        }
        return res.status(201).send(Bill)
    })
})

module.exports = router