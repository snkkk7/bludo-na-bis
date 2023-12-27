
import { useForm, SubmitHandler,Controller } from "react-hook-form"

import * as yup from "yup"

import { yupResolver } from "@hookform/resolvers/yup"

import {useAddNationalCuisineMutation, useEditNationalCuisineMutation,useGetNationalCuisinesQuery} from "@/store/adminApi"



import Characteristics from "./Characteristics"

import {useEffect, useState} from "react"

const AddNationalCuisine = () => {

    const [nationalCuisineName,setNationalCuisineName] = useState("")

    const schema = yup
    .object({
             nationalCuisineName: yup.string()
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

    const [postNationalCuisine,{isLoading,isSuccess,isError}] = useAddNationalCuisineMutation()

    const [editNationalCuisine,{isLoading:isLoadinEditNationalCuisine,isSuccess:isSuccessEditNationalCuisine,isError:isErrorEditNationalCuisine}] = useEditNationalCuisineMutation()

    const {data:dataCharacteristics,isLoading:isLoadingCharacteristics,isSuccess:isSuccessCharacteristics} = useGetNationalCuisinesQuery("")


    const handleSendNationalCuisine = (data : any) => {
        editNationalCuisine({nationalCuisineName:data.name,id:data.id})
    }

    
    const handleChangeTypeNameValue = (e:any) => {
            setNationalCuisineName(e.target.value)
           
    }


    useEffect(() => {
        if(isSuccess){
            location.reload()
        }
    },[isSuccess])


    const onSubmit = (data:any) => {
        postNationalCuisine({nationalCuisineName:data.nationalCuisineName})
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="border-2 rounded-lg w-1/3 mx-auto px-12 py-5 mb-7">
                <div className="mb-5">
                    <input type="text" {...register("nationalCuisineName")} className="border-b-2 border-slate-700 pb-2 pl-2 outline-none" placeholder="введите имя типа" />
                    {errors.nationalCuisineName && <span>{errors.nationalCuisineName.message}</span>}
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

export default AddNationalCuisine