

const AdminService = require("../services/adminService")

class AdminController {
    async addType(req,res,next){
        try{
            const {typeName} = req.body

            const type = await AdminService.addType(typeName)

            res.json(type)

        }catch(e){
            next(e)
        }
    }
    async addNationalCuisine(req,res,next){
        try{

            const {nationalCuisineName} = req.body

            const nationalCuisine = await AdminService.addNationalCuisine(nationalCuisineName)

            res.json(nationalCuisine)

        }catch(e){
            next(e)
        }
    }
    async addHoliday(req,res,next){
        try{
            const {holidayName} = req.body

            const holiday = await AdminService.addHoliday(holidayName)

            res.json(holiday)
        }catch(e){
            next(e)
        }
    }

    async editType(req,res,next){
        try{

            const {id} = req.params

            const {typeName} = req.body

            const type = await AdminService.editType(typeName,id)

            res.json(type)

        }catch(e){
            next(e)
        }
    }
    async editHoliday(req,res,next){
        try{

            const {id} = req.params

            const {holidayName} = req.body

            const holiday = await AdminService.editHoliday(holidayName,id)

            res.json(holiday)

        }catch(e){
            next(e)
        }
    }
    async editNationalCuisine(req,res,next){
        try{

            const {id} = req.params

            const {nationalCuisineName} = req.body

            const nationalCuisine = await AdminService.editNationalCuisine(nationalCuisineName,id)

            res.json(nationalCuisine)

        }catch(e){
            next(e)
        }
    }
    async sendMessage(req,res,next){
        try{     
            const {message,userId,recipeId} = req.body
            
            console.log({message,userId,recipeId})

            const result = await AdminService.sendMessage({message,userId,recipeId})
            
            res.json(result)
        }catch(e){
            next(e)
        }
    }

    async getExpectedRecipes(req,res,next){
        try{

            const {page} = req.params

            const recipes = await AdminService.getExpectedRecipes(page)

            res.json(recipes)

        }catch(e){
            next(e)
        }
    }
    
    async getWasEditedRecipes(req,res,next){
        try{

            const {page} = req.query

            const recipes = await AdminService.getWasEditedExpectedRecipes(page)

            res.json(recipes)

        }catch(e){
            next(e)
        }
    }

    async banUser(req,res,next){
        try{

            const {id} = req.params

            const res = await AdminService.banUser(id)

            res.json(res)

        }catch(e){
            next(e)
        }
    }

    async approveTheRecipe(req,res,next){

        try{

            const {id} = req.params

            const res = await AdminService.approveTheRecipe(id)

            res.json(res)

        }catch(e){
            next(e)
        }

    }

}

module.exports = new AdminController()