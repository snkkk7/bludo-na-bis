
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'



  export const characteristcsApi = createApi({
    reducerPath: "characteristcsApi",
    baseQuery:  fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/characteristics' }),
    endpoints: (builder) => ({
        getTypes: builder.query({
            query:(body) => ({
                url:`/types?page=${body.page}${body.typeName && `&typeName=${body.typeName}`}`
            })
        }),
        getHolidays: builder.query({
            query:(body) => ({
                url:`/holidays?page=${body.page}${body.holidayName && `&holidayName=${body.holidayName}`}`
            })
        }),
        getNationalCuisine: builder.query({
            query: (body) => ({
                url:`/nationalCuisines?page=${body.page}${body.nationalCuisineName && `&nationalCuisineName=${body.nationalCuisineName}`}`
            })
        })
    })
})

export const { useGetTypesQuery,useGetHolidaysQuery,useGetNationalCuisineQuery } = characteristcsApi