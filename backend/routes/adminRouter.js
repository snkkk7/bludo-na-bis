const Router = require('express')

const adminRouter = new Router()

const adminController = require('../controllers/adminController')

adminRouter.post("/type",adminController.addType)

adminRouter.post("/nationalCuisine",adminController.addNationalCuisine)

adminRouter.post("/holiday",adminController.addHoliday)

adminRouter.put('/type/:id',adminController.editType)

adminRouter.put("/holiday/:id",adminController.editHoliday)

adminRouter.put("/nationalCuisine/:id",adminController.editNationalCuisine)

adminRouter.post("/sendMessage",adminController.sendMessage)

module.exports = adminRouter