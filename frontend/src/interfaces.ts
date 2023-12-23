import { ChangeEvent,MouseEventHandler } from "react"


export type initialStateAuthorization = {
    isAuth:boolean,
    isBanned:boolean,
}


export type IRecipeItemProps = {
    title:string,
    img:string,
    authorId:number,
    authorName:string,
    link:string
}

export type IRecipeModal = {
    handleCloseModal: () => void,
    isOpen:boolean,
    addType:(e:any) => void,
    addHoliday:(e:any) => void,
    addNationalCuisine:(e:any) => void,
    typeModal:string,

    
}

export type IListOfCharacteristics = {
    items:[],
    countPages:number,
    page:number,
    onHandleChangePage:(e:any,page:number) => void,
    onAddCharacteristic:(event:any) => void
}

export type IItemOfCharacteristics = {
    id:number,
    name:string,
    onAddCharacteristic:(event:any) => void
}

export type ICharacteristic = {
    name:string | null,
    id:string
}

export interface IinitialStateCharacteristics  {
    types:ICharacteristic[],
    holidays:ICharacteristic[],
    nationalCuisines:ICharacteristic[],
 
    isHalal:boolean,
    isVegan:boolean,
}

export interface IIngredient {
    name:string,
    id?:string
}

export interface IStep {
    name:string,
    id?:string
}

export interface IinitialStateRecipe {
    ingredients:IIngredient[],
    steps:IStep[],
    type:{
        name:string,
        id:string,  
    },
    holiday:{
        name:string,
        id:string,  
    },
    nationalCuisine:{
        name:string,
        id:string,  
    },
}

export type IRecipe = {
        authorId:number,
        authorName:string,
        title:string,
        description:string,
        holidayName:string,
        typeName:string,
        nationalCuisine:string,
        id:string,
        img:string,
        ingredients:[],
        steps:[],
        link:string,
        isHalal:boolean,
        isVegan:boolean,
  
}


export type IRecipeList = {
    data:IRecipe[]
}

export type IChoosedOptionsList = {
    onRemoveCharacteristic:(e:any) => void,
    characteristics:ICharacteristic[]
}

export interface IOptionsModal {
    isOpen:boolean,
    onHandleCloseModal: () => void
}

export interface IErrorModal {
    isOpen:boolean,
    errors:{
        isTypeErrorVisible:boolean,
        isHolidayErrorVisible:boolean,
        isNationalCuisineErrorVisible:boolean,
        isIngredientErrorVisible:boolean,
        isStepErrorVisible:boolean,
    }
}

export interface IAddCharacteristicsModal {
    isOpen:boolean,
    onHandleCloseModal:() => void
}

export interface ICharacteristicTab {
    addType:(e:any) => void,
    addNationalCuisine:(e:any) => void,
    addHoliday:(e:any) => void,
    type:string
}

export interface ICharacteristcsList {
    addCharacteristic:(e:any) => void
}

export interface IRecipeCharacteristicTab {
    name:string,
    id:string
}

export interface IRecipes {
    isLoading:boolean,
    isSuccess:boolean,
    children:React.ReactNode,
    handleChangePage:(_:any,page:number) => void,
    handleChangeValue:(e:any) => void
    countPages:number,
    page:number
}

export interface IUserRecipeProps {
    title:string,
    img:string,
    authorId:number,
    authorName:string,
    isRejected:boolean,
    isPending:boolean,
    id:string
}