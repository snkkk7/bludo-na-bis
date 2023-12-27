

import { useRouter } from "next/router"
import {useEffect,useState} from "react"
import {useIsAdminQuery} from "@/store/authrizationApi"
import {useGetCharacteristicsQuery} from "@/store/characteristicsApi"


import AddType from "@/components/admin/AddType"

const Types = () => {

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
            <h3 className="text-center text-3xl mb-5">Управление типами</h3>
            <AddType/>
        </>
    )
}

export default Types