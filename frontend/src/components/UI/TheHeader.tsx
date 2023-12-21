

import Container from "./Container"

import Link from "next/link"

import { useAppSelector } from "@/store/hooks"

const TheHeader = () => {

    const {isAuth} = useAppSelector(state => state.authorization)

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
                                             <Link href="/signup" className="text-white">Регистрация</Link>
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
                                         <li>
                                            <Link href="/profile" className="text-white">Профиль</Link>
                                        </li>
                                        <li>
                                            <Link href="/postRecipe" className="text-white">Добавить рецепт</Link>
                                        </li>                       
                                        <li>
                                            <Link href="/" className="text-white">Выйти</Link>
                                        </li>                      
                                      </>
                                      )
                          }
                    
                    </ul>

                </nav>
            </Container>
        </header>
    )
}

export default TheHeader