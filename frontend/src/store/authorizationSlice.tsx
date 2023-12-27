import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { initialStateAuthorization } from '../interfaces'

const initialState : initialStateAuthorization = {
    isAuth:false,
    isBanned:false,
    isAdmin:false
}

export const authorizationSlice = createSlice({
    name:"authorizationSlice",
    initialState,
    reducers:{
        defineAuthStatus: (state,actions:PayloadAction<boolean>) => {
            state.isAuth = actions.payload
        },
        defineAdminStatus : (state,actions) => {
            state.isAdmin = actions.payload
        }
    }
})

export const authorizationActions = authorizationSlice.actions

export default authorizationSlice.reducer