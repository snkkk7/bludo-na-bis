const Router = require('express')

const recipeController = require('../controllers/recipeController')

const characteristicsRouter = new Router()

characteristicsRouter.get('/types',recipeController.getTypes)

characteristicsRouter.get("/holidays",recipeController.getHolidays)

characteristicsRouter.get("/nationalCuisines",recipeController.getNationalCuisines)

module.exports = characteristicsRouter
