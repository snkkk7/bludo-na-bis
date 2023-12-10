


import RecipesList from "./RecipesList"


const Recipes = () => {

    return <>
                    <h1 className="text-center my-10 text-3xl">
                        Рецепты
                    </h1>
                    <div className="flex flex-col w-full items-center">
                

                        <RecipesList/>

                    </div>
             </>
}

export default Recipes
