
import {characteristicsActions} from '@/store/characteristicsSlice'

import {useAppDispatch,useAppSelector} from "@/store/hooks"

const RecipeOptionsTab = () => {

    const dispatch = useAppDispatch()

    const {isHalal,isVegan} = useAppSelector(state => state.characteristcs)
    
    return (
        <>
    
            <div className="flex gap-5">
                <p>Вам нужно блюдо халяль? {isHalal}</p> 
                <input type="checkbox" defaultChecked={isHalal}  onClick={() => dispatch(characteristicsActions.toggleHalalStatus())} name="isHalal" id="isHalal" />
            </div>
            <div className="flex gap-5">
                <p>Вам нужно вегаеское блюдо? {isVegan}</p>
                <input type="checkbox" defaultChecked={isVegan} onClick={() => dispatch(characteristicsActions.toggleVeganStatus())} name="isVegan" id="isVegan" />
            </div>

        </>
    )

}

export default RecipeOptionsTab