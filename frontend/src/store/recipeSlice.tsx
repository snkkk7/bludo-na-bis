import { createSlice } from '@reduxjs/toolkit'
import type {IinitialStateRecipe} from '@/interfaces'
import { stat } from 'fs'


const initialState:IinitialStateRecipe = {
    steps:[],
    ingredients:[],
    type:{
        name:"",
        id:'',
    },
    holiday:{
        name:"",
        id:'',
    },
    nationalCuisine:{
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

                const id = Math.random() * 100 + "." + state.steps.length + Math.random() * 100 + state.ingredients.length * Math.random() * 100 + 'ID'

                state.steps = [...state.steps,{name:nameOfStep,id:id,isInputVisible:false}]

                console.log(state.steps)
            }

        },  
        addIngredient(state,{payload:nameOfIngredient}){

            if(!state.ingredients.some(el => JSON.stringify({name:nameOfIngredient}) === JSON.stringify({name:el.name}))){

                    const id = Math.random() * 100 + "." + state.steps.length + Math.random() * 100 + state.ingredients.length * Math.random() * 100 + 'ID'

                    state.ingredients = [...state.ingredients,{name:nameOfIngredient,id}]

            }
                    },
        removeStep(state,{payload:id}){
            state.steps = state.steps.filter((el) => el.id !== id)
        },
        removeIngredient(state,{payload:id}){

            state.ingredients = state.ingredients.filter((el) => el.id !== id)
        },
        toggleStepInput(state,{payload:{value,id}}){

                const index = state.steps.findIndex(el => el.id == id)

                if(!(index === -1)){

                    console.log(index)

                state.steps[index].isInputVisible = !state.steps[index].isInputVisible

                state.steps[index].name = value
            }

        },
        addHoliday(state,{payload:{name,id}}){
            if(state.holiday.name !== name){
                state.holiday = {
                    name,
                    id
                }
            }
        },
        removeHoliday(state){
            state.holiday = {
                name:"",
                id:""
            }
        },
        removeType(state){
            state.type = {
                name:"",
                id:""
            }
        },
        removeNationalCuisine(state){
            state.nationalCuisine = {
                name:"",
                id:""
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
        },
        resetRecipe(state){
                state.holiday = {
                    name:"",
                    id:''
                }

                state.type = {
                    name: "",
                    id:""
                }

                state.nationalCuisine = {
                    name:"",
                    id: "",
                }

                state.steps = []

                state.ingredients = []

        } ,
        setRecipeCharacteristics(state,{payload:{type,ingredients,steps,holiday,nationalCuisine}}){

            state.holiday = {
                name:holiday.name,
                id:holiday.id
            }

            state.nationalCuisine = {
                name:nationalCuisine.name,
                id:nationalCuisine.id
            }
            
            state.type = {
                name:type.name,
                id:type.id
            }

            state.steps = steps.map((el:any) => ({
                name:el.name,
                id:el.id,
                isInputVisible:false
            }))

            state.ingredients = ingredients
            
        },
     
    }   
})

export const recipeActions = recipeSlice.actions

export default recipeSlice.reducer