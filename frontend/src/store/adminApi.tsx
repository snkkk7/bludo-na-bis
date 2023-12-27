import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const adminApi = createApi({
    reducerPath:"adminApi",
    baseQuery:  fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/admin',credentials:"include" }),
    endpoints:(builder) => ({
        addType:builder.mutation({
            query:(body) => ({
                url:'/type',
                body:{typeName:body},
                method:"POST"
            })
        }),
        editType:builder.mutation({
            query:(body) => ({
                url:`type/${body.id}`,
                body:{typeName:body.typeName},
                method:"PUT"
            }),
        }),
        deleteType:builder.mutation({
            query:(body) => ({
                url:`/${body}`,
                method:"DELETE"
            })
        }),
        addHoliday:builder.mutation({
            query:(body) => ({
                url:'holiday',
                body,
                method:"POST"
            })
        }),
        editHoliday:builder.mutation({
            query:(body) => ({
                url:`holiday/${body.id}`,
                body:{holidayName:body.holidayName},
                method:"PUT"
            })
        }),
        addNationalCuisine:builder.mutation({
            query:(body) => ({
                url:'nationalCuisine',
                body,
                method:"POST"
            })
        }),
        editNationalCuisine:builder.mutation({
            query:(body) => ({
                url:`nationalCuisine/${body.id}`,
                body:{nationalCuisineName:body.nationalCuisineName},
                method:"PUT"
            })
        }),
        getTypes:builder.query({
            query:(body) => ({
                url:"allTypes"
            })
        }),
        getNationalCuisines:builder.query({
            query:(body) => ({
                url:"allNationalCuisines"
            })
        }),
        getHolidays:builder.query({
            query:(body) => ({
                url:"allHolidays"
            })
        }),
        approveRecipe:builder.mutation({
            query:body => ({
                url:`approveRecipe/${body}`,
                method:"PUT"
            })
        }),
        rejectRecipe:builder.mutation({
            query:body => ({
                url:`rejectRecipe/${body}`,
                method:"PUT"
            })
        }),
    })
})

export const {
              useAddTypeMutation,
              useEditTypeMutation,
              useDeleteTypeMutation,
              useAddHolidayMutation,
              useEditHolidayMutation,
              useAddNationalCuisineMutation,
              useEditNationalCuisineMutation,   
              useGetHolidaysQuery,
              useGetNationalCuisinesQuery,
              useGetTypesQuery,
              useApproveRecipeMutation,
              useRejectRecipeMutation
            } = adminApi