



import Pagination from '@mui/material/Pagination';

import { IItemOfCharacteristics,IListOfCharacteristics } from '../interfaces';

import ItemOfCharacteristics from './ItemOfCharacteristics';

const ListOfCharacteristics:React.FC<IListOfCharacteristics> = ({items,countPages,page,handleChangePage}) => {



    return (
        <div className='flex flex-col items-center mb-5'>
            <ul className='mt-5'>
                {
                    items?.map((el:IItemOfCharacteristics) => <ItemOfCharacteristics 
                                                                                     name={el.name} 
                                                                                     id={el.id}
                                                                                     key={el.id}
                                                              />)
                }
            </ul>
             <Pagination  count={countPages} page={page} onChange={handleChangePage}/>
        </div>
           )
}

export default ListOfCharacteristics