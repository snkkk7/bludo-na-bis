import {useIsAdminQuery} from "@/store/authrizationApi"
import {useGetCharacteristicsQuery} from "@/store/characteristicsApi"
import { useRouter } from "next/router"
import { useEffect } from "react"


import AddHoliday from "@/components/admin/AddHoliday"

const Holiday = () => {

    const router = useRouter()

    const {data,isError:IsError,isSuccess,isLoading} = useIsAdminQuery("")

    useEffect(() => {
        if(isSuccess){
            if(!data.isAdmin){
                router.push("/")
            }
        }
    },[isSuccess])

    return (
        <>
            <h3 className="text-center text-3xl mb-5">Управление праздниками!</h3>
            <AddHoliday/>
        </>
    )
}

export default Holiday