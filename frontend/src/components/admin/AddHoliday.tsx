
import { useForm, SubmitHandler,Controller } from "react-hook-form"

import * as yup from "yup"

import { yupResolver } from "@hookform/resolvers/yup"

import {useAddHolidayMutation, useEditHolidayMutation,useGetHolidaysQuery} from "@/store/adminApi"

import {useGetCharacteristicsQuery} from "@/store/characteristicsApi"

import Characteristics from "./Characteristics"

import {useEffect, useState} from "react"
import { useGetRecipeForEditQuery } from "@/store/recipesApi"

const AddHoliday = () => {

    const [page,setPage] = useState(1) 

    const [holidayName,setHolidayName] = useState("")

    const schema = yup
    .object({
             holidayName: yup.string()
                      .required("Пожалуйста введите название рецепта!")
                      .min(2,"Введите больше 2 символов")
                      .max(30,"Введите меньше 30 символов")
           })
           .required()

           const {
            register,
            handleSubmit,
            setValue,
            watch,
            control,
            reset,
            formState: { errors },
          } = useForm({
            resolver: yupResolver(schema),
          })

    const [postHoliday,{isLoading,isSuccess,isError}] = useAddHolidayMutation()

    const [editHoliday,{isLoading:isLoadinEditHoliday,isSuccess:isSuccessEditHoliday,isError:isErrorEditHoliday}] = useEditHolidayMutation()

    const {data:dataCharacteristics,isLoading:isLoadingCharacteristics,isSuccess:isSuccessCharacteristics} = useGetHolidaysQuery("")

    const handleSendNationalCuisine = (data : any) => {
        console.log(data)
        editHoliday({holidayName:data.name,id:data.id})
    }

    
    const handleChangeTypeNameValue = (e:any) => {
            setHolidayName(e.target.value)
           
    }


    useEffect(() => {
        if(isSuccess){
            location.reload()
        }
    },[isSuccess])


    const onSubmit = (data:any) => {
        postHoliday({holidayName:data.holidayName})
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="border-2 rounded-lg w-1/3 mx-auto px-12 py-5 mb-7">
                <div className="mb-5">
                    <input type="text" {...register("holidayName")} className="border-b-2 border-slate-700 pb-2 pl-2 outline-none" placeholder="введите имя типа" />
                    {errors.holidayName && <span>{errors.holidayName.message}</span>}
                </div>
                <button className="border-2 p-2">Отправить тип.</button>
            </form>

            <Characteristics 
                            characteristics={dataCharacteristics} 
                            isSuccess={isSuccessCharacteristics}                        
                            editCharacteristic={handleSendNationalCuisine} 
                            handleChangeCharacteristicValue={handleChangeTypeNameValue}                          
            />
        </>
    )
}

export default AddHoliday