const mongoose = require('mongoose')

const bill = new mongoose.Schema({

    afm : Number,
    name : String,
    billNumber : Number,
    billDate : Date,
    paymentDates : [{amount:Number, date:Date}],
    remainingAmount:Number
})

mongoose.model('Invoice', bill)
module.exports = mongoose.model('Invoice')