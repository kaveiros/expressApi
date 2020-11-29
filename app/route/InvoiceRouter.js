module.exports = app => {

    const billsController = require('../Controller/BillsController')

    var router = require('express').Router()

    const ROUTE_PATH = "invoice"



    router.get("/info", billsController.info)

    router.get('/faker', billsController.faker)

    router.post('/create', billsController.create)

    router.post('/all/:page*?', billsController.search)

    router.get('/:id', billsController.getInvoice)


    router.delete('/erase', billsController.deleteInvoice)


    app.use("/invoice", router)




}