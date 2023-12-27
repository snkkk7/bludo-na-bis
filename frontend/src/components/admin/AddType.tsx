
import { useForm, SubmitHandler,Controller } from "react-hook-form"

import * as yup from "yup"

import { yupResolver } from "@hookform/resolvers/yup"

import {useAddTypeMutation, useDeleteTypeMutation,useGetTypesQuery} from "@/store/adminApi"


import {useEditTypeMutation} from "@/store/adminApi"

import Characteristics from "./Characteristics"

import {useEffect, useState} from "react"

const AddType = () => {

    const [page,setPage] = useState(1) 

    const [typeName,setTypeName] = useState("")

    const schema = yup
    .object({
             typeName: yup.string()
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

    const {data:dataCharacteristics,isLoading:isLoadingCharacteristics,isSuccess:isSuccessCharacteristics} = useGetTypesQuery("")

    const [postType,{isLoading,isSuccess,isError}] = useAddTypeMutation()

    const [deleteType,{isLoading:isLoadingDeleteType,isSuccess:isSuccessDeleteType}] = useDeleteTypeMutation()
 
    const [editType,{isLoading:isLoadinEditType,isSuccess:isSuccessEditType,isError:isErrorEditType}] = useEditTypeMutation()

        

    const handleSendType = (data : any) => {
        editType({typeName:data.name,id:data.id})
    }

    
    const handleChangeTypeNameValue = (e:any) => {
            setTypeName(e.target.value)
           
    }

    useEffect(() => {
        if(isSuccessDeleteType){
            location.reload()
        }
    },[isSuccessDeleteType])

    useEffect(() => {
        if(isSuccess){
            location.reload()
        }
    },[isSuccess])

    const onSubmit = (data:any) => {        
        postType(data.typeName)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="border-2 w-1/3 mx-auto px-12 py-5 mb-7">
                <div className="mb-5">
                    <input type="text" {...register("typeName")} className="border-b-2 border-slate-700 pb-2 pl-2 outline-none" placeholder="введите имя типа" />
                    {errors.typeName && <span>{errors.typeName.message}</span>}
                </div>
                <button className="border-2 p-2">Отправить тип.</button>
            </form>

            <Characteristics 
                            characteristics={dataCharacteristics} 
                            isSuccess={isSuccessCharacteristics} 
                            editCharacteristic={handleSendType} 
                            handleChangeCharacteristicValue={handleChangeTypeNameValue}
                            
            />
        </>
    )
}

export default AddType