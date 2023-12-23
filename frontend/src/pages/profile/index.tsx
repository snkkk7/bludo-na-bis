
import {useGetMineRecipesQuery} from "@/store/recipesApi"

import {useState} from "react"

import {useGetUserInfoQuery} from '@/store/authrizationApi'

import Tab from '@mui/material/Tab';

import TabContext from '@mui/lab/TabContext';

import TabList from '@mui/lab/TabList';

import TabPanel from '@mui/lab/TabPanel';

import Box from '@mui/material/Box';

import Recipes from "@/components/UI/Recipes";

import UserRecipesItem from "@/components/ListItems/UserRecipesItem";

import { IUserRecipeProps} from "@/interfaces"

import { isPending } from "@reduxjs/toolkit";

export default function Profile(){


    const [pageOfReadyRecipes,setPageOfReadyRecipes] = useState(1)

    const [pageOfPendingRecipes,setPageOfPendingRecipes] = useState(1)

    const [pageOfRejectedRecipes,setPageOfRejectedRecipes] = useState(1)

    const [namePendingRecipes,setNameOfPendingRecipes] = useState("")

    const [nameOfReadyRecipes,setNameOfReadyRecipes] = useState("")

    const {data:recipesIsPending,isLoading:pendingRecipesIsLoading,isSuccess:pendingRecipesIsSuccess} = useGetMineRecipesQuery({
                                                                                                                                page:pageOfReadyRecipes,
                                                                                                                                isPending:true,
                                                                                                                                isRejected:true,
                                                                                                                                isReady:false,
                                                                                                                                recipeName:namePendingRecipes
                                                                                                                               })

    const {data:recipesIsReady,isLoading:readyRecipesIsLoading,isSuccess:readyRecipesIsSuccess} = useGetMineRecipesQuery({
                                                                                                                          page:pageOfReadyRecipes,
                                                                                                                          isPending:false,
                                                                                                                          isRejected:false,
                                                                                                                          isReady:true,
                                                                                                                          recipeName:nameOfReadyRecipes
                                                                                                                        })

    const {data:userData,isLoading:isLoadingUserData,isSuccess:isSuccessUserData} = useGetUserInfoQuery("")

    const [tab,setTab] = useState("1")

    const handleChangeTab = (_:any,tab:string) => {
            setTab(tab)
    }

    const handleChangePageOfReadyRecipes = (e:any,page:number) => setPageOfReadyRecipes(page)

    const handleChangePageOfPendingRecipes = (e:any,page:number) => setPageOfPendingRecipes(page)

    const handleChangeNameOfPendingRecipes = (e:any) => setNameOfPendingRecipes(e.target.value)

    const handleChangeNameOfReadyRecipes = (e:any) => setNameOfReadyRecipes(e.target.value)


    return (
        <>
            <h3 className="text-3xl mb-3">Ваш профиль</h3>
            
            <p className="text-xl">Ваше имя: {isSuccessUserData && userData.name}</p>

            <p className="text-xl mb-5">Ваш email : {isSuccessUserData && userData.email}</p>

            <TabContext value={tab}>
                    <Box sx={{display:'flex',justifyContent:"center"}}>
                        <TabList onChange={handleChangeTab} variant="scrollable" aria-label="lab API tabs example">
                            <Tab label="Готовые рецепты" value="1" />
                            <Tab label="Рецепты в ожидании" value="2" />
                        </TabList>
                    </Box>      
                    <TabPanel value="1">

                 

               
                                    <Recipes page={pageOfReadyRecipes} handleChangeValue={handleChangeNameOfReadyRecipes} isLoading={readyRecipesIsLoading} countPages={recipesIsReady?.count} isSuccess={readyRecipesIsSuccess} handleChangePage={handleChangePageOfReadyRecipes}>
                                            {
                                                readyRecipesIsSuccess && recipesIsReady.rows?.map((el:IUserRecipeProps) => <UserRecipesItem 
                                                                                                                                            title={el.title} 
                                                                                                                                            authorId={el.authorId}
                                                                                                                                            authorName={el.authorName}
                                                                                                                                            isRejected={el.isRejected}
                                                                                                                                            isPending={el.isPending}
                                                                                                                                            img={el.img}
                                                                                                                                            id={el.id}
                                                                                                                            />
                                                                                                        )               
                                            }                                
                                    </Recipes>
                                                                            
                  
                    </TabPanel>
                    <TabPanel value="2">                        
                  
                 
                                    <Recipes page={pageOfPendingRecipes} handleChangeValue={handleChangeNameOfPendingRecipes} isLoading={pendingRecipesIsLoading} countPages={recipesIsPending?.count} isSuccess={pendingRecipesIsSuccess} handleChangePage={handleChangePageOfPendingRecipes}>
                                            {
                                                pendingRecipesIsSuccess && recipesIsPending.rows?.map((el:IUserRecipeProps) => <UserRecipesItem 
                                                                                                                                            title={el.title} 
                                                                                                                                            authorId={el.authorId}
                                                                                                                                            authorName={el.authorName}
                                                                                                                                            isRejected={el.isRejected}
                                                                                                                                            isPending={el.isPending}
                                                                                                                                            img={el.img}
                                                                                                                                            id={el.id}
                                                                                                                            />
                                                                                                        )               
                                            }                                
                                    </Recipes>
                                                                            
                  

                    </TabPanel>
            </TabContext>

        </>
    )
}