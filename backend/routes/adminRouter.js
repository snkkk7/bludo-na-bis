const Router = require('express')

const adminRouter = new Router()

const adminController = require('../controllers/adminController')

adminRouter.post("/type",adminController.addType)

adminRouter.post("/nationalCuisine",adminController.addNationalCuisine)

adminRouter.post("/holiday",adminController.addHoliday)

adminRouter.put('/type/:id',adminController.editType)

adminRouter.put("/holiday/:id",adminController.editHoliday)

adminRouter.put("/nationalCuisine/:id",adminController.editNationalCuisine)

adminRouter.delete("/:id",adminController.deleteType)

adminRouter.get('/allHolidays',adminController.getAllHolidays)

adminRouter.get('/allNationalCuisines',adminController.getAllNationalCuisines)

adminRouter.get('/allTypes',adminController.getAllTypes)

adminRouter.put('/approveRecipe/:id',adminController.approveTheRecipe)

adminRouter.put('/rejectRecipe/:id',adminController.rejectTheRecipe)

module.exports = adminRouter