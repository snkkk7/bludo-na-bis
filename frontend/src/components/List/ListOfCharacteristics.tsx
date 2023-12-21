
import type {IListOfCharacteristics} from '@/interfaces'
import Pagination from '@mui/material/Pagination';
import { FC } from 'react'

const ListOfCharacteristics:FC<IListOfCharacteristics> = ({onHandleChangePage,items,page,onAddCharacteristic,countPages}) => {

    return (
        <div className='flex flex-col items-center'>
          
            <ul className='mb-5'>
                {

                    items.map((el : any ) => (
                        <li className='text-center rounded-lg border-2 px-5 py- mb-2'>
                            <button onClick={onAddCharacteristic} key={el.id} id={el.id}>{el.name}</button>
                        </li>
                    ))

                }
            </ul>

            <Pagination count={countPages} onChange={onHandleChangePage} page={page}/>
          
        </div>
    )

}

export default ListOfCharacteristics