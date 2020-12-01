const db = require('../config/dbPool')
const Bill = db.Bill

const faker = require('faker');



exports.info = (req, res) => {

    res.status(200).send("Version 0.1")
}


exports.faker = (req, res) => {

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

}

//Create new Invoice
exports.create = (req, res) => {

    var bill = new Bill({
        afm: req.body.afm,
        name: req.body.name,
        billNumber: req.body.billNumber,
        billDate: req.body.mainDate,
        mainAmount: req.body.mainAmount,
        additionalPayments: req.body.additionalPayments
    })

    bill.save(bill).then(data => {
        return res.status(201).send(data)

    }).catch(err => {
        return res.status(500).send(err)
    })
}

//search all bills
exports.search = async (req, res) => {

    var page = req.params.page || 1
    console.log(page)
    console.log(req.body)

    await getInvoices(page, req, res)
}


async function getInvoices(page, req, res) {
    var perPage = 20
    if (page === 0) {
        page = 1
    }
    let dropDownValue = req.body.dropDownValue
    let searchTerm = req.body.searchTerm
    var queryObject = {}
    //search for name
    if (dropDownValue === "name") {
        queryObject = { name: { $regex: searchTerm } }
    }
    //search for afm
    else if (dropDownValue === "afm") {
        queryObject = { afm: Number(searchTerm) }
    }
    //search for billNumber
    else if (dropDownValue === "billNumber") {
        queryObject = { billNumber: Number(searchTerm) }
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
}

//get bill 
exports.getInvoice = (req, res) => {
    Bill.findById(req.params.id, (err, bill) => {
        if (err) return res.status(500).send("There was an issue fetcing invoice")
        res.status(200).send(bill)
    })
}

//delete bill
exports.deleteInvoice = (req, res) => {
    Bill.findOneAndDelete(req.params.afm, (err, bill) => {
        if (err) return res.status(500).send("There was an issue deleting the invoice")
        res.status(200).send("deleted")
    })
}

exports.updateInvoice = (req, res) => {

    console.log(req.body)
    if (!req.body) {
        return res.status(400).send({ message: "Το τιμολόγιο προς ενημέρωση δεν μπορεί να είναι κενό!" })
    }

    const id = req.params.id;
    Bill.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "Το τιμολόγιο δεν ενημερώθηκε. Μήπως δεν υπάρχει;" })
            }
            else {
                res.status(204).send({ message: "Το τιμολόγιο ενημερώθηκε!" })
            }
        }).catch(error => {
            res.status(500).send(error)
        })

}
