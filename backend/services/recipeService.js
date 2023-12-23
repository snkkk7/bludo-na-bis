
const { Op, where } = require('sequelize')
const {Recipe, Type, Holiday, NationalCuisine, LikedRecipe,RecipeInfo} = require('../models')
const fs = require('fs')
const path = require('path');

const perPage = 5;

class RecipeService {
    async postRecipe(recipe){

        console.log(recipe.authorName + "USER NAME")

        const recipeData = await Recipe.create({
            title:recipe.title,
            authorId:recipe.authorId,
            img:recipe.img,
            typeId:recipe.typeId,
            holidayId:recipe.holidayId,
            nationalCuisineId:recipe.nationalCuisineId,
            isHalal:recipe.isHalal,
            isVegan:recipe.isVegan,
            authorName:recipe.authorName,
        })

        const recipeResult = await RecipeInfo.create({
            description:recipe.description,
            ingredients:recipe.ingredients,
            steps:recipe.steps,
            recipeId:recipeData.id
        })

        return recipeData
    }
    async editRecipe(recipe,id){

        const options = {
                          title:recipe.title,
                          description:recipe.description,
                          ingredients:recipe.ingredients,
                          steps:recipe.steps,
                          typeId:recipe.typeId,
                          holidayId:recipe.holidayId,
                          nationalCuisineId:recipe.nationalCuisineId,
                          isHalal:recipe.isHalal,
                          isVegan:recipe.isVegan
                        }

        if(!(recipe.isRejected) && !(recipe.wasEdited)){
            options.wasEdited = true
        }

        if(recipe.img){
            options.img
        }
        
        const recipeRes = await Recipe.update(options,{where:{id}})

        return recipeRes

    }
    async deleteRecipe(id){

        const { img : fileName } = await Recipe.findOne({where:{id}})

        const filePath = path.join(__dirname,'..', 'static', fileName);

        const res = await Recipe.destroy({where:{id}})

        fs.unlinkSync(filePath)

        return res

    }
    async getRecipe(id){

        const recipe = await Recipe.findOne({where:{id}})


        const recipeInfo = await RecipeInfo.findOne({where:{recipeId:recipe.id}})

        const typeInfo = await Type.findOne({where:{id:recipe.typeId}})

        const nationalCuisineInfo = await NationalCuisine.findOne({where:{id:recipe.nationalCuisineId}})
        
        const holidayInfo = await Holiday.findOne({where:{id:recipe.holidayId}})
        



        return {
            title:recipe.title,
            isVegan:recipe.isVegan,
            isHalal:recipe.isHalal,
            authorId:recipe.authorId,
            img:recipe.img,
            id:recipe.id,
            typeName:typeInfo.name,
            nationalCuisineName:nationalCuisineInfo.name,
            holidayName:holidayInfo.name,
            steps:recipeInfo.steps,
            ingredients:recipeInfo.ingredients,
            description:recipeInfo.description,
        }

    }
    async getRecipes({recipeName,typeId,holidayId,nationalCuisineId,isVegan,isHalal,page}){

        console.log({isHalal,isVegan})

        const whereOptions = {};

        const offset =  (page - 1 ) * perPage 

          if (recipeName) {
            whereOptions.title = {
                                  [Op.iLike]:`%${recipeName}%`
                                 }
          }
          
          if (typeId) {
             whereOptions.typeId = typeId
          }
          
          if (holidayId) {
             whereOptions.holidayId = holidayId;
          }

          if (nationalCuisineId) {
             whereOptions.nationalCuisineId = nationalCuisineId;
          }
     
          if (isVegan) {
            whereOptions.isVegan = isVegan;
          } 
          
          if (isHalal) { 
            whereOptions.isHalal = isHalal;
          }

        const dataOfrecipes = await Recipe.findAndCountAll({
            limit:perPage,
            offset,
            where:whereOptions
        })

        console.log(dataOfrecipes)

        return {
            count: Math.ceil(dataOfrecipes.count / 5),
            rows: dataOfrecipes.rows
        }

    }

    async getMineRecipes(id,page,isReady,recipeName){

        const offset =  (page - 1 ) * perPage 

        

        if(JSON.parse(isReady)){

            const whereOptions = {
                authorId:id,
                isPending:false,
                isRejected:false
            }

            if(recipeName){
                whereOptions.title = {
                    [Op.iLike]:`%${recipeName}%`   
                }
            }

            const recipes = await Recipe.findAndCountAll({
                where:whereOptions,
                offset
               })

               return recipes       
        }else{
            
            const whereOptions = {
                authorId:id,              
                        [Op.or]: [
                            { isRejected:true },
                            { isPending:true }
                          ],
            }


            if(recipeName){
                whereOptions.title = {
                        [Op.iLike]:`%${recipeName}%`                
                }
            }

            const recipes = await Recipe.findAndCountAll({
                where:whereOptions,
                offset
               })

               return recipes    

        }

      
         
       

         

    }

    async getCharacteristicks(page,characteristicName,typeOfcharacteristic){

            if(typeOfcharacteristic == 'type'){

                const offset = (page - 1) * perPage 

                const whereOptions = {}
        
                if(characteristicName){
                    whereOptions.name = {
                        [Op.iLike]:`%${characteristicName}%`
                    }
                }
        
                const types = await Type.findAndCountAll({
                    where:whereOptions,
                    offset,
                    limit:perPage
                })
        
                return {
                    pages:Math.ceil(types.count / 5),
                    rows:types.rows
                }
            }
            if(typeOfcharacteristic == 'nationalCuisine'){
             
                const offset = (page - 1) * perPage 

                const whereOptions = {}

                if(characteristicName){
                    whereOptions.name = {
                        [Op.iLike]:`%${characteristicName}%`
                    }
                }
            
                const nationalCuisines = await NationalCuisine.findAndCountAll({
                    where:whereOptions,
                    offset,
                    limit:perPage
                })
            
                return {
                    pages:Math.ceil(nationalCuisines.count / 5),
                    rows:nationalCuisines.rows
                }

            }

            if(typeOfcharacteristic === "holiday"){

                const offset = (page - 1) * perPage 

                const whereOptions = {}

                if(characteristicName){
                    whereOptions.name = {
                        [Op.iLike]:`%${characteristicName}%`
                    }
                }
            
                const holidays = await Holiday.findAndCountAll({
                    where:whereOptions,
                    offset,
                    limit:perPage
                })
            
                return {
                    pages:Math.ceil(holidays.count / 5),
                    rows:holidays.rows
                }


            }

    }

    async likeRecipe(recipeId,userId){

        const like = await LikedRecipe.create({recipeId,userId})

        const countLikes = await LikedRecipe.count({where:{
            recipeId
        }})

        return {
            countLikes
        }
    }
    async dislikeRecipe(recipeId,userId){

        const like = await LikedRecipe.destroy({where:{recipeId,userId}})

        const countLikes = await LikedRecipe.count({where:{
            recipeId
        }})

        return {
            countLikes
        }
    }

    async wasLikedRecipe(recipeId,userId){

        const recipe = await LikedRecipe.findOne({where:{recipeId,userId}})

        if(recipe == null){
            return {
                isLiked:false,
            }
        }else{
            return {
                isLiked:true,
            }
        }

    }

}

module.exports = new RecipeService()