
import { useEffect, useState, useRef ,MutableRefObject} from "react"

import { useForm, SubmitHandler,Controller } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"

import Image from "next/image"

import defualtPhoto from '../../public/defualtphoto.png'

import IngredientAndStepsEditorTabs from '@/components/UI/IngredientAndStepsEditorTabs'

import * as yup from "yup"

import ErrorModal from '@/components/Modals/ErrorModal'
import { useAppSelector } from "@/store/hooks"

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
                                formState: { errors,touchedFields },
                              } = useForm({
                                resolver: yupResolver(schema),
                              })
                          
                              const [isIngredientErrorVisible,setIsIngredientErrorVisible] = useState(false) 

                              const [isStepErrorVisible,setIsStepErrorVisible] = useState(false) 
                              
                              const [isHolidayErrorVisible,setIsHolidayErrorVisible] = useState(false) 

                              const [isNationalCuisineErrorVisible,setIsNationalCuisineErrorVisible] = useState(false) 

                              const [isTypeErrorVisible,setIsTypeErrorVisible] = useState(false) 

    const {steps,ingredients,holiday,type,nationalCuisine} = useAppSelector(state => state.recipe)
    
    const [isHolidayModalVisible,setIsHolidayModalVisible] = useState<boolean>(false)

    const [isTypeModalVisible,setIsTypeModalVisible] = useState<boolean>(false)

    const [isNationalCuisineModalVisible,setIsNationalCuisineModalVisible] = useState<boolean>(false)
    
    

    const onSubmit = (data:any,e:any) => {
      e.preventDefault()
  
      if(steps.length == 0){
        setIsStepErrorVisible(true)
      }
      if(ingredients.length == 0) {
        console.log("dadasdas")
        setIsIngredientErrorVisible(true)
      }
      if(steps.length >= 1 && ingredients.length >= 1){
        const {nameOfRecipe,description,isHalal,isVegan,photo:[file]} = data
        const recipe = {
          nameOfRecipe,
          description,
          isHalal,
          isVegan,
          steps,
          ingredients,
          file
        }
        console.log(recipe)
      }
    }

    useEffect(() => {
        if(isIngredientErrorVisible){
            const timeoutId = setTimeout(() => {
              setIsIngredientErrorVisible(false);
            }, 1000);
          
            return () => clearTimeout(timeoutId);
        }
    },[isIngredientErrorVisible])

    useEffect(() => {
      if(isStepErrorVisible){
          const timeoutId = setTimeout(() => {
            setIsStepErrorVisible(false);
          }, 1500);
        
          return () => clearTimeout(timeoutId);
      }
  },[isStepErrorVisible])


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
                <div className="flex flex-col items-center">
                  <button type="button" onClick={() => setIsNationalCuisineModalVisible(true)} className="block mb-2 border-2 w-4/5 py-2 rounded-lg">Добавить Тип</button>
                  <button type="button" onClick={() => setIsHolidayModalVisible(true)} className="block mb-2 border-2 w-4/5 py-2 rounded-lg">Добавить праздник</button>
                  <button type="button" onClick={() => setIsTypeModalVisible(true)} className="block mb-5 border-2 w-4/5 py-2 rounded-lg">Добавить Национальную кухню</button>
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

                 <button type="submit" className="border-2 px-12 py-2 text-lg rounded-lg">submit</button>       
            </form>
        </div>
      <ErrorModal isOpen={isIngredientErrorVisible || isStepErrorVisible} errors={[isIngredientErrorVisible,isStepErrorVisible]}/>
    </> 
    )


}

export default PostRecipe