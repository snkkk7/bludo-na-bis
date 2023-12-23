
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'





export const recipesApi = createApi({
            reducerPath: "recipesApi",
            baseQuery:  fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/recipes',credentials:"include" }),
            endpoints: (builder) => ({
                getRecipes : builder.query({
                    query:(body) => ({
                        url:`?page=${body.page}${`&recipeName=${body.recipeName || ""}`}&${body.queryParams}&isHalal=${body.isHalal}&isVegan=${body.isVegan}`,
                        method:"GET"
                    })
                }),
                getRecipe : builder.query({
                    query:(body) => ({
                        url:`/${body}`,
                        method:"GET"
                    })
                }),
                postRecipe : builder.mutation({
                    query:(body) => {

                        return {
                            url:'/',
                            method:'POST',
                            body:body,
                        }
                    }
                }),
                getMineRecipes : builder.query({
                    query: (body) => ({
                        url:`/getMineRecipes?page=${body.page}&recipeName=${body.recipeName}${`&isReady=${body.isReady}`}`
                    })
                })
            
            })
})

export const { useGetRecipesQuery,useGetRecipeQuery,usePostRecipeMutation,useGetMineRecipesQuery } = recipesApi