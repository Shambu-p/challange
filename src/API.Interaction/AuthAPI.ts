import {Authorized, normal} from "./api";
import EmployeeAPI from "./EmployeeAPI";
import Employees from "../Models/Employees";

export function Login(email: string, password: string): (Employees|null) {
    return EmployeeAPI.byEmailPassword(email, password);
}

export async function information(token: string) {

    try{

        let response = await Authorized(token).bodyRequest("get", "api/Auth/authorization");
        
        return {
            status: true,
            data: {...response, token: token}
        };

    }catch ({message}){
        console.log(message);
    }

    return {
        status: false,
        data: null
    };

}

export async function createUser(token: string, user_data: {
    name: string,
    email: string,
    password: string,
}) {
    try{
        let response = await Authorized(token).bodyRequest("post", "/Users/create", user_data);
    }catch(error){
        throw error;
    }
}
