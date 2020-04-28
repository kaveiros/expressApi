const express = require('express')
const app = express();
const cors = require('cors');
const db = require('./dbPool')
const BillsController = require('./bill/BillsController')
app.use(cors())
app.use('/invoice', BillsController)

module.exports = app
