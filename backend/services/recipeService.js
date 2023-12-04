
const { Op } = require('sequelize')
const {Recipe, Type, Holiday, NationalCuisine, LikedRecipe} = require('../models')
const fs = require('fs')
const path = require('path');

const perPage = 10;

class RecipeService {
    async postRecipe(recipe){

        const recipeData = await Recipe.create({
            title:recipe.title,
            description:recipe.description,
            ingredients:recipe.ingredients,
            steps:recipe.steps,
            authorId:recipe.authorId,
            img:recipe.img,
            typeId:recipe.typeId,
            holidayId:recipe.holidayId,
            nationalCuisineId:recipe.nationalCuisineId,
            isHalal:recipe.isHalal,
            isVegan:recipe.isVegan
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
            recipe.img
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

        return recipe

    }
    async getRecipes({productName,typeId,holidayId,nationalCuisineId,isVegan,isHalal,page}){

        const whereOptions = {};

        const offset =  (page - 1 ) * perPage 

          if (productName) {
            whereOptions.title = {
                                  [Op.iLike]:`%${productName}%`
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
     
          if (isVegan || !(isVegan)) {
            whereOptions.isVegan = isVegan;
          } 
          
          if (isHalal || !(isHalal)) { 
            whereOptions.isHalal = isHalal;
          }

        const recipes = await Recipe.findAndCountAll({
            limit:perPage,
            offset,
            where:whereOptions
        })

        return recipes

    }

    async getTypes(page){

        const offset = (page - 1) * perPage 

        const types = await Type.findAndCountAll({
            offset,
            limit:perPage
        })

        return types

    }

    async getNationalCuisines(page){

        const offset = (page - 1) * perPage 

        const nationalCuisines = await NationalCuisine.findAndCountAll({
            offset,
            limit:perPage
        })

        return nationalCuisines

    }

    async getHolidays(page){

        const offset = (page - 1)  *  perPage 

        const holidays = await Holiday.findAndCountAll({
            offset,
            limit:perPage
        })

        return holidays

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