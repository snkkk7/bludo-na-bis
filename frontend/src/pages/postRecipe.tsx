
import { useEffect, useState, useRef ,MutableRefObject} from "react"

import { useForm, SubmitHandler,Controller } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"

import Image from "next/image"

import defualtPhoto from '../../public/defualtphoto.png'

import IngredientAndStepsEditorTabs from '@/components/Tabs/IngredientAndStepsEditorTabs'

import * as yup from "yup"

import MessagesModal from '@/components/Modals/MessagesModal'

import CharacteristicsRecipeModal from "@/components/Modals/CharacteristicsRecipeModal"

import { useAppSelector,useAppDispatch } from "@/store/hooks"

import {recipeActions} from "@/store/recipeSlice"

import {usePostRecipeMutation} from "@/store/recipesApi"



const PostRecipe = () => {

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
                              photo:yup.mixed()
                                        .test("require","пожалуйста добавте фотографию",(value:any) => {
                                            if(!value) return false
                                            if(value) return true
                                        }),
                              isVegan:yup.boolean(),
                              isHalal:yup.boolean(),
                                
                                        // .test('fontSize','файл слишком большой. Максимальный размер: 3 МБ',(value:any) => {
                                        //     if (!value) return false; // Разрешаем отсутствие файла

                                        //     console.log(value)

                                        //     return value[0]?.size <= 3 * 1024 * 1024; // 
                                        // })
                                  
                            
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
                              })
                          
    const [isErrorModalVisible,setIsErrorModalVisible] = useState(false)

    const [isIngredientErrorVisible,setIsIngredientErrorVisible] = useState(false) 

    const [isStepErrorVisible,setIsStepErrorVisible] = useState(false) 
                              
    const [isTypeErrorVisible,setIsTypeErrorVisible] = useState(false)

    const [isNationalCuisineErrorVisible,setIsNationalCuisineErrorVisible] = useState(false)                         

    const [isHolidayErrorVisible,setIsHolidayErrorVisible] = useState(false)                          

    const {steps,ingredients,holiday,type,nationalCuisine} = useAppSelector(state => state.recipe)
   
    const [isCharacteristicsModalVisible,setIsCharacteristicsModalVisible] = useState<boolean>(false)

    const handleCloseCharacteristicsModal = () => setIsCharacteristicsModalVisible(false)
    
    const dispatch = useAppDispatch()
    
    const recipeStore = useAppSelector(state => state.recipe)

    const [postRecipe,{isLoading,isSuccess,isError}] = usePostRecipeMutation()

    const onSubmit = (data:any,e:any) => {
      e.preventDefault()

      if(e.target.id === 'post-recipe'){

          if(steps.length == 0){
            setIsErrorModalVisible(true)
            setIsStepErrorVisible(true)
          }
          if(ingredients.length == 0) {
            setIsErrorModalVisible(true)
            setIsIngredientErrorVisible(true)
          }
          if(!holiday.name){
            setIsErrorModalVisible(true)
            setIsHolidayErrorVisible(true)
          }
          if(!type.name){
            setIsErrorModalVisible(true)
            setIsTypeErrorVisible(true)
          }
          if(!nationalCuisine.name){
            setIsErrorModalVisible(true)
            setIsNationalCuisineErrorVisible(true)
          }

          if(steps.length >= 1 && ingredients.length >= 1 && nationalCuisine.name && type.name && holiday.name){
            const {nameOfRecipe,description,isHalal,isVegan,photo:[file]} = data
          
            const formData = new FormData()
          
           
            formData.append('title',nameOfRecipe)
            formData.append('description',description)
            formData.append('isHalal',isHalal)
            formData.append('isVegan',isVegan)
            formData.append('steps',JSON.stringify(steps))
            formData.append('ingredients',JSON.stringify(ingredients))
            formData.append('img',file)
            formData.append('typeId',recipeStore.type.id),
            formData.append('holidayId',recipeStore.holiday.id),
            formData.append('nationalCuisineId',recipeStore.nationalCuisine.id)
          
            postRecipe(formData)
          
            reset()

            dispatch(recipeActions.resetRecipe())

          }
      }
    }

    useEffect(() => {
        if(isErrorModalVisible){
            const timeoutId = setTimeout(() => {
              setIsErrorModalVisible(false);
              setIsTypeErrorVisible(false)
              setIsIngredientErrorVisible(false)
              setIsHolidayErrorVisible(false)
              setIsStepErrorVisible(false)
              setIsNationalCuisineErrorVisible(false)
            }, 3000);
          
            return () => clearTimeout(timeoutId);
        }
    },[isErrorModalVisible])




    return (
     <>
        <div className="flex flex-col items-center mb-10">

            <h3 className="text-center text-xl mb-5">
                Добавте Рецепт!
            </h3>
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
                <div className="mb-5">
                    {
                        !watch().photo && <Image className="mb-3 border-4" alt="defualt photo" src={defualtPhoto}/>
                    }
                <Controller
                 name="photo"
                 control={control}
                 render={({ field }) => (
                   <>
                     {/* Инпут для загрузки фото */}
                     <input
                       className="mb-2"
                       type="file"
                       
                       {...register('photo')}
                       onChange={(e) => {
                         // Установка значения поля при выборе файла
                         field.onChange(e.target.files[0]);
                       }}
                     />
                     {/* Предположим, что фото будет отображено после выбора */}
                     {field.value && <img className="w-72 h-82" src={URL.createObjectURL(field.value)} alt="defult photo" />}
                   </>
                 )}
                />       
                {errors.photo && <span className="block">{errors.photo.message}</span>}               
                </div>
                
                 <IngredientAndStepsEditorTabs/>

                 <button onClick={() => setIsCharacteristicsModalVisible(true)} type="button" className="mx-auto block mb-7 border-2 p-2 rounded-lg">Добавить характеристики.</button>

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

                 <button id="post-recipe" type="submit" className="border-2 px-12 py-2 text-lg rounded-lg">submit</button>       
            </form>
        </div>
      <MessagesModal isOpen={isErrorModalVisible} reasons={{
                                                        isTypeErrorVisible:isTypeErrorVisible,
                                                        isStepErrorVisible:isStepErrorVisible,
                                                        isNationalCuisineErrorVisible:isNationalCuisineErrorVisible,
                                                        isHolidayErrorVisible:isHolidayErrorVisible,
                                                        isIngredientErrorVisible:isIngredientErrorVisible,
                                                        isSuccess:isSuccess,
                                                        isError:isError,
                                                      }
                                                      }
                                                      messages={{
                                                        errorMessage:"Не удалось отредактировать рецепт!",
                                                        successMessage:"Вы успешно отправили рецепт!"
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

export default PostRecipe