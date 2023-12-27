

import Recipes from "@/components/UI/Recipes"

import {useGetRecipesQuery} from "@/store/recipesApi"

import RecipesItemAdmin from "@/components/admin/RecipesItemAdmin"

import { useState } from "react"

import Tab from '@mui/material/Tab';

import TabContext from '@mui/lab/TabContext';

import TabList from '@mui/lab/TabList';

import TabPanel from '@mui/lab/TabPanel';

import Box from '@mui/material/Box';

export default function RecipesControl(){
    
    const [checkedRecipesPage,setCheckedRecipesPage] = useState(1)

    const [pendingRecipePage,setPendingRecipePage] = useState(1)

    const [rejectRecipesPage,setRejectRecipesPage] = useState(1)

    const [tab,setTab] = useState("1")

    const [checkRecipesValue,setCheckRecipesValue] = useState("")

    const [rejectedRecipesValue,setRejectedRecipesValue] = useState("")

    const [pendingRecipesValue,setPendingRecipesValue] = useState("")

    //

    const handleChangeCheckedRecipesValue = (e:any) => {
        setCheckRecipesValue(e.target.value)
    }

    const handleChangeRejectedRecipesValue = (e:any) => {
        setRejectedRecipesValue(e.target.value)
    }

    const handleChangePendingRecipesValue = (e:any) => {
        setPendingRecipesValue(e.target.value)
    }

    //

    const handleChangeRejectRecipesPage = (_:any,page:any) => {
        setRejectRecipesPage(page)
    }

    const handleChangePendingRecipesPage = (_:any,page:any) => {
        setPendingRecipePage(page)
    }

    const handleChangeCheckRecipesPage = (_:any,page:any) => {
        setCheckedRecipesPage(page)
    }







    
    const handleChangeTab = (_L:any,tab:string) => {
        setTab(tab)
    }


    const {data:pendingRecipesData,isSuccess:isSuccessPendingRecipes,isLoading:isLoadingPendingRecipes} = useGetRecipesQuery({
                                                                                                         page:pendingRecipePage,
                                                                                                         recipeName:pendingRecipesValue,
                                                                                                         isChecked:false,
                                                                                                         isPending:true,
                                                                                                         isRejected:false,
                                                                                                         isVegan:false,
                                                                                                         isHalal:false
                                                                                                        })
    
    const {data:rejectedRecipesData,isSuccess:isSuccessRejectedRecipes,isLoading:isLoadingRejectedRecipes} = useGetRecipesQuery({
        page:rejectRecipesPage,
        recipeName:rejectedRecipesValue,
        isChecked:false,
        isPending:false,
        isRejected:true,
        isVegan:false,
        isHalal:false
       })
              
       
    const {data:checkedRecipesData,isSuccess:isSuccesCheckedRecipes,isLoading:isLoadingCheckedRecipes} = useGetRecipesQuery({
     page:checkedRecipesPage,
     recipeName:checkRecipesValue,
     isChecked:true,
     isPending:false,
     isRejected:false,
     isVegan:false,
     isHalal:false
    })   

    return (
        <>

            <h2 className="text-3xl mb-5">Управление Рецептами</h2>

            <TabContext value={tab}>
                    <Box sx={{display:'flex',justifyContent:"center",marginBottom:"5px"}}>
                        <TabList onChange={handleChangeTab} variant="scrollable" aria-label="lab API tabs example">
                            <Tab label="Откланеные рецепты" value="1" />
                            <Tab label="Рецепты в ожидании" value="2" />
                            <Tab label="Готовые рецепты" value="3" />
                        </TabList>
                    </Box>    
                    <TabPanel value="1">
                            <Recipes isSuccess={isSuccessRejectedRecipes} isLoading={isLoadingRejectedRecipes} handleChangePage={handleChangeRejectRecipesPage} page={rejectRecipesPage}  countPages={rejectedRecipesData?.count} handleChangeValue={handleChangeRejectedRecipesValue}>
                                   {

                                           rejectedRecipesData?.rows?.map((el : any) => (
                                               <RecipesItemAdmin 
                                                                 title={el.title} 
                                                                 authorId={el.authorId} 
                                                                 authorName={el.authorName}
                                                                 isChecked={el.isChecked}
                                                                 isPending={el.isPending}
                                                                 link={el.id}
                                                                 img={el.img}
                                               />
                                           ))

                                   }
                               </Recipes>
                    </TabPanel>
                    <TabPanel value="2">
                        <Recipes isSuccess={isSuccessPendingRecipes} isLoading={isLoadingPendingRecipes} handleChangePage={handleChangePendingRecipesPage} page={pendingRecipePage}  countPages={pendingRecipesData?.count} handleChangeValue={handleChangePendingRecipesValue}>
                             {
                            
                                     pendingRecipesData?.rows?.map((el : any) => (
                                         <RecipesItemAdmin 
                                                           title={el.title} 
                                                           authorId={el.authorId} 
                                                           authorName={el.authorName}
                                                           isChecked={el.isChecked}
                                                           isPending={el.isPending}
                                                           link={el.id}
                                                           img={el.img}
                                         />
                                     ))
                                    
                             }
                         </Recipes>
                    </TabPanel>
                    <TabPanel value="3">
                        <Recipes isSuccess={isSuccesCheckedRecipes} isLoading={isLoadingCheckedRecipes} handleChangePage={handleChangeCheckRecipesPage} page={checkedRecipesPage}  countPages={checkedRecipesData?.count} handleChangeValue={handleChangeCheckedRecipesValue}>
                             {
                            
                                    checkedRecipesData?.rows?.map((el : any) => (
                                         <RecipesItemAdmin 
                                                           title={el.title} 
                                                           authorId={el.authorId} 
                                                           authorName={el.authorName}
                                                           isChecked={el.isChecked}
                                                           isPending={el.isPending}
                                                           link={el.id}
                                                           img={el.img}
                                         />
                                     ))
                                    
                             }
                         </Recipes>
                    </TabPanel>
            </TabContext>   


        </>
    )
}