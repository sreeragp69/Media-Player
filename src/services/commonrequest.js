import axios, { Axios } from "axios";


//function definition commonrequest
export const commonRequest = async (method, url, body) => {

    //request config

    let reqconfig = {
        url,
        method,
        data: body,
        headers: {
            "content-type": "application/json"
            //  multipart form data
        }
    }

    // API   call using AXIOS library

    return await axios(reqconfig).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    })
}