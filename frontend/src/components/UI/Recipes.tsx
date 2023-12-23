
'use client'

import { IRecipes } from "@/interfaces"

import { FC } from "react"

import Pagination from '@mui/material/Pagination';

const Recipes:FC<IRecipes> = ({isSuccess,isLoading,countPages,handleChangePage,children,handleChangeValue,page}) => {


    return (
        
        <> 
                <div className="flex items-center flex-col pb-10">    

                   {
                        isSuccess && countPages >= 1 && <input type="text" onChange={handleChangeValue} placeholder="Поиск..." className="border-b-2 mb-5 p-2 border-slate-700 outline-none" />
                   } 

                    {       
                        isLoading && <p>Loading...</p>
                    }
                    <ul>
                        {
                            isSuccess && children
                        }
                    </ul>
                        {   
                                isSuccess
                                    &&
                                countPages >= 1
                                    &&
                            <Pagination count={countPages} onChange={handleChangePage} page={page} />

                        }
                        {
                            isSuccess && countPages === 0 && <p className="text-center">Вы еще не добавили ниодного рецепта или ваше рецепты находятся в рассмотрении.</p>
                        }
                </div>
          </>
                
        
    )

}


export default Recipes