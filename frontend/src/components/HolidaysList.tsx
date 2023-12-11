
'use client'

import {useState,ChangeEvent} from "react"

import ListOfCharacteristics from '../components/ListOfCharacteristics'

import {useGetHolidaysQuery} from '../store/characteristicsApi'

const HolidaysList = () => {

    const [holidayName,setHolidayName] = useState<string>("") 

    const [page,setPage] = useState<number>(1)

    const handleChangeName = (e:ChangeEvent<HTMLInputElement>) => {
        setHolidayName(e.target.value)
    }

    const {data,isLoading,isError,isSuccess} = useGetHolidaysQuery({page,holidayName})


    return (
        <>
            <input type="text" className="mx-auto block rounded border-2 px-2 py-1" onChange={handleChangeName} placeholder="Поиск праздника..." />

            {
                isSuccess
                    &&
                    (
                        <ListOfCharacteristics 
                                items={data.rows} 
                                page={page}
                                countPages={data.pages}
                                handleChangePage={(e:any,page:number) => setPage(page)}
                        />
                    )
            }
        </>
    )
}


export default HolidaysList