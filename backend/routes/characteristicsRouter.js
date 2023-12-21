const Router = require('express')

const recipeController = require('../controllers/recipeController')

const characteristicsRouter = new Router()

characteristicsRouter.get('/',recipeController.getCharacteristics)

module.exports = characteristicsRouter
