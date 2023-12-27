
import {ICharacteristics} from "@/interfaces"

import { FC ,useEffect,useState } from "react"

import Pagination from '@mui/material/Pagination';

import { useAppDispatch,useAppSelector } from "@/store/hooks";

import { characteristicsActions  } from "@/store/characteristicsSlice"

import editIcon from "../../../public/edit-icon.png"

import Image from "next/image";

const Characteristics:FC<ICharacteristics> = ({editCharacteristic,characteristics,isSuccess}) => {

    const dispatch = useAppDispatch()


    const [value,setValue] = useState('')

    useEffect(() => {

        if(isSuccess){
            console.log(characteristics)
           dispatch(characteristicsActions.setCharacteristicsAdmin(characteristics))
        }

    },[isSuccess])

    
  
    
    const handleSendEditCharacteristic = (e:any) => {
        dispatch(characteristicsActions.toggleCharacteristicInput({id:e.target.id,value:value}))
        editCharacteristic({id:e.target.id,name:value})
    }

    const handleChangeCharacteristicNameValue = (e:any) => {
        setValue(e.target.value)
    
    }

    const characteristicsInfo = useAppSelector(state => state.characteristcs.characteristics)

    const editCharacteristicHandle = (e:any) => {
        dispatch(characteristicsActions.toggleCharacteristicInput({id:e.target.id,value:value}))
        const idx = characteristicsInfo.findIndex(el => el.id == e.target.id)
        setValue(characteristicsInfo[idx].name)
        
    }

    return (
        <div className="flex flex-col items-center">

            {
                        isSuccess 
                            &&
                <ul className="mb-5">
                        {
                            characteristicsInfo?.map((el) => (
                                                        <li key={el.id} className="flex items-center gap-5 mb-5">
                                                            {el.isInputVisible && <input className="border-b-2 border-slate-700" onChange={handleChangeCharacteristicNameValue} defaultValue={value}/>}
                                                            {!el.isInputVisible && <p className="text-xl">{el.name}</p> }                                                                                             
                                                                                               
                                                            {
                                                                !el.isInputVisible && (
                                                                    <button onClick={editCharacteristicHandle}>
                                                                        <Image id={el.id} src={editIcon} alt='edit icon' height={25} width={25}/>
                                                                    </button>
                                                                )
                                                            }
                                                            {
                                                                el.isInputVisible && (
                                                                    <button onClick={handleSendEditCharacteristic}>
                                                                        <Image id={el.id} src={editIcon} alt='edit icon' height={25} width={25}/>
                                                                    </button>
                                                                )
                                                            }
                                                            
                                                        </li>
                                                        )) 
                        }
                </ul>

            }
    
        </div>
    )
}

export default Characteristics