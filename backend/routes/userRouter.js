const Router = require('express')
const userController = require('../controllers/userController')
const userRouter = new Router()
const {body} = require('express-validator');


userRouter.post('/registration',body('email').isEmail(),body('password').isLength({min: 3, max: 32}),userController.registration)

userRouter.post('/login',body('email').isEmail(),body('password').isLength({min: 3, max: 32}),userController.login)

userRouter.get("/logout",userController.logout)

userRouter.get("/checkAuth",userController.check)

userRouter.get('/refresh', userController.refresh);


module.exports = userRouter