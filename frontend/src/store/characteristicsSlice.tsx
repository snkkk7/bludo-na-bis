import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IinitialStateCharacteristics,ICharacteristic } from '../interfaces'

const initialState:IinitialStateCharacteristics = {
    nationalCuisines:[],
    holidays:[],
    types:[],
    isHalal:false,
    isVegan:false,
}

export const characteristicsSlice = createSlice({
    name:"characteristicsSlice",
    initialState,
    reducers:{  
        removeType(state,{payload:{id,name}}){    
             state.types = state.types.filter((el) => el.id !== id)      
        },
        removeHoliday(state,{payload:{id,name}}){
            state.types = state.holidays.filter((el) => el.id !== id)
        },
        removeNationalCuisine(state,{payload:{id,name}}){
            state.types = state.nationalCuisines.filter((el) => el.id !== id)
        },
        addHoliday:(state,{payload:{name,id}}:PayloadAction<ICharacteristic>) => {
            if(!state.holidays.some(obj => JSON.stringify({name,id}) === JSON.stringify(obj))){
            state.holidays = [...state.holidays,{name,id}]
            }
        },
        addType:(state,{payload:{name,id}}:PayloadAction<ICharacteristic>) => {
            if(!state.types.some(obj => JSON.stringify({name,id}) === JSON.stringify(obj))){
                state.types = [...state.types,{name,id}]
            }
        },
        addNationalCuisine:(state,{payload:{name,id}}:PayloadAction<ICharacteristic>) => {
            if(!state.nationalCuisines.some(obj => JSON.stringify({name,id}) === JSON.stringify(obj))){
            state.nationalCuisines = [...state.nationalCuisines,{name,id}]
        }
        },
        toggleHalalStatus(state){
            state.isHalal = !(state.isHalal)
        },
        toggleVeganStatus(state){
            state.isVegan = !(state.isVegan)
        },
 
    }
})

export const characteristicsActions = characteristicsSlice.actions

export default characteristicsSlice.reducer