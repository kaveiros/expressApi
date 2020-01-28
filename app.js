const express = require('express')
const app = express();
const db = require('./dbPool')
const BillsController = require('./bill/BillsController')
app.use('/invoice', BillsController)

module.exports = app
