

import Container from "./Container"

import Link from "next/link"

import {authorizationActions} from '@/store/authorizationSlice'

import {useChechAuthQuery} from '@/store/authrizationApi'

import { useAppSelector,useAppDispatch } from "@/store/hooks"

import { useEffect } from 'react'

import { useRouter } from "next/router"

const TheHeader = () => {

    const {isAuth} = useAppSelector(state => state.authorization)

    const dispatch = useAppDispatch()

    const {data,isLoading,isSuccess,isError} = useChechAuthQuery(null)
  
    const {pathname} = useRouter() 

    useEffect(() => {
      if(isSuccess){
        if(data.isAuth){
          dispatch(authorizationActions.defineAuthStatus(true))
        }else{
          dispatch(authorizationActions.defineAuthStatus(false))
        }
      }
    },[isLoading])


    return (
        <header className="bg-slate-700 py-6 mb-5">
            <Container>
                <nav className="flex justify-between items-center">
                    <Link href="/" className="text-white">Блюдо на бис</Link>

                    <ul className="flex gap-5">
                           {
                             !isAuth && ( 
                                         <>
                                           <li>
                                            <Link href="/signup" className={`text-white ${pathname === '/singup' && 'underline'}`}>Регистрация</Link>
                                           </li>
                                           <li>
                                               <Link href="/login" className="text-white">Войти</Link>
                                           </li>
                                         </>
                                        )
                          }
                          {
                            isAuth && (
                                      <>
                                        <li className={`${pathname === '/' && 'border-b rounded-b-mg pb-1'}`}>
                                          <Link href="/" className={`text-white`}>Главная</Link>
                                        </li>
                                         <li className={`${pathname === '/profile' && 'border-b rounded-b-mg pb-1'}`}>
                                            <Link href="/profile" className="text-white">Профиль</Link>
                                        </li>
                                        <li className={`${pathname === '/postRecipe' && 'border-b rounded-b-mg pb-1'}`}>
                                            <Link href="/postRecipe" className="text-white">Добавить рецепт</Link>
                                        </li>                       
                                        <li >
                                            <Link href="/" className="text-white">Выйти</Link>
                                        </li>                      
                                      </>
                                      )
                          }
                        {
                            isLoading && <li className="text-white">Loading...</li>
                        }
                    </ul>

                </nav>
            </Container>
        </header>
    )
}

export default TheHeader