

import {FC,MouseEvent} from 'react'

import {IIngredient} from "@/interfaces"

import {useAppDispatch} from "@/store/hooks"

import {recipeActions} from '@/store/recipeSlice'

const IngredientsItem:FC<IIngredient> = ({id,name}) => {
    
    const dispatch = useAppDispatch()

    return (
        <li className='flex gap-2 items-center'>
            <p className='text-xl'>{name}</p>
            <button id={id} onClick={(e:MouseEvent<HTMLButtonElement>) => dispatch(recipeActions.removeIngredient(e.currentTarget.id)) } className='text-3xl'>X</button>
        </li>
    )

}

export default IngredientsItem