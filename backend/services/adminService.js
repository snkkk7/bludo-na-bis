
const {Type,Holiday,NationalCuisine,  Recipe, User} = require('../models')

const perPage = 10;

class AdminService {
    async addType(typeName){

        console.log(typeName)

        const type = await Type.create({name:typeName})

    
        return 1

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

    async deleteType(id){
        const type = await Type.destroy({where:{id}})

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


    async approveTheRecipe(id){

        const recipe = await Recipe.findOne({where:{id}})

        recipe.isRejected = false

        recipe.isPending = false

        recipe.isChecked = true

        await recipe.save()

    }

    async rejectTheRecipe(id){

        const recipe = await Recipe.findOne({where:{id}})

        recipe.isRejected = true

        recipe.isPending = false

        recipe.isChecked = false

        await recipe.save()

    }

}

module.exports = new AdminService()