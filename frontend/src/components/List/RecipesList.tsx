
'use client'

import { IRecipeItemProps,IRecipe,IRecipeList } from "@/interfaces"

import RecipesItem from "../ListItems/RecipesItem"

import {useGetRecipesQuery} from '../../store/recipesApi'

import { useState } from "react"

import { FC } from "react"

import FilterRecipeModal from '../Modals/FilterRecipeModal'

import Pagination from '@mui/material/Pagination';

import {useAppSelector} from '@/store/hooks'

const RecipesList:FC = () => {

    const [page,setPage] = useState<number>(1)

    const [isOpen,setIsOpen] = useState<boolean>(false)

    const store = useAppSelector(state => state.characteristcs)

    const queryParams = new URLSearchParams("");

    store.holidays.forEach((el) => queryParams.append('holidayId',el.id)) 

    store.types.forEach((el) => queryParams.append('typeId',el.id)) 

    store.nationalCuisines.forEach((el) => queryParams.append('nationalCuisineId',el.id)) 

    console.log({isVegan:store.isVegan,isHalal:store.isHalal})

    const {data:dataOfrecipes,isLoading,isSuccess} = useGetRecipesQuery({
                                                                         page,
                                                                         queryParams:queryParams.toString(),
                                                                         isHalal:store.isHalal,
                                                                         isVegan:store.isVegan
                                                                        })

    const hanldeChangePage = (_:any,page:number) => {
        setPage(page)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    const handleOpenModal = () => {
        setIsOpen(true)
    }

    return (
        
        <>  
            <h1 className="text-center mb-5 text-lg">Рецепты!</h1>

                <div className="flex items-center flex-col pb-10">    

                        <button className="
                            bg-slate-700 px-6
                            text-white py-1
                            rounded-lg mb-5
                        " onClick={handleOpenModal}>Фильтр</button>

                    {
                        isLoading && <p>Loading...</p>
                    }

                    <ul>
                        {
                                isSuccess
                                    &&
                            dataOfrecipes.rows.map((el:IRecipe) => (
                                <RecipesItem title={el.title} img={el.img} link={el.id} />
                            ))
                        }
                    </ul>
                
                        {   
                                isSuccess
                                    &&
                            <Pagination count={dataOfrecipes.count} onChange={hanldeChangePage}  />

                        }

                </div>


        
                        <FilterRecipeModal handleCloseFilterModal={handleCloseModal} isOpen={isOpen}/>


          </>
                
        
    )

}


export default RecipesList