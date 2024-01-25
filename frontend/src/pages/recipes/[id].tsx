

import Link from "next/link";

import type { Metadata,ResolvingMetadata } from 'next'
 
import { useRouter } from "next/router";

import { useWasRecipeLikedQuery } from "@/store/recipesApi";

import Head from "next/head";

export async function getStaticPaths(){

    const response = await fetch("http://localhost:5000/api/recipes")

    const posts = await response.json();

    console.log(posts)

    const paths = posts.map((post : any) => ({
        params: { id: post.id.toString() },
      }))

    return {
        paths,
        fallback:'blocking'
    }

}

export async function getStaticProps({ params } : any) {
    
    const res = await fetch(`http://localhost:5000/api/recipes/${params.id}`)

    const recipe = await res.json()
   
    return { props: { recipe } , revalidate:10 }
  }


  


export default function Recipe({recipe} : any){

    const {query} = useRouter()

    return (
        <>
            <Head>
                <title>
                    рецепт - {recipe.title}
                </title>
                <meta name={recipe.description}/>
                <meta name="Народные рецепты,домашние рецепты,быстрые рецепты,малокалорийные блюда,5 минутка,вкусные блюда,новогодние рецепты,веганские" />
                {
                    recipe.isHalal && <meta name={"халяльные блюда,Халяльная кухня,халяль еда,халяль блюда,halal,halal food,топ халяльных блюд"} />
                }
                {
                    recipe.isVegan && <meta name="Веганские блюда,vegan food,vegetarian food,веганская еда,вегатарианская еда,топ веганских блюд на вечер,то
                    топ 5 веганских блюд,топ веганских блюд" />
                }

            </Head>
            <Link href="/" className="border-2 p-2 rounded-xl">Назад</Link>
            <h1 className="mb-5 text-2xl text-center">{recipe.title}</h1>
            <div className="flex mb-5 justify-center gap-5">
                    <p className="basis-1/4">{recipe.description}</p>
                    <div className="basis-1/3 ">
                        <img className="block rounded-xl h-60 object-center mb-2" src={`http://localhost:5000/${recipe.img}`} alt="фото рецепта" />
                        <Link href={`/profile/${recipe.authorId}`}>Автор: {recipe.authorName}</Link>
                    </div>
                    
            </div>
           
            <div className="flex justify-center">
                <div className="basis-1/2 flex flex-col items-center">
                    <h2 className="text-center text-2xl mb-3">Шаги</h2>
                     <ul className="text-center">
                        {recipe.steps.map((el:any) => <li className="text-center mb-2">{el.name}</li>)}
                    </ul>
                </div>
                <div className="basis-1/2 flex flex-col items-center">
                    <h2 className="text-center text-2xl mb-3">Ингридиенты</h2>       
                     <ul>
                         {recipe.ingredients.map((el:any) => <li mb-2>{el.name}</li>)}
                     </ul> 
                </div>
               
            </div>
                
            <div className="flex justify-center flex-col items-center mt-11">
                <p className="mb-2">Веганское ли блюдо: {recipe.isVegan && <span>✅</span> } {!recipe.isVegan && <span>❌</span> }</p>
                <p className="">Халяль ли блюдо: {recipe.isHalal && <span>✅</span> } {!recipe.isHalal && <span>❌</span> }</p>
            </div>
         
        
        
        </>
    )

}