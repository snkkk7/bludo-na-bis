
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FC} from 'react'
import {IMessagesModal} from '@/interfaces'
 

const MessagesModal:FC<IMessagesModal> = ({isOpen,reasons,messages}) => {

    return (
        <>

            <Modal open={isOpen}>
                <Box className={`bg-white rounded-2xl w-1/4 mx-auto mt-44 px-10 py-5 ${reasons.isError && `border-2 border-rose-600`} ${reasons.isSuccess && 'border-2 border-green-500'}`}>
                        <Typography className='text-center'>{reasons.isIngredientErrorVisible && "Пожалуйста введите ингредиент!"}</Typography>
                        <Typography className='text-center'>{reasons.isStepErrorVisible && "Пожалуйста введите шаг!"}</Typography>
                        <Typography className='text-center'>{reasons.isTypeErrorVisible && "Пожалуйста введите тип рецепта!"}</Typography>
                        <Typography className='text-center'>{reasons.isNationalCuisineErrorVisible && "Пожалуйста введите национальную кухню"}</Typography>
                        <Typography className='text-center'>{reasons.isHolidayErrorVisible && "Пожалуйста введите праздник рецепта!"}</Typography>
                        <Typography className='text-center'>{reasons.isError && messages.errorMessage}</Typography>
                        <Typography className='text-center'>{reasons.isSuccess && messages.successMessage}</Typography>
                </Box>
            </Modal>
        
        
        </>
    )
}

export default MessagesModal