
"use client"

import Pagination from '@mui/material/Pagination';

import RecipesItem from "./RecipesItem"

import React , { ChangeEvent } from "react"

import { useGetRecipesQuery } from "@/store/recipesApi";

const RecipesList : React.FC = () => {

    const [page,setPage] = React.useState<number>(1);

    const [value,setValue] = React.useState<string>("")

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const {data,isSuccess,isLoading} = useGetRecipesQuery({
        page:page,
        productName:value
    })

    return (
         <>
            <div>       
                <input type="text" 
                           placeholder="Поиск..."
                           className="border-2 py-1 px-2 w-9/12
                                      rounded-lg mb-10
                                     "       
                           onChange={handleChangeValue} 
                     />
                <button className='ml-3'>Фильтр</button>
            </div>

            <ul className="mb-5">
                {   
                        isSuccess
                            && 
                    data.rows?.map((el:any,idx:number) => (
                        <RecipesItem title={el.title} 
                                     key={idx} 
                                     link={el.id} 
                                     img={el.img}/>
                    ))
                }
            </ul>

            {
                            isSuccess
                               &&
             <Pagination count={data.count} page={page} onChange={handleChangePage} />
             
            } 

           
         </>    
    )
}

export default RecipesList