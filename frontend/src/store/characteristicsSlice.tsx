import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IinitialStateCharacteristics,ICharacteristic } from '../interfaces'

const initialState:IinitialStateCharacteristics = {
    nationalCuisines:[],
    holidays:[],
    types:[],
    isHalal:false,
    isVegan:false
}

export const characteristicsSlice = createSlice({
    name:"characteristicsSlice",
    initialState,
    reducers:{
        addType:(state,actions:PayloadAction<ICharacteristic>) => {
            state.types = [...state.types,actions.payload]
        },
        addHoliday:(state,actions:PayloadAction<ICharacteristic>) => {
            state.holidays = [...state.holidays,actions.payload]
        },
        addNationalCuisine:(state,actions:PayloadAction<ICharacteristic>) => {
            state.nationalCuisines = [...state.nationalCuisines,actions.payload]
        }
    }
})

export const characteristicsActions = characteristicsSlice.actions

export default characteristicsSlice.reducer