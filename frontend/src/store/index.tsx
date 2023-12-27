import { configureStore } from '@reduxjs/toolkit'

import { authorizationApi } from './authrizationApi'

import { recipesApi } from './recipesApi'

import { characteristcsApi } from './characteristicsApi'

import characteristicsReducer from './characteristicsSlice'

import authorizationReducer from './authorizationSlice'

import recipeReducer from './recipeSlice'

import { adminApi } from "./adminApi"

export const store = configureStore({
    reducer : {
        [ authorizationApi.reducerPath ] : authorizationApi.reducer,
        [ recipesApi.reducerPath ] : recipesApi.reducer,
        [ characteristcsApi.reducerPath ] : characteristcsApi.reducer,
        [ adminApi.reducerPath ] : adminApi.reducer,
        authorization : authorizationReducer,
        characteristcs : characteristicsReducer,
        recipe:recipeReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(authorizationApi.middleware,recipesApi.middleware,characteristcsApi.middleware,adminApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch 