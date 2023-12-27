
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
                        url:`?page=${body.page}${`&recipeName=${body.recipeName || ""}`}&${body.queryParams || "" && body.queryParams}${(body.isChecked !== undefined && `&isChecked=${body.isChecked}`)}${(body.isRejected !== undefined && `&isRejected=${body.isRejected}`)}${(body.isPending !== undefined && `&isPending=${body.isPending}`)}${(body.isHalal !== undefined) && `&isHalal=${body.isHalal}`}${(body.isVegan !== undefined) && `&isVegan=${body.isVegan}`}`,                                                                                                                                                            
                        method:"GET"
                    })
                }),
                getRecipe : builder.query({
                    query:(body) => ({
                        url:`/${body.id}?forEditing=${body.forEditing || false}`,
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
                }),
                editRecipe : builder.mutation({
                    query: (body) => ({
                        url:`/${body.id}?mustEdit=${body.mustEdit || false}`,
                        method:"PUT",
                        body:body.formData
                    })
                }),
                deleteRecipe : builder.mutation({
                    query:(body) => ({
                        url:`/${body}`,
                        method:"DELETE"
                    })
                }),
                getRecipeForEdit: builder.query({
                    query: (body) => ({
                        url:`/editRecipe/${body}`,
                        method:"GET"
                    })
                })
                
            
            })
})

export const { useGetRecipesQuery,useGetRecipeQuery,usePostRecipeMutation,useGetMineRecipesQuery,useEditRecipeMutation,useDeleteRecipeMutation,useGetRecipeForEditQuery } = recipesApi