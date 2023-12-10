import Image from 'next/image'
import { Inter } from 'next/font/google'
import Recipes from '@/components/Recipes'
import {useChechAuthQuery} from '@/store/authrizationApi'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
const inter = Inter({ subsets: ['latin'] })
import {authorizationActions} from '../store/authorizationSlice'

const Home = () => {

  const {data,isLoading,isSuccess,isError} = useChechAuthQuery(null)

  const dispatch = useAppDispatch()

  

  React.useEffect(() => {
    if(isSuccess){
      dispatch(authorizationActions.defineAuthStatus(data.isAuth))
    }
  },[isSuccess])

  return (
      <Recipes/>
  )
}


export default Home