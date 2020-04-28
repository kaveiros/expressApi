const mongoose = require('mongoose')

const bill = new mongoose.Schema({

    afm : Number,
    name : String,
    billNumber : Number,
    billDate : Date,
    mainAmount:Number
})

mongoose.model('Invoice', bill)
module.exports = mongoose.model('Invoice')