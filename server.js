const express = require('express')
const cors = require('cors');
const db = require('./app/config/dbPool')
const bodyParser = require('body-parser')

const app = express();

const corsOptions = {
    origin : "http://localhost:3001"
}

app.use(cors(corsOptions))
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to invoice application." });
  });

 require('./app/route/InvoiceRouter')(app)

const PORT = 3000
app.listen(PORT, ()=> console.log(`app listening on port : ${PORT}` ))