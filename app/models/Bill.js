module.exports = mongoose => {

    var schema  = mongoose.Schema({

        afm: Number,
        name: String,
        billNumber: Number,
        billDate: Date,
        mainAmount: Number,
        additionalPayments: [{ amount: Number, date: Date }]
    }, { timestamps: true })
    
    const Bill = mongoose.model('Invoice', schema)
    return Bill 
}
