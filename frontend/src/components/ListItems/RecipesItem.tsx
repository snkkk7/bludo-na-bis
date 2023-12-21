
import type { IRecipeItemProps } from '../../interfaces'

import Image from 'next/image'

import Link from 'next/link'

const RecipesItem:React.FC<IRecipeItemProps> = (props) => {


    return (
        <li className='flex gap-5 border-2 p-5 h-[130px] width-1/4 rounded-xl mb-5'>
            <Image alt='картинка блюда' width="100" height="100" src={`http://localhost:5000/${props.img}`}/>
            <div>
                <p>{props.title}</p>
                <Link href={`recipes/${props.link}`}>перейти на рецепт</Link>
            </div>
        </li>
    )

}

export default RecipesItem