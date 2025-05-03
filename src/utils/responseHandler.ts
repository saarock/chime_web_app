// Import all the necessary dependencies

import { AxiosResponse } from "axios"


/**
 * 
 * @param response - The axios response object
 * @param method - A string indicating which method or API call was made Like post, get , like that 
 * @returns 
 */
const responseHandler = (response: AxiosResponse<any>, method:string) => {
    
    switch(response.status) {
        case 200:
            return response.data.data;
        case 400: 
            throw new Error(`${method} method not found`);
        default:
            throw new Error("Something wrong ")
  
        }


}


export default responseHandler;