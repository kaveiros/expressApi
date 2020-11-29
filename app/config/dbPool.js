const dbConfig = require('./dbConfig')
const mongoose = require('mongoose')
const Bill = require('../models/Bill')(mongoose)


const db ={}
db.mongoose = mongoose
db.url = dbConfig.dbUrl
db.Bill = Bill
db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
module.exports = db
