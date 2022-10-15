import axios, { AxiosInstance } from "axios";

const props: any = {
    baseURL: "https://localhost:7213/",
    headers: {}
};

const api = axios.create(props);

const rest: {
    api: AxiosInstance|null, 
    bodyRequest: Function, 
    formRequest: Function, 
    prepareData: Function
} = {

    api: axios.create(props),

    bodyRequest: async (type: ("post"|"get"|"put"|"delete"), route: string, request_data?: any) => {
        try {

            let response;
            switch (type) {
                case "post":
                    response = await rest.api?.post(route, request_data ? request_data : {});
                    break;
                case "put":
                    response = await rest.api?.put(route, request_data ? request_data : {});
                    break;
                case "delete":
                    response = await rest.api?.delete(route);
                    break;
                default:
                    response = await rest.api?.get(route);
                    break;
            }
    
            return response ? response.data : {};
    
        }catch(error){
            throw error;
        }
    },

    formRequest: async (type: string, route: string, request_data?: (object | FormData)) => {
        try {
            let data = request_data ? rest.prepareData(request_data) : new FormData();
            return rest.bodyRequest(type, route, data);
        }catch(error){
            throw error;
        }
    },

    prepareData: (request_data: any): FormData => {

        if(typeof request_data !== "object"){
            return new FormData();
        }
    
        let req_data = new FormData();
        let arr = Object.keys(request_data);
    
        if(arr.length > 0){
            arr.forEach(key => {req_data.append(key, request_data[key])});
        }
    
        return req_data;
    
    }

};

export function Authorized(token: string){

    props.headers["Authorization"] = token;
    rest.api = axios.create(props);
    return rest;

}

export function normal(){
    rest.api = axios.create(props);
    return rest;
}

/**
 *
 * @param type
 * @param url
 * @param request_data
 * @constructor
 */
export async function Request(type: string, url: string, request_data?: (object | FormData)) {
    try {

        let data = request_data ? prepareData(request_data) : new FormData();
        let response = ((type == "post") ? await api.post(url, data) : await api.get(url));
        if(response.data.message || response.data.message == ""){
            throw new Error(response.data.message);
        }

        return response.data;

    }catch(error){
        throw error;
    }
}

function prepareData(request_data: any): FormData{

    if(typeof request_data !== "object"){
        return new FormData();
    }

    let req_data = new FormData();
    let arr = Object.keys(request_data);

    if(arr.length > 0){
        arr.forEach(key => {req_data.append(key, request_data[key])});
    }

    return req_data;

}

export default api;