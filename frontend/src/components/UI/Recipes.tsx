


import RecipesList from "../List/RecipesList"

const Recipes = ({data:{rows,count}} : any ) => {

        console.log(rows)

        return (
            <div className="">
                 <RecipesList data={rows}  />

            </div>
        )

}

export default Recipes