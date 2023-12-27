
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'



  const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/user', credentials:'include' })

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


export const authorizationApi = createApi({
    reducerPath: 'authorizationApi',
    baseQuery:baseQueryWithReauth,
  
    endpoints:(builder) => ({
        singup:builder.mutation({
            query:(body) => ({
                url:"registration",
                method:"POST",
                body
            })
        }),
        login:builder.mutation({
            query:(body) => ({
                url:"login",
                method:"POST",
                body
            })
        }),
        chechAuth:builder.query({
          query:() => ({
            url:"/checkAuth"
          })
        }),
        getUserInfo:builder.query({
          query:(body) => ({
            url:"/getMineInfo"
          })
        }),
        isAdmin:builder.query({
          query:(body) => ({
              url:"isAdmin",
          })
        })
    })


  })

  export const {useSingupMutation,useLoginMutation,useChechAuthQuery,useGetUserInfoQuery,useIsAdminQuery} = authorizationApi