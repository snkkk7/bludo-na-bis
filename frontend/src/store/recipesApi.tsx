
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'





export const recipesApi = createApi({
            reducerPath: "recipesApi",
            baseQuery:  fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/recipes' }),
            endpoints: (builder) => ({
                getRecipes : builder.query({
                    query:(body) => ({
                        url:`?page=${body.page}&${body.queryParams}&isHalal=${body.isHalal}&isVegan=${body.isVegan}`,
                        method:"GET"
                    })
                }),
                getRecipe : builder.query({
                    query:(body) => ({
                        url:`/${body}`,
                        method:"GET"
                    })
                }),
            
            })
})

export const { useGetRecipesQuery,useGetRecipeQuery } = recipesApi