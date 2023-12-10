import { configureStore } from '@reduxjs/toolkit'

import { authorizationApi } from './authrizationApi'

import { recipesApi } from './recipesApi'

import authorizationReducer from './authorizationSlice'



export const store = configureStore({
    reducer : {
        [ authorizationApi.reducerPath ] : authorizationApi.reducer,
        [ recipesApi.reducerPath ] : recipesApi.reducer,
        authorization : authorizationReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(authorizationApi.middleware,recipesApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch 