


import {useIsAdminQuery} from "@/store/authrizationApi"

import { useRouter } from "next/router"

import Link from "next/link"

import { useEffect } from "react"

const Admin = () => {

    const router = useRouter()

    const {data,isError,isSuccess,isLoading} = useIsAdminQuery("")

    useEffect(() => {
        if(isSuccess){
            if(!data.isAdmin){
                router.push("/")
            }
        }
    },[isSuccess])

    return (
        <>
            <h1 className="text-3xl mt-5 mb-12">Добро пожаловать в Админ Панель!</h1>
            <div className="border-2 rounded-xl mb-12 py-5 w-1/3 flex flex-col items-center mx-auto">
                <h3 className="text-2xl mb-5">
                    Управление Характеристиками
                </h3>
                <nav>
                    <ul className="flex gap-5">
                        <li className="border-2 p-2 rounded-xl">
                            <Link className="text-lg" href="admin/types">Типы</Link>
                        </li>
                        <li className="border-2 p-2 rounded-xl">
                            <Link className="text-lg" href="admin/nationalCuisines">Национальные кухни</Link>
                        </li>
                        <li className="border-2 p-2 rounded-xl">
                            <Link className="text-lg" href="admin/holidays">Праздники</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="border-2 rounded-xl w-1/3 mx-auto py-5">
                <h3 className="text-2xl text-center mb-5">Управление рецептами</h3>
                <Link className="text-center block underline" href="/admin/recipes">Перейти на страницу с рецептами</Link>
            </div> 

        </>
    )
}

export default Admin