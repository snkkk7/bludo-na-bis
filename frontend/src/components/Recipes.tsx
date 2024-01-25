


import RecipesList from "../List/Recipes"

const Recipes = ({data:{rows,count}} : any ) => {

        console.log(rows)

        return (
            <>
                 <RecipesList />

            </>
        )

}

export default Recipes