
'use client'

import {useState,ChangeEvent} from "react"

import ListOfCharacteristics from '../components/ListOfCharacteristics'

import {useGetTypesQuery} from '../store/characteristicsApi'

const TypesList = () => {

    const [typeName,setTypeName] = useState<string>("") 

    const [page,setPage] = useState<number>(1)

    const handleChangeName = (e:ChangeEvent<HTMLInputElement>) => {
        setTypeName(e.target.value)
    }

    const {data,isLoading,isError,isSuccess} = useGetTypesQuery({page,typeName})


    return (
        <>
            <input type="text" className="mx-auto block rounded border-2 px-2 py-1" onChange={handleChangeName} placeholder="Поиск типа..." />

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


export default TypesList