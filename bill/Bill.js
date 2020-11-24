const mongoose = require('mongoose')

const bill = new mongoose.Schema({

    afm : Number,
    name : String,
    billNumber : Number,
    billDate : Date,
    mainAmount:Number,
    additionalPayments: [{amount: Number, date: Date}]
})

mongoose.model('Invoice', bill)
module.exports = mongoose.model('Invoice')