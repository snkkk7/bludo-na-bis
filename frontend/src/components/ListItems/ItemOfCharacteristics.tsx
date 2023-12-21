
import React from 'react'

import { IItemOfCharacteristics } from '../../interfaces';

const ItemOfCharacteristics:React.FC<IItemOfCharacteristics> = ({id,name,onAddCharacteristic}) => {


    return (
        <li className='mb-5'>
            <button onClick={onAddCharacteristic} name={name} id={String(id)}>{name}</button>  
        </li>
    )

}

export default ItemOfCharacteristics