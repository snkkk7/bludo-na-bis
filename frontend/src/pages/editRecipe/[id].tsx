



import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {recipeActions} from "@/store/recipeSlice"
import { useAppDispatch } from "@/store/hooks"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, SubmitHandler,Controller } from "react-hook-form"
import IngredientAndStepsEditorTabs from "@/components/Tabs/IngredientAndStepsEditorTabs"
import CharacteristicsRecipeModal from "@/components/Modals/CharacteristicsRecipeModal"
import { useAppSelector } from "@/store/hooks"
import MessagesModal from "@/components/Modals/MessagesModal"
import * as yup from "yup"
import { useEditRecipeMutation,useGetRecipeForEditQuery } from "@/store/recipesApi"



const EditRecipe = () => {

    const {query} = useRouter()

    const {steps,ingredients,holiday,type,nationalCuisine,} = useAppSelector(state => state.recipe)

    const [isMessageModalVisible,setIsMessageModalVisible] = useState(false)
    ///
    const [isIngredientErrorVisible,setIsIngredientErrorVisible] = useState(false) 

    const [isStepErrorVisible,setIsStepErrorVisible] = useState(false) 
    //                  
    const [isTypeErrorVisible,setIsTypeErrorVisible] = useState(false)

    const [isNationalCuisineErrorVisible,setIsNationalCuisineErrorVisible] = useState(false)                         

    const [isHolidayErrorVisible,setIsHolidayErrorVisible] = useState(false)                          
    //
    const [isCharacteristicsModalVisible,setIsCharacteristicsModalVisible] = useState<boolean>(false)
    //

    console.log(query)

    const [isThereFileError,setIsThereFileError] = useState(false)

    const [photoUrl,setPhotoUrl] = useState("")

    const [photo,setPhoto] = useState(null)

    const {data:dataOfRecipe,isLoading,isSuccess} = useGetRecipeForEditQuery(query.id,{skip:!Boolean(query.id)})
    
    const dispatch = useAppDispatch()
    
    const handleCloseCharacteristicsModal = () => setIsCharacteristicsModalVisible(false)

    const [editRecipe,{isLoading:isLoadingEditRecipe,isSuccess:isSuccessEditRecipe,isError:isErrorEditRecipe,}] = useEditRecipeMutation()



    const schema = yup
    .object({
             nameOfRecipe: yup.string()
                      .required("Пожалуйста введите название рецепта!")
                      .min(2,"Введите больше 2 символов")
                      .max(30,"Введите меньше 30 символов"),
             description:yup.string()
                      .required("Пожалуйста введите описание рецепта!")
                      .min(5,"Пожалуйста введите больше 5 символов")
                      .max(350,"Пожалуйста введите меньше 350 символов"),
             isVegan:yup.boolean(),
             isHalal:yup.boolean(),
           
           })
           .required()

           const {
            register,
            handleSubmit,
            setValue,
            watch,
            control,
            reset,
            formState: { errors,touchedFields },
          } = useForm({
            resolver: yupResolver(schema),
            defaultValues:{
                nameOfRecipe:"",
                description:"",
                isHalal:false,
                isVegan:false
            },values:{
                nameOfRecipe:dataOfRecipe?.title ,
                description:dataOfRecipe?.description,
                isHalal:dataOfRecipe?.isHalal,
                isVegan:dataOfRecipe?.isVegan,
            }
          })

          
    useEffect(() => {

        if(isSuccessEditRecipe || isErrorEditRecipe){
            setIsMessageModalVisible(true)
            console.log("EDITED RECIPES")
        }

        if(isMessageModalVisible){
            const timeoutId = setTimeout(() => {
                setIsMessageModalVisible(false);
                if(isSuccessEditRecipe || isErrorEditRecipe){
                  location.reload()
                }
                
              }, 1500);
            
              return () => clearTimeout(timeoutId);
        }

      

    },[
        isSuccessEditRecipe,isErrorEditRecipe,isMessageModalVisible
    ]) 

    useEffect(() => {

        if(isSuccess){

            dispatch(recipeActions.setRecipeCharacteristics({
                                                             type:{
                                                                name:dataOfRecipe.type.name,
                                                                id:dataOfRecipe.type.id
                                                             },
                                                             nationalCuisine:{
                                                                name:dataOfRecipe.nationalCuisine.name,
                                                                id:dataOfRecipe.nationalCuisine.id
                                                             },
                                                             holiday:{
                                                                name:dataOfRecipe.holiday.name,
                                                                id:dataOfRecipe.holiday.id
                                                             },
                                                             steps:dataOfRecipe.steps,
                                                             ingredients:dataOfRecipe.ingredients
                                                            }))

        }

    },[isSuccess])

    const handleImageChange = (e:any) => {
        const file = e.target.files[0];
      
        if (file) {
            if(file.size <= 3000000){
                    setIsThereFileError(false)
                    const imageUrl = URL.createObjectURL(file);
                    setPhotoUrl(imageUrl);
                    setPhoto(file)
            }else{
                setIsThereFileError(true)
            }
        }
      };

    const onSubmit = (data:any,e:any) => {
        e.preventDefault()
  
        if(e.target.id === 'post-recipe'){
  
            if(steps.length == 0){
              setIsMessageModalVisible(true)
              setIsStepErrorVisible(true)
            }
            if(ingredients.length == 0) {
              setIsMessageModalVisible(true)
              setIsIngredientErrorVisible(true)
            }
            if(!holiday.name){
              setIsMessageModalVisible(true)
              setIsHolidayErrorVisible(true)
            }
            if(!type.name){
              setIsMessageModalVisible(true)
              setIsTypeErrorVisible(true)
            }
            if(!nationalCuisine.name){
              setIsMessageModalVisible(true)
              setIsNationalCuisineErrorVisible(true)
            }
  
            if(steps.length >= 1 && ingredients.length >= 1 && nationalCuisine.name && type.name && holiday.name){
              const {nameOfRecipe,description,isHalal,isVegan} = data
            
              const formData = new FormData()
            
              formData.append('title',nameOfRecipe)
              formData.append('description',description)
              formData.append('isHalal',JSON.parse(isHalal))
              formData.append('isVegan',JSON.parse(isVegan))
              formData.append('steps',JSON.stringify(steps))
              formData.append('ingredients',JSON.stringify(ingredients))
              formData.append('typeId',type.id),
              formData.append('holidayId',holiday.id),
              formData.append('nationalCuisineId',nationalCuisine.id)
            
              if(photo){
                formData.append('img',photo)
                formData.append('pastNamePhoto',dataOfRecipe?.img)
      
              }
            
              editRecipe({id:query.id,formData,mustEdit:query.mustEdit})

              reset()
  
              dispatch(recipeActions.resetRecipe())
  
             

            }
        }
      }
    return (
        <>
            
            <div className="flex flex-col items-center mb-10">

                        <h1 className="text-xl mb-5">Редактирование рецепта!</h1>
                        <form id="post-recipe" onSubmit={handleSubmit(onSubmit)} className="">
                                <div>
                                    <input type="text" 
                                           {...register('nameOfRecipe')}
                                           className="border-2 rounded-lg px-3 py-1 mb-3" 
                                           placeholder="Добавте название"/>
                                    {errors.nameOfRecipe && <span className="block mb-2">{errors.nameOfRecipe.message}</span>}
                                </div>
                                <div className="mb-2">
                                    <textarea placeholder="Добавте описание рецепта..." 
                                              className="py-2 px-2 border-2 rounded-lg"
                                              {...register('description')}
                                              id="" 
                                              cols={30} 
                                              rows={10}>            
                                    </textarea>
                                    {
                                      errors.description && <span className="block mb-2">{errors.description.message}</span>
                                    }
                                </div>
                                <div className="mb-5 ">

                                   {isLoading && <p>Загрузка фотографии...</p>}
                                    {
                                        isSuccess && !photo && <img className="w-72 h-82 border-2 mb-5" src={`http://localhost:5000/${dataOfRecipe.img}`} alt="" />
                                    }

                                    {
                                        isSuccess && photo && <img className="w-72 h-82 border-2 mb-5" src={photoUrl} alt="фото рецепта" />
                                    }
                                        {isThereFileError && <p className="mb-2">пожалуйста выберите файл меньше 3 мегабайт</p>}
                                        <input onChange={handleImageChange} type="file"  />

                                </div>
                                <div className="mb-5 ">
                                    <div>
                                        <input {...register("isHalal")} type="checkbox" className="mr-2" />
                                        <span>Ваше блюдо Халяль?</span>
                                    </div>
                                    <div>
                                        <input {...register("isVegan")} type="checkbox" className="mr-2" />
                                        <span>Ваше блюдо Веганское?</span>
                                    </div>
                                </div>

                                <IngredientAndStepsEditorTabs/>

                                <button onClick={() => setIsCharacteristicsModalVisible(true)} type="button" className="mx-auto block mb-7 border-2 p-2 rounded-lg">Добавить характеристики.</button>

                                <button className="border-2 px-12 py-2 text-lg rounded-lg" type="submit">Отправить рецепт!</button>

                        </form>
            </div>
            <MessagesModal isOpen={isMessageModalVisible} reasons={{
                                                        isTypeErrorVisible:isTypeErrorVisible,
                                                        isStepErrorVisible:isStepErrorVisible,
                                                        isNationalCuisineErrorVisible:isNationalCuisineErrorVisible,
                                                        isHolidayErrorVisible:isHolidayErrorVisible,
                                                        isIngredientErrorVisible:isIngredientErrorVisible,
                                                        isError:isErrorEditRecipe,
                                                        isSuccess:isSuccessEditRecipe
                                                      }} messages={{
                                                        errorMessage:"Не удалось отредактировать рецепт!",
                                                        successMessage:"Вы успешено отредактировали рецепт!"
                                                      }}
       />
         <CharacteristicsRecipeModal 
                                isOpen={isCharacteristicsModalVisible} 
                                handleCloseModal={handleCloseCharacteristicsModal}
                                addHoliday={(e:any) => dispatch(recipeActions.addHoliday({name:e.target.innerHTML,id:e.target.id}))}
                                addType={(e:any) => dispatch(recipeActions.addType({name:e.target.innerHTML,id:e.target.id}))}
                                addNationalCuisine={(e:any) => dispatch(recipeActions.addNationaCuisine({name:e.target.innerHTML,id:e.target.id}))}
                                typeModal="postRecipeModal"
       />
        </>
    )

}

export default EditRecipe