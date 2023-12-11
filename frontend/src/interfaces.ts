

export type initialStateAuthorization = {
    isAuth:boolean,
    isBanned:boolean,
}


export type IRecipeItemProps = {
    title:string,
    img:string,
    link:string
}

export type IFilterRecipeModal = {
    handleCloseFilterModal: () => void,
    isOpen:boolean,
}

export type IListOfCharacteristics = {
    items:[],
    countPages:number,
    page:number,
    handleChangePage:(e:any,page:number) => void,
    
}

export type IItemOfCharacteristics = {
    id:number,
    name:string,
}

export type ICharacteristic = {
    name:string,
    id:string
}

export type IinitialStateCharacteristics = {
    types:ICharacteristic[],
    holidays:ICharacteristic[],
    nationalCuisines:ICharacteristic[],
    isHalal:boolean,
    isVegan:boolean
}

