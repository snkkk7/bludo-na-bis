
const Router = require('express')

const router = new Router()

const userRouter = require('./userRouter')

const recipeRouter = require('./recipeRouter')

const adminRouter = require("./adminRouter")

const characteristicsRouter = require('./characteristicsRouter')

router.use('/user',userRouter)

router.use('/recipes',recipeRouter)

router.use("/admin",adminRouter)

router.use("/characteristics",characteristicsRouter)

module.exports = router