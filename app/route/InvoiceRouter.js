module.exports = app => {

    const billsController = require('../Controller/BillsController')

    var router = require('express').Router()

    router.get("/info", billsController.info)

    router.get('/faker', billsController.faker)

    router.post('/create', billsController.create)

    router.post('/all/:page*?', billsController.search)

    router.get('/:id', billsController.getInvoice)

    router.put('/update/:id', billsController.updateInvoice)

    router.delete('/erase', billsController.deleteInvoice)

    app.use("/invoice", router)

}