const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require("cors");
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
const faker = require('faker');


const Bill = require('./Bill')

router.get('/info', cors(), (req, res) => {

    res.status(200).send("Version 0.1")
})


router.get('/faker', cors(), (req, res) => {

    for (var i = 0; i < 30000; i++) {
        Bill.create({
            afm: faker.random.number(),
            name: faker.company.companyName(),
            billNumber: faker.random.number(),
            billDate: faker.date.recent(),
            mainAmount: faker.random.number()
        }, (err, Bill) => {
            if (err) {
                console.log(err)
                //change error response
                return res.status(500).send(err)
            }
        })
    }
    return res.status(201).send("Created fake data")

})

//Create new Invoice
router.post('/create', cors(), (req, res) => {
    Bill.create({
        afm: req.body.afm,
        name: req.body.name,
        billNumber: req.body.billNumber,
        billDate: req.body.mainDate,
        mainAmount: req.body.mainAmount
    }, (err, Bill) => {
        if (err) {
            console.log(err)
            //change error response
            return res.status(500).send(err)
        }
        return res.status(201).send(Bill)
    })
})

router.get('/all/:page*?', cors(), async (req, res) => {

    var page = Number(req.params.page) || 1
    await getInvoices(page, req, res)
    })


//search all bills
router.post('/all/:page*?', cors(), async (req, res) => {

    var page = req.params.page || 1
    console.log(page)

    //await getInvoices(page, req, res)
    })


async function getInvoices (page, req, res) {
    var perPage = 20
    if (page === 0){
        page = 1
    }
    var nameQuery = req.body.name || ""
    var afmQuery = req.body.afm || 0
    var amountQuery = req.body.mainAmount || 0
    var queryObject = {}
    if (nameQuery != "") {
        queryObject = { name: nameQuery}
    }
    else if (afmQuery != ""){
        queryObject = {afm : {$eq : afmQuery}}
    }
    else if (amountQuery != 0){
        queryObject = {mainAmount : amountQuery}
    }
        try {

            const count = await Bill.countDocuments(queryObject)
            const invoices = await Bill
                .find(queryObject)
                .skip((perPage * page) - perPage).sort({ afm: 1 }).limit(perPage)
            res.status(200).send(
                {
                    pages: Math.ceil(count / perPage),
                    currentPage: page,
                    invoices: invoices
                })

        }
        catch (error) {
            res.status(500).send(error)
        }
        // Bill.find({}, (err, invoices) => {
        //     if(err) return res.status(500).send("There was an issue fetching all invoices")
        //      res.status(200).send(invoices)
        // })
} 

//get bill 
router.get('/:id', cors(), (req, res) => {
    Bill.findById(req.params.id, (err, bill) => {
        if (err) return res.status(500).send("There was an issue fetching all invoices")
        res.status(200).send(bill)
    })
})

//delete bill
router.delete('/erase', (req, res) => {
    Bill.findOneAndDelete(req.params.afm, (err, bill) => {
        if (err) return res.status(500).send("There was an issue deleting the invoice")
        res.status(200).send("deleted")
    })
})





module.exports = router