
import Recipes from '@/components/UI/Recipes'

import { useEffect, useState } from 'react'

import CharacteristicsRecipeModal from '@/components/Modals/CharacteristicsRecipeModal'

import {characteristicsActions} from '@/store/characteristicsSlice'

import {useAppSelector,useAppDispatch} from '@/store/hooks'

import {useGetRecipesQuery} from '@/store/recipesApi'

import RecipesItem, {} from "@/components/ListItems/RecipesItem"

import { IRecipe } from '@/interfaces'



const Home = () => {

  const [isOpen,setIsOpen] = useState<boolean>(false)

  const [page,setPage] = useState(1)

  const [value,setValue] = useState("")

  const dispatch = useAppDispatch()

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const characteristics = useAppSelector(state => state.characteristcs)

  const queryParams = new URLSearchParams("");

  characteristics.holidays.forEach((el) => queryParams.append('holidayId',el.id)) 

  characteristics.types.forEach((el) => queryParams.append('typeId',el.id)) 

  characteristics.nationalCuisines.forEach((el) => queryParams.append('nationalCuisineId',el.id)) 

 

  const {data:dataOfrecipes,isLoading,isSuccess} = useGetRecipesQuery({
      page,
      recipeName:value,
      queryParams:queryParams.toString(),
      isHalal:characteristics.isHalal,
      isVegan:characteristics.isVegan,        
      isRejected:false,
      isPending:false,
      isChecked:true,
                                                 
   })

   const handleChangePage = (e:any,page:number) => setPage(page)

   const handleChangeValue = (e:any) => setValue(e.target.value)

 

  return (
        <>
         <h1 className="text-center mb-5 text-lg">Рецепты!</h1>

         <button className="bg-slate-700 px-6 text-white py-1 rounded-lg mb-5 mx-auto block" onClick={handleOpenModal}>
                        Фильтр
         </button>

          <Recipes page={page} isSuccess={isSuccess} handleChangeValue={handleChangeValue} isLoading={isLoading} countPages={dataOfrecipes?.count} handleChangePage={handleChangePage}>
              {
                isSuccess && dataOfrecipes.rows.map((el:IRecipe) => <RecipesItem authorName={el.authorName} authorId={el.authorId} title={el.title} link={el.id} img={el.img}/>)
              }
          </Recipes>
          
          <CharacteristicsRecipeModal 
                                                    handleCloseModal={handleCloseModal} 
                                                    isOpen={isOpen}
                                                    addType={(e:any) => dispatch(characteristicsActions.addType({name:e.target.innerHTML || null,id:e.target.id}))}
                                                    addNationalCuisine={(e:any) => dispatch(characteristicsActions.addNationalCuisine({name:e.target.innerHTML || null,id:e.target.id}))}                                   
                                                    addHoliday={(e:any) => dispatch(characteristicsActions.addHoliday({name:e.target.innerHTML || null,id:e.target.id}))}
                                                    typeModal="filterRecipeModal"
                      
                        />
        </>
  )
}


export default Home