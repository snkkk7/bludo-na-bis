



const RecipeOptionsTab = () => {

    return (
        <>

            <div className="flex gap-5">
                <p>Вам нужно блюдо халяль?</p> 
                <input type="checkbox" name="isHalal" id="isHalal" />
            </div>
            <div className="flex gap-5">
                <p>Вам нужно вегаеское блюдо?</p>
                <input type="checkbox" name="isVegan" id="isVegan" />
            </div>

        </>
    )

}

export default RecipeOptionsTab