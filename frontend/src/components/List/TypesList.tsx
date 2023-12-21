
'use client'

import {useState,ChangeEvent} from "react"

import ListOfCharacteristics from './ListOfCharacteristics'

import {useGetCharacteristicsQuery} from '../../store/characteristicsApi'

import { characteristicsActions } from "@/store/characteristicsSlice"

import {useAppDispatch} from '../../store/hooks'



const TypesList = () => {

    const [typeName,setTypeName] = useState<string>("") 

    const [page,setPage] = useState<number>(1)

    const handleChangeName = (e:ChangeEvent<HTMLInputElement>) => {
        setTypeName(e.target.value)
        setPage(1)
    }

    const {data,isLoading,isError,isSuccess} = useGetCharacteristicsQuery({page,characteristicName:typeName,typeOfCharacteristic:'type'})

    const dispatch = useAppDispatch()


    return (
        <>
            <input type="text" className="mx-auto block rounded mb-5 border-2 px-2 py-1" onChange={handleChangeName} placeholder="Поиск типа..." />


            {
                        isSuccess
                            &&
                     (
                         <ListOfCharacteristics 
                                     items={data.rows} 
                                     page={page}
                                     countPages={data.pages}
                                     onHandleChangePage={(e:any,page:number) => setPage(page)}
                                     onAddCharacteristic={(e) => dispatch(characteristicsActions.addType({name:e.target.innerHTML || null,id:e.target.id}))}
                         />
                     )
            }

             

        </>
    )
}


export default TypesList