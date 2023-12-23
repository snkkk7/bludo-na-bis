import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import type {IOptionsModal} from '@/interfaces'
import { FC } from 'react';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, SubmitHandler,Controller } from "react-hook-form"
import * as yup from "yup"
import { useAppDispatch,useAppSelector } from '@/store/hooks';
import {recipeActions} from '@/store/recipeSlice'


const AddStepModal:FC<IOptionsModal> = ({isOpen,onHandleCloseModal}) => {

    const dispatch = useAppDispatch()

    const schema = yup.object({
        nameOfStep:yup.string().required("Введите пожалуйста шаг")
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
        dispatch(recipeActions.addStep(data.nameOfStep))
    }

    const steps = useAppSelector(state => state.recipe.steps)

    const handleRemoveStep = (e:any) => {
        dispatch(recipeActions.removeStep(e.currentTarget.id))
     
    }


    return (
     <Modal
            open={isOpen} 
            onClose={onHandleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
     >
        <Box className="bg-white w-6/12 mx-auto mt-44 px-10 py-5 flex flex-col items-center">
            <Typography id="modal-modal-title" className='text-center mb-2' variant="h6" component="h2">
               Добавте шаг!
            </Typography>
            <form id="stepform" className='my-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" {...register("nameOfStep")} className='border-2 rounded-lg mb-2 p-2' placeholder='Добавте шаг!' />
                    {
                         <span className='block mb-2'>{errors.nameOfStep?.message}</span>
                    }
                </div>
                <button form="stepform" type='submit' className='border-2 rounded-xl text-sm p-2'>Добавить шаг!</button>
            </form>
            <h3 className='text-xl mb-2'>Шаги</h3>
            <ul>
                {
                    steps.length === 0 && <li>Вы не добавили ниодного Шага</li>
                }
                {
                    steps.map(el => (
                        <li className='flex items-center gap-2' key={el.id}>
                            <p>{el.name}</p>
                            <button onClick={handleRemoveStep} id={el.id} className='text-xl'>X</button>
                        </li>
                    ))
                }
            </ul>
        </Box>
     </Modal>
        
    )
}

export default AddStepModal