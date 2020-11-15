const mongoose = require('mongoose')

const uri = "mongodb://localhost:27017/bill"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
