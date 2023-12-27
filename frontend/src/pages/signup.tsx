import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSingupMutation} from '../store/authrizationApi'
import { useAppDispatch } from "@/store/hooks"
import {authorizationActions} from '../store/authorizationSlice'

import React from "react"

import { useAppSelector } from '../store/hooks'

const singupSchema = yup
  .object({
    name: yup.string()
             .required("Пожалуйста введите ваше имя!")
             .min(2,"Введите больше 2 символов")
             .max(30,"Введите меньше 30 символов"),
    email:yup.string()
             .required("Пожалуйста введите email")
             .email("Пожалуйста введите корректный email")
             .min(5,"Пожалуйста введите больше 5 символов")
             .max(300,"Пожалуйста введите меньше 300 символов"),
    password:yup.string()
             .required("Пожалуйста введите пароль")
             .min(5,"Пожалуйста введите больше 5 символов")
             .max(300,"Пожалуйста введите меньше 300 символов"),

  })
  .required()


const Signup = () => {

    const [ sendUserData , { isSuccess ,isLoading ,isError } ] = useSingupMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(singupSchema),
      })

    const onSubmit = (data:any) => {
        sendUserData(data)
     
    }

    const dispatch = useAppDispatch();

    const router = useRouter()

    React.useEffect(() => {

        if(isSuccess){
            dispatch(authorizationActions.defineAuthStatus(true))
            
            router.push("/")

        }else{
            dispatch(authorizationActions.defineAuthStatus(false))
        }


    },[isSuccess])


    return (
        <div  >
                <h1 className="text-center my-10 text-2xl">
                    Регистрация
                </h1>
                <form className="text-center" onSubmit={(handleSubmit(onSubmit))}>

                    <div className="mb-3 ">
                        <input type="text" 
                               className="border-2 w-1/4 rounded-lg px-2 py-1" 
                               {...register("name")} 
                               placeholder="name"  
                        />
                        {errors.name && <span className="block text-red-700 my-2">{errors.name.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input type="email" 
                               className="border-2 w-1/4 rounded-lg px-2 py-1" 
                               {...register("email")} 
                               placeholder="email"   
                        />
                        {errors.email && <span className="block text-red-700 my-2">{errors.email.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input type="password" 
                               className="border-2 w-1/4 rounded-lg px-2 py-1" 
                               {...register("password")} 
                               placeholder="password"  
                        />
                        {errors.password && <span className="block text-red-700 my-2">{errors.password.message}</span>}
                    </div>

                    <button className="border-2 rounded px-10 py-2" type="submit">Отправить</button>

                </form>

        </div>
    )

}

export default Signup