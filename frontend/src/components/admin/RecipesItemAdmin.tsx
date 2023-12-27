

interface IRecipesItemAdmin {
    title:string,
    authorName:string,
    authorId:number,
    link:string,
    img:string,
    isPending:boolean,
    isChecked:boolean
}

import { FC } from "react"

import Image from "next/image"

import Link from "next/link"

import trash from "../../../public/trash.png"

import {useApproveRecipeMutation,useRejectRecipeMutation} from "@/store/adminApi"

import {useDeleteRecipeMutation} from "@/store/recipesApi"


const RecipesItemAdmin:FC<IRecipesItemAdmin> = ({title,authorName,authorId,link,img,isChecked,isPending}) =>  {

    const [approveRecipe,{isLoading:isLoadingApproveRecipe,isSuccess:isSuccessApproveRecipe}] = useApproveRecipeMutation()

    const [rejectRecipe,{isLoading:isLoadingRejectRecipe,isSuccess:isSuccessRejectRecipe}] = useRejectRecipeMutation()

    const [deleteRecipe,{isLoading:isLoadingDeleteRecipe,isSuccess:isSuccessDeleteRecipe}] = useDeleteRecipeMutation()

    const handleApproveRecipe = (e:any) => {

        approveRecipe(e.target.id)

        location.reload()

    }
    
    const handleRejectRecipe = (e:any) => {

        rejectRecipe(e.target.id)

        location.reload()

    }

    const handleDeleteRecipe = (e:any) => {

        deleteRecipe(e.target.id)
        console.log(e.target)
    }


    return (
        <>

            <li title={title} className="flex gap-5 mb-5">
                <Image height={100} width={100} src={`http://localhost:5000/${img}`} alt={title + " каринка рецепта"}/>
                <div>
                    <p>{title}</p>
                    <Link href={`profile/${authorId}`}>{authorName}</Link>
                    <Link className="block" href={`/recipes/${link}`}>Перейти на рецепт</Link>
                    <Link className="block" href={`/editRecipe/${link}`}>отредактировать</Link>
                </div>
                {
                                isPending
                                    &&
                                <div className="flex flex-col justify-center gap-2">
                                    <button onClick={handleApproveRecipe} id={link} className="text-xl">✅</button>
                                    <button onClick={handleRejectRecipe} id={link} className="text-xl">❌</button>
                                </div>
                }
                {
                                isChecked
                                    &&
                                <button onClick={handleDeleteRecipe}>
                                    <Image id={link} alt="trash" src={trash}/>
                                </button>

                }
            </li>

        </>
    )
}


export default RecipesItemAdmin