
const recipeService = require('../services/recipeService')
const userService = require('../services/userService')

const uuid = require('uuid')
const path = require('path');
const fs = require('fs')
const { Holiday, Recipe, User } = require('../models');

class RecipeController {
    async postRecipe(req,res,next){
        try{
            const {title,description,ingredients,steps,typeId,holidayId,nationalCuisineId,isHalal,isVegan} = req.body

            const {refreshToken} = req.cookies

            const {img} = req.files

            let fileName = uuid.v4() + ".jpg"

            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const userTokens = await userService.getUserIdByRefreshToken(refreshToken)

            const userData  = await User.findOne({where:{id:userTokens.userId}})

            const recipe = await recipeService.postRecipe({
                                                          title,
                                                          description,
                                                          ingredients:JSON.parse(ingredients),
                                                          authorId:userTokens.userId,
                                                          authorName:userData.name,
                                                          steps:JSON.parse(steps),
                                                          img:fileName,
                                                          typeId,
                                                          holidayId,
                                                          nationalCuisineId,
                                                          isHalal:JSON.parse(isHalal),
                                                          isVegan:JSON.parse(isVegan)
                                                         })

            res.json(recipe)
   
        }catch(e){
            next(e)
        }
    }
    async getRecipes(req,res,next){
        try{

            const {
                recipeName,
                typeId,
                holidayId,
                nationalCuisineId,
                isVegan,
                isHalal,
                page,
                isPending,
                isRejected,
                isChecked
            } = req.query

 

            if(page){

                    const recipes = await recipeService.getRecipes({
                                                                      recipeName,
                                                                      typeId: typeId || false,
                                                                      holidayId: holidayId || false ,
                                                                      nationalCuisineId: nationalCuisineId || false ,
                                                                      isVegan:JSON.parse(isVegan?.toLowerCase()),
                                                                      isHalal:JSON.parse(isHalal?.toLowerCase()),
                                                                      isPending:JSON.parse(isPending),
                                                                      isRejected:JSON.parse(isRejected),                                                     
                                                                      isChecked:JSON.parse(isChecked),
                                                                      page
                                                                   })
                             
                      

                    res.json(recipes)

            }else{

                const recipes = await Recipe.findAll()

                res.json(recipes)

            }           
            
            
                                                           
        }catch(e){
            next(e)
        }
    }
    async getMineRecipes(req,res,next){
        try{

            const {page,isReady,recipeName} = req.query

            const { refreshToken } = req.cookies

            const { userId } = await userService.getUserIdByRefreshToken(refreshToken)

            const recipes = await recipeService.getMineRecipes(userId,page,isReady,recipeName)

            res.json({
                count:Math.ceil(recipes.count / 5),
                rows:recipes.rows
            })
            

        }catch(e){
            next(e)
        }

    }

    

    async editRecipe(req,res,next){
        try{

            const {title,description,ingredients,steps,typeId,holidayId,nationalCuisineId,isHalal,isVegan,pastNamePhoto} = req.body


            
            const {id} = req.params
            
            const {mustEdit} = req.query

            console.log(req)

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
                              pastNamePhoto,
                              isHalal:JSON.parse(isHalal),
                              isVegan:JSON.parse(isVegan)
                            }      
          if(img){

                const filePath = path.resolve(__dirname, '..', 'static', pastNamePhoto)

                fs.unlink(filePath,(err) => {
                    if(err){
                        console.log(err)
                    }else{
                        console.log('no err')
                    }
                })

                let fileName = uuid.v4() + ".jpg"

                recipe.img = fileName

                console.log(recipe)

                img.mv(path.resolve(__dirname, '..', 'static', fileName))


        

            }

             const recipeRes = await recipeService.editRecipe(recipe,id,mustEdit)

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

    async getRecipeForEdit(req,res,next){
        try{

            const {id} = req.params

            const recipe = await recipeService.getRecipeForEdit(id)

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

    async getCharacteristics(req,res,next){

        try{     

            const { page,characteristicName,typeOfCharacteristic } = req.query

            console.log(typeOfCharacteristic)

            const characteristics = await recipeService.getCharacteristicks( page,characteristicName,typeOfCharacteristic)

            console.log(characteristics)

            res.json(characteristics)

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