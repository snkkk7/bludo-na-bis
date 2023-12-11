
import {useAppDispatch,useAppSelector} from '../store/hooks'



const SelectedFiltersTab = () => {

    const {holidays,types,nationalCuisines} = useAppSelector(state => state.characteristcs)


    return (
        <>
          
                <div className="flex">
                    <p className='mr-5'>Выбранные типы: </p> 
                    <ul>
                        {
                            types.length === 0 && <li>Вы еще не выбрали ни одного типа</li>
                        }
                        {
                            types.map(el => 1)
                        }
                    </ul>
                </div>
                <div className='flex'>
                    <p className='mr-5'>Выбранные праздники: </p> 
                        <ul>
                            {
                                types.length === 0 && <li>Вы еще не выбрали ни одного праздники</li>
                            }
                            {
                                types.map(el => 1)
                            }
                        </ul>
                    </div>
                <div className='flex'>
                    <p className='mr-5'>Выбранные национальные кухни: </p> 
                        <ul>
                            {
                                types.length === 0 && <li>Вы еще не выбрали ни одного национальные праздники</li>
                            }
                            {
                                types.map(el => 1)
                            }
                        </ul>
                </div>
           
        </>
    )

}

export default SelectedFiltersTab