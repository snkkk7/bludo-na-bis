const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserService = require('../services/userService');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');


class UserController {
    async registration(req, res, next) {
        try{
            const {name,email,password} = req.body

            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const userData = await UserService.registration(name,email,password)

            res.cookie(ЭrefreshTokenЭ, userData.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            res.cookie("accessToken",userData.tokens.accessToken,{maxAge: 30 * 1 * 60 * 60 * 1000, httpOnly: true})

            res.json(userData)

         }
         catch(e){
            next(e)
         }
    }

    async login(req, res, next) {
        try{
            const {refreshToken} = req.cookies

            const {email,password} = req.body

            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }

            const userData = await userService.login(email,password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 1 * 60 * 60 * 1000, httpOnly: true})

            res.json({...userData})
        }catch(e){
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;

            console.log("REFRESH TOKEN!!!!!!" + refreshToken) 

            const userData = await userService.refresh(refreshToken);
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 1 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }



    async check(req, res, next) {
        const {refreshToken} = req.cookies;

        const validateToken = tokenService.validateRefreshToken(refreshToken)

        const token = await tokenService.findToken(refreshToken)

        if(!token){
            res.json({message:"Пользователь не авторизован",isAuth:false})
        }else{
            res.json({message:"Пользователь авторизован",isAuth:true})
        }

    }
}

module.exports = new UserController()