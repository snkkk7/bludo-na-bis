
import React from 'react'

import { IItemOfCharacteristics } from '../interfaces';

const ItemOfCharacteristics:React.FC<IItemOfCharacteristics> = ({id,name}) => {


    return (
        <li className='mb-5'>
            <button id={String(id)}>{name}</button>  
        </li>
    )

}

export default ItemOfCharacteristics