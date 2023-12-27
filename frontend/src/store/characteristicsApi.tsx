
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
        getCharacteristics: builder.query({
            query:(body) => ({
                url:`?page=${body.page}${body.characteristicName && `&characteristicName=${body.characteristicName}`}${body.typeOfCharacteristic && `&typeOfCharacteristic=${body.typeOfCharacteristic}`}&${body.queryParams}`,                                              
                
            })
        }),
     
    
    })
})

export const { useGetCharacteristicsQuery } = characteristcsApi