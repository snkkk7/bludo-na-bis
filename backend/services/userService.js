const { User, RefreshToken } = require("../models")
const tokenService = require("./tokenService")
const bcrypt = require('bcrypt')
const ApiError = require('../error/ApiError')

class UserService {
    async registration(name,email,password){

        const candidate = await User.findOne({where:{email}})

        if (candidate) {
            return ApiError.badRequest('Пользователь с таким email уже существует')
        }

        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({name,email, password: hashPassword})

        const tokens = tokenService.generateTokens(user.id,user.email,user.role)

        await tokenService.saveToken(user.id,tokens.refreshToken)

        return {
            user,
            tokens
        }

    }
    async login(email,password){

        const user = await User.findOne({email})

        if (!user) {
            return ApiError.BadRequest('Пользователь с таким email не найден')
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            return ApiError.BadRequest('Неверный пароль');
        }

        const userDto = {
            email:user.email,
            id:user.id
        }

        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}

    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async getMe(refreshToken){

        const userData = await tokenService.findToken(refreshToken)

        return userData
    }


    async refresh(refreshToken){
        if (!refreshToken) {
            return ApiError.forbidden();
        }

        console.log("REFRESH TOKEN!!!!!!" + refreshToken) 

        const userData = tokenService.validateRefreshToken(refreshToken);

        const tokenFromDb = await tokenService.findToken(refreshToken);

        console.log(userData,tokenFromDb + " наши токены")

        if (!userData || !tokenFromDb) {
            
            return ApiError.forbidden();
        }

        const user = await User.findOne({where:{id:tokenFromDb.userId}})

        const userDto = {
            id:user.id,
            name:user.name,
            email:user.email,
            likedPosts:user.likedPosts,
            role:user.role
        }

        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
}

module.exports = new UserService()