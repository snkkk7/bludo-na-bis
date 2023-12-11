import { configureStore } from '@reduxjs/toolkit'

import { authorizationApi } from './authrizationApi'

import { recipesApi } from './recipesApi'

import { characteristcsApi } from './characteristicsApi'

import characteristicsReducer from './characteristicsSlice'

import authorizationReducer from './authorizationSlice'



export const store = configureStore({
    reducer : {
        [ authorizationApi.reducerPath ] : authorizationApi.reducer,
        [ recipesApi.reducerPath ] : recipesApi.reducer,
        [ characteristcsApi.reducerPath ] : characteristcsApi.reducer,
        authorization : authorizationReducer,
        characteristcs : characteristicsReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(authorizationApi.middleware,recipesApi.middleware,characteristcsApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch 