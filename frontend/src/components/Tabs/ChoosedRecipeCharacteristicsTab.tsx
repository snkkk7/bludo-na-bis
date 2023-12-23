import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import Box from '@mui/material/Box';
import {recipeActions} from '@/store/recipeSlice'
import {useAppSelector,useAppDispatch} from "@/store/hooks"

const ChoosedRecipeCharacteristicsTab = () => {

    const dispatch = useAppDispatch()

    const {type,holiday,nationalCuisine} = useAppSelector(state => state.recipe)

    const handleRemoveType = () => {
        dispatch(recipeActions.removeType())
    }

    const handleRemoveHoliday = () => {
        dispatch(recipeActions.removeHoliday())
    }

    const handleRemoveNationalCuisine = () => {
        dispatch(recipeActions.removeNationalCuisine())
    }

    return (
        <>
                <div className='flex gap-2'>
                    {type.name && <p>{type.name}</p>}
                    {!type.name && <p>Вы не выбрали тип для рецепта</p>}
                    <button type="button" onClick={handleRemoveType} id={type.id}>X</button>
                </div>
                <div className='flex gap-2'>
                    {holiday.name && <p>{holiday.name}</p>}
                    {!holiday.name && <p>Вы не выбрали праздник для рецепта</p>}
                    <button type="button" onClick={handleRemoveHoliday} id={holiday.id}>X</button>
                </div>
                <div className='flex gap-2'>
                    {nationalCuisine.name && <p>{nationalCuisine.name}</p>}
                    {!nationalCuisine.name && <p>Вы не выбрали кухню для рецепта</p>}
                    <button type="button" onClick={handleRemoveNationalCuisine} id={nationalCuisine.id}>X</button>
                </div>

     
        </>
    )
}


export default ChoosedRecipeCharacteristicsTab