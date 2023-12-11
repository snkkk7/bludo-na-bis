
const {Type,Holiday,NationalCuisine, MessageOfRecipe, Recipe, User} = require('../models')

const perPage = 10;

class AdminService {
    async addType(typeName){

        const type = await Type.create({name:typeName})

        return type

    }
    async addHoliday(holidayName){

        const holiday = await Holiday.create({name:holidayName})

        return holiday

    }
    async addNationalCuisine(nationalCuisineName){

        const nationalCuisine = await NationalCuisine.create({name:nationalCuisineName})

        return nationalCuisine

    }

    async editType(typeName,id){

        const type = await Type.update({name:typeName},{where:{id}})

        return type

    }

    async editNationalCuisine(nationalCuisineName,id){

        const nationalCuisine = await NationalCuisine.update({name:nationalCuisineName},{where:{id}})

        return nationalCuisine

    }

    async editHoliday(holidayName,id){

        const holiday = await Holiday.update({name:holidayName},{where:{id}})

        return holiday

    }

    async sendMessage(options){

        const candidate = await MessageOfRecipe.findOne({where:{
            recipeId:options.recipeId,
            userId:options.userId,
        }})

        if(!candidate){

        const message = await MessageOfRecipe.create({    
            message:options.message,    
            userId:options.userId,    
            recipeId:options.recipeId})

        const recipe = await Recipe.findOne({where:{
            id:options.recipeId,
        }})

        recipe.isPending = false

        recipe.isRejected = true

        await recipe.save()

        return {
            message:"Сообщение отправлено!"
        }

        }else{
            return {
                message:"Сообщение не отправлено!"
            }
        }

    }

    async banUser(id){

        const user = await User.findOne({where:{id}})

        user.isBanned = true

        await user.save()

        return {
            message:"Пользователь заблокирован!"
        }

    }

    async getExpectedRecipes(page){

        const offset = (page - 1) * perPage 

        const recipes = await Recipe.findAll({
            where:{
                isPending:true,
                isRejected:true,
                
            },
            offset,
            limit:5

        })

        return recipes
    }

    async getWasEditedRecipes(page){

        const offset = (page - 1) * perPage 

        const recipes = await Recipe.findAll({
            where:{
                wasEdited:true,
                isRejected:true,
            },
            offset,
            limit:5

        })

        return recipes

    }

    async approveTheRecipe(id){

        const recipe = await Recipe.findOne({where:id})

        recipe.isRejected = false

        recipe.isPending = false

        recipe.isChecked = true

        await recipe.save()

    }

}

module.exports = new AdminService()