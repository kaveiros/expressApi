const mongoose = require('mongoose')

const uri = "mongodb://localhost:27017/bill"
mongoose.connect(uri)
//mongoose.createConnection(uri, {poolSize:4, useNewUrlParser: true, useUnifiedTopology: true })
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('connected to database'))

// module.exports = db