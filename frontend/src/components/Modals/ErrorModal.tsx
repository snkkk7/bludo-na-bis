
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FC} from 'react'
import {IErrorModal} from '@/interfaces'
 

const ErrorModal:FC<IErrorModal> = ({isOpen,errors}) => {

    return (
        <>

            <Modal open={isOpen}>
                <Box className="bg-white rounded-2xl w-1/4 mx-auto mt-44 px-10 py-5">
                        <Typography className='text-center'>{errors.isIngredientErrorVisible && "Пожалуйста введите ингредиент!"}</Typography>
                        <Typography className='text-center'>{errors.isStepErrorVisible && "Пожалуйста введите шаг!"}</Typography>
                        <Typography className='text-center'>{errors.isTypeErrorVisible && "Пожалуйста введите тип рецепта!"}</Typography>
                        <Typography className='text-center'>{errors.isNationalCuisineErrorVisible && "Пожалуйста введите национальную кухню"}</Typography>
                        <Typography className='text-center'>{errors.isHolidayErrorVisible && "Пожалуйста введите праздник рецепта!"}</Typography>
                </Box>
            </Modal>
        
        
        </>
    )
}

export default ErrorModal