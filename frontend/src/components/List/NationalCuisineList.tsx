
'use client'

import {useState,ChangeEvent} from "react"

import ListOfCharacteristics from './ListOfCharacteristics'

import {useGetCharacteristicsQuery} from '../../store/characteristicsApi'

import { characteristicsActions } from "@/store/characteristicsSlice"

import {useAppDispatch} from '../../store/hooks'

import {ICharacteristcsList} from "@/interfaces"

import { FC } from "react"

const NationalCuisinesList:FC<ICharacteristcsList> = ({addCharacteristic}) => {

    const [nationalCuisineName,setNationalCuisineName] = useState<string>("") 

    const [page,setPage] = useState<number>(1)

    const handleChangeHoliday = (e:ChangeEvent<HTMLInputElement>) => {
        setNationalCuisineName(e.target.value)
        setPage(1)
    }

    const {data,isLoading,isError,isSuccess} = useGetCharacteristicsQuery({page,characteristicName:nationalCuisineName,typeOfCharacteristic:'nationalCuisine'})

    const dispatch = useAppDispatch()


    return (
        <>
            <input type="text" className="mx-auto block rounded mb-5 border-2 px-2 py-1" onChange={handleChangeHoliday} placeholder="Поиск национальной кухн1и..." />
            {
                        isSuccess
                            &&
                     (
                         <ListOfCharacteristics 
                                     items={data.rows} 
                                     page={page}
                                     countPages={data.pages}
                                     onHandleChangePage={(e:any,page:number) => setPage(page)}
                                     onAddCharacteristic={addCharacteristic}
                         />
                     )
            }
            {
                isLoading && <p>Loading...</p>
            }
            {
                isError && <p>Error!</p>
            }
        </>
    )
}


export default NationalCuisinesList