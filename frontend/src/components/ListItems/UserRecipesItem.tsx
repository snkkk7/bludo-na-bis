

import { FC } from 'react'

import {IUserRecipeProps} from "@/interfaces"

import Image from 'next/image'

import Link from 'next/link'

const UserRecipesItem:FC<IUserRecipeProps> = ({title,img,authorId,authorName,isPending,isRejected,id}) => {


    return (
        <>
           <li className={`flex gap-5 border-2 p-5 h-[130px] width-1/4 rounded-xl mb-5 ${isPending && 'bg-stone-300'} ${isRejected && 'bg-red-400'}`}>
            <Image alt='картинка блюда' width="100" height="100" src={`http://localhost:5000/${img}`}/>
            <div>
                <p>{title}</p>
                <Link href={`recipes/${id}`}>перейти на рецепт</Link>
                <Link className="block" href={`editRecipe/${id}?${isRejected && 'mustEdit=true' || ""}`}>отредактировать</Link>
            </div>
        </li>
        

        </>
    )
}

export default UserRecipesItem