import Image from 'next/image'
import { Inter } from 'next/font/google'

import {useChechAuthQuery} from '@/store/authrizationApi'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
const inter = Inter({ subsets: ['latin'] })
import {authorizationActions} from '../store/authorizationSlice'
import RecipesList from '@/components/List/RecipesList'
import {useEffect} from 'react'

const Home = () => {

  const dispatch = useAppDispatch()

  const {data,isLoading,isSuccess,isError} = useChechAuthQuery(null)

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
        <>
          <RecipesList/>
        </>
  )
}


export default Home