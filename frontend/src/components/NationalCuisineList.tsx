'use client'

import {useState,ChangeEvent} from "react"

import ListOfCharacteristics from '../components/ListOfCharacteristics'

import {useGetNationalCuisineQuery} from '../store/characteristicsApi'

const NationalCuisinesList = () => {

    const [name,setName] = useState<string>("") 

    const [page,setPage] = useState<number>(1)

    const handleChangeName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const {data,isLoading,isError,isSuccess} = useGetNationalCuisineQuery({page,nationalCuisineName:name})


    return (
        <>
            <input type="text" className="mx-auto block rounded border-2 px-2 py-1" onChange={handleChangeName} placeholder="Поиск кухни..." />
            {
                isSuccess
                    &&
                    (
                        <ListOfCharacteristics items={data.rows} 
                                    page={page}
                                    countPages={data.pages}
                                    handleChangePage={(e:any,page:number) => setPage(page)}
                        />
                    )
            }

             

        </>
    )
}


export default NationalCuisinesList