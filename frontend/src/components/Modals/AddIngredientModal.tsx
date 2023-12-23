import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import type { IOptionsModal } from '@/interfaces'
import { FC } from 'react';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, SubmitHandler,Controller } from "react-hook-form"
import * as yup from "yup"
import { useAppDispatch,useAppSelector } from '@/store/hooks';
import {recipeActions} from '@/store/recipeSlice'


const AddIngredientModal:FC<IOptionsModal> = ({isOpen,onHandleCloseModal}) => {

    const dispatch = useAppDispatch()

    const schema = yup.object({
        nameOfIngredient:yup.string().required("Введите пожалуйста имя индредиента!")
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })
                                                            
      const onSubmit = (data:any,e:any) => {
        e.preventDefault()
        reset()
        dispatch(recipeActions.addIngredient(data.nameOfIngredient))
    }

    const ingredients = useAppSelector(state => state.recipe.ingredients)

    const handleRemoveIngredient = (e:any) => {
        dispatch(recipeActions.removeIngredient(e.currentTarget.id))
    }

    return (
     <Modal
            open={isOpen} 
            onClose={onHandleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
     >
        <Box className="bg-white w-6/12 mx-auto flex flex-col items-center mt-44 px-10 py-5">
            <Typography id="modal-modal-title" className='text-center mb-2' variant="h6" component="h2">
               Добавте ингредиент!
            </Typography>
            <form id="ingredientform" className='mb-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" {...register("nameOfIngredient")} className='border-2 rounded-lg mb-2 p-2' placeholder='Добавте ингредиент!' />
                    {
                         <span className='block mb-2'>{errors.nameOfIngredient?.message}</span>
                    }
                      <button type="submit" className='border-2 rounded-xl text-sm p-2'>Добавить ингредиент!</button>
                </div>       
            </form>
            <h3 className='text-xl mb-2'>Ингридиенты</h3>
            <ul>
            {
                    ingredients.length === 0 && <li>Вы не добавили ниодного ингредиента</li>
                }
                {
                    ingredients.map(el => (
                        <li className='flex items-center gap-2' key={el.id}>
                            <p>{el.name}</p>
                            <button type='button' onClick={handleRemoveIngredient} id={el.id} className='text-xl'>X</button>
                        </li>
                    ))
                }
            </ul>
        </Box>
     </Modal>
        
    )
}

export default AddIngredientModal