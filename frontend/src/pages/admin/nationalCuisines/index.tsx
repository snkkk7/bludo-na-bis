import {useIsAdminQuery} from "@/store/authrizationApi"
import {useGetCharacteristicsQuery} from "@/store/characteristicsApi"
import { useRouter } from "next/router"
import { useEffect } from "react"


import AddNationalCuisine from "@/components/admin/AddNationalCuisine"

const NationalCuisine = () => {

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
            <h3 className="text-center text-3xl mb-5">Управление национальными кухнями</h3>
            <AddNationalCuisine/>
        </>
    )
}

export default NationalCuisine