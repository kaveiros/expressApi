const mongoose = require('mongoose')

const bill = new mongoose.Schema({

    afm : Number,
    name : String,
    billNumber : Number,
    billDate : String,
    paymentDates : [{amount:Number, date:String}],
    remainingAmount:Number
})

mongoose.model('Invoice', bill)
module.exports = mongoose.model('Invoice')