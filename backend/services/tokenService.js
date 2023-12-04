
const jwt = require('jsonwebtoken')

const {RefreshToken} = require('../models')

class TokenService {
    generateTokens(id,role,email){
        const accessToken = jwt.sign( {id, email, role}, process.env.SECRET_KEY_ACCESSTOKEN,{expiresIn: '24h'})
        const refreshToken = jwt.sign( {id, email, role}, process.env.SECRET_KEY_REFRESHTOKEN,{expiresIn: '14s'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await RefreshToken.findOne({where:{userId}})
        
        if (tokenData) {
           
            tokenData.refreshToken = refreshToken;
            return tokenData.save()

        }else{
           
            const token = await RefreshToken.create({userId, refreshToken})
            console.log(token.userId + " TOOKEN")
            return token;
        }       
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRET_KEY_REFRESHTOKEN);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async removeToken(refreshToken){
        const token = await RefreshToken.destroy({where:{refreshToken}})

        return token
    }

    async findToken(refreshToken){
        try{
        const token = await RefreshToken.findOne({where:{refreshToken}})

        return token
        }catch(e){
            return null
        }
    }

}

module.exports = new TokenService()