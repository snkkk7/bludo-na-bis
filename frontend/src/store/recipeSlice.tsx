import { createSlice } from '@reduxjs/toolkit'
import type {IinitialStateRecipe} from '@/interfaces'

const initialState:IinitialStateRecipe = {
    steps:[],
    ingredients:[],
    types:{
        name:"",
        id:'',
    },
    holidays:{
        name:"",
        id:'',
    },
    nationalCuisines:{
        name:"",
        id:'',
    }
}


export const recipeSlice = createSlice({
    name:'recipeSlice',
    initialState,
    reducers:{
        addStep(state,{payload:nameOfStep}){

            if(!state.steps.some(el => JSON.stringify({name:nameOfStep}) === JSON.stringify({name:el.name}))){

                const id = String(state.ingredients.length)

                state.steps = [...state.steps,{name:nameOfStep,id}]

            }

        },  
        addIngredient(state,{payload:nameOfIngredient}){

            if(!state.ingredients.some(el => JSON.stringify({name:nameOfIngredient}) === JSON.stringify({name:el.name}))){

                    const id = String(state.ingredients.length)

                    state.ingredients = [...state.ingredients,{name:nameOfIngredient,id}]

            }
                    },
        removeStep(state,{payload:id}){
            state.steps = state.steps.filter((el) => el.id !== id)
        },
        removeIngredient(state,{payload:id}){

            console.log(id)

            state.ingredients = state.ingredients.filter((el) => el.id !== id)
        },
        addHoliday(state,{payload:{name,id}}){
            if(state.holiday.name !== name){
                state.holiday = {
                    name,
                    id
                }
            }
        },
        addType(state,{payload:{name,id}}){
            if(state.type.name !== name){
                state.type = {
                    name,
                    id
                }
            }
        },
        addNationaCuisine(state,{payload:{name,id}}){
            if(state.nationalCuisine.name !== name){
                state.nationalCuisine = {
                    name,
                    id
                }
            }
        }
    }
})

export const recipeActions = recipeSlice.actions

export default recipeSlice.reducer