
const recipeService = require('../services/recipeService')
const userService = require('../services/userService')

const uuid = require('uuid')
const path = require('path');
const { Holiday } = require('../models');

class RecipeController {
    async postRecipe(req,res,next){
        try{
            const {title,description,ingredients,steps,typeId,holidayId,nationalCuisineId,isHalal,isVegan} = req.body

            const {refreshToken} = req.cookies

            const {img} = req.files

            let fileName = uuid.v4() + ".jpg"

            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const tokensUser = await userService.getMe(refreshToken)

            const recipe = await recipeService.postRecipe({title,
                                                          description,
                                                          ingredients,
                                                          authorId:tokensUser.userId,
                                                          steps,
                                                          img:fileName,
                                                          typeId,
                                                          holidayId,
                                                          nationalCuisineId,
                                                          isHalal:Boolean(isHalal),
                                                          isVegan:Boolean(isVegan)
                                                         })

            res.json(recipe)
   
        }catch(e){
            next(e)
        }
    }
    async getRecipes(req,res,next){
        try{

            const {
                productName,
                typeId,
                holidayId,
                nationalCuisineId,
                isVegan,
                isHalal,
                page,
            } = req.query


            const recipes = await recipeService.getRecipes({
                                                              productName,
                                                              typeId,
                                                              holidayId,
                                                              nationalCuisineId,
                                                              isVegan:Boolean(isVegan),
                                                              isHalal:Boolean(isHalal),
                                                              page
                                                           })

            res.json(recipes)

                                                           
        }catch(e){
            next(e)
        }
    }
    async editRecipe(req,res,next){
        try{

            const {title,description,ingredients,steps,typeId,holidayId,nationalCuisineId,isHalal,isVegan} = req.body

            const {id} = req.params
            
            const img = req.files?.img

            const recipe = {    
                              id,
                              title,
                              description,
                              ingredients,
                              steps,
                              typeId,
                              holidayId,
                              nationalCuisineId,
                              isHalal:Boolean(isHalal),
                              isVegan:Boolean(isVegan)
                            }      

            if(img){

                let fileName = uuid.v4() + ".jpg"
          
                img.mv(path.resolve(__dirname, '..', 'static', fileName))

                recipe.img = fileName

            }

             const recipeRes = await recipeService.editRecipe(recipe,id)

             res.json(recipeRes)
           
        }catch(e){
            next(e)
        }
    }
    async getRecipe(req,res,next){
        try{

            const {id} = req.params

            const recipe = await recipeService.getRecipe(id)

            res.json(recipe)

        }catch(e){
            next(e)
        }
    }
    async deleteRecipe(req,res,next){
        try{

            const {id} = req.params

            const recipe = await recipeService.deleteRecipe(id)

            res.json(recipe)

        }catch(e){
            next(e)
        }
    }
    async getTypes(req,res,next){
        try{

            const {page,typeName} = req.query

            console.log(typeName)

            const types = await recipeService.getTypes(page,typeName)

            res.json(types)

        }catch(e){
            next(e)
        }
    }

    async getHolidays(req,res,next){
        try{
        
            const {page,holidayName} = req.query

            console.log(page + " страница")

            const holidays = await recipeService.getHolidays(page,holidayName)

            res.json(holidays)

        }catch(e){
            next(e)
        }
    }

    async getNationalCuisines(req,res,next){
        try{
        
            const {page,nationalCuisineName} = req.query

            const nationalCuisine = await recipeService.getNationalCuisines(page,nationalCuisineName)

            res.json(nationalCuisine)

        }catch(e){
            next(e)
        }
    }

    async likeRecipe(req,res,next){
        try{

            const {id:recipeId} = req.params

            const {refreshToken} = req.cookies

            const {userId} = await userService.getMe(refreshToken)

            const likesCount = await recipeService.likeRecipe(recipeId,userId)

            res.json(likesCount)

        }catch(e){
            next(e)
        }
    }
    async dislikeRecipe(req,res,next){
        try{

            const {id:recipeId} = req.params

            const {refreshToken} = req.cookies

            const {userId} = await userService.getMe(refreshToken)

            const likesCount = await recipeService.dislikeRecipe(recipeId,userId)

            res.json(likesCount)

        }catch(e){
            next(e)
        }
    }
    async wasRecipeLiked(req,res,next){
        try{

            const {id:recipeId} = req.params

            const {refreshToken} = req.cookies

            const {userId} = await userService.getMe(refreshToken)

            const wasLikedRecipe = await recipeService.wasLikedRecipe(recipeId,userId)

            res.json(wasLikedRecipe)

        }catch(e){
            next(e)
        }
    }
}

module.exports = new RecipeController()