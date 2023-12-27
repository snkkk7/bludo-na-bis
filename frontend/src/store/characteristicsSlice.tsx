import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IinitialStateCharacteristics,ICharacteristic } from '../interfaces'

const initialState:IinitialStateCharacteristics = {
    nationalCuisines:[],
    holidays:[],
    types:[],
    characteristics:[],
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
        setCharacteristicsAdmin(state,{payload:characteristics}){
            state.characteristics = characteristics.map((el:any) => ({
                name:el.name,
                id:el.id,
                isInputVisible:false
            }))             
        },
        toggleCharacteristicInput(state,{payload:{value,id}}){

            const index = state.characteristics.findIndex(el => el.id == id)

            if(!(index === -1)){

                console.log(index)

            state.characteristics[index].isInputVisible = !state.characteristics[index].isInputVisible

            state.characteristics[index].name = value
        }

    },
    }
})

export const characteristicsActions = characteristicsSlice.actions

export default characteristicsSlice.reducer