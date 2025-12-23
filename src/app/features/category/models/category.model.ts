export interface AddCategoryRequest{
    name:string;
    urlHandle : string;
}

export interface UpdateCategoryRequest{
    name:string;
    urlHandle : string;
}


export interface Category{
    id:string;
    name:string;
    urlHandle : string;
}