
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'

    const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/recipes' })

    const baseQueryWithReauth: BaseQueryFn<
                                             string | FetchArgs,
                                             unknown,
                                             FetchBaseQueryError
    > = async (args, api, extraOptions) => {
         let result = await baseQuery(args, api, extraOptions)
         if (result.error && result.error.status === 401) {
           // try to get a new token
           const refreshResult = await baseQuery('/refresh', api, extraOptions)
           if (refreshResult.data) {
             // store the new token

             // retry the initial query
             result = await baseQuery(args, api, extraOptions)
           } else {

           }
    }
    return result
    }


export const recipesApi = createApi({
            reducerPath: "recipesApi",
            baseQuery: baseQueryWithReauth ,
            endpoints: (builder) => ({
                getRecipes : builder.query({
                    query:(body) => ({
                        url:`?page=${body.page}&productName=${body.productName}`,
                        method:"GET"
                    })
                })
            })
})

export const { useGetRecipesQuery } = recipesApi