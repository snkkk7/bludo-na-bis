
import {IChoosedOptionsList} from '@/interfaces'

import { FC } from 'react'



const ChoosedCharacteristicsList:FC<IChoosedOptionsList> = ({onRemoveCharacteristic,characteristics}) => {

    

    return (
        <>
            <ul className='flex flex-col items-center'>
                {
                   characteristics.length > 0 && characteristics.map((el:any) => (
                        <li key={el.id} className='flex gap-x-5'>
                            <p>{el.name}</p>
                            <button id={el.id} onClick={onRemoveCharacteristic}>X</button>
                        </li>
                    ))
                }
                {
                    characteristics.length == 0 && <li>Вы еще ничего не выбрали!</li>
                }
             

            </ul>
        </>
    )

}


export default ChoosedCharacteristicsList