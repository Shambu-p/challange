import {Authorized} from "./api";
import Employees from "../Models/Employees";

export default class EmployeeAPI {

    public static db: Employees[] = [
        {
            id: 1,
            first_name: "Ayele",
            last_name: "Balcha",
            email: "ayele@absoft.net",
            gender: "male",
            password: "password"
        }
    ];

    public static current_id: number = 2;

    static _(f_name: string, l_name: string, email: string, gender: ("male"|"female"), password: string, id?: number): Employees {
        return {
            first_name: f_name,
            last_name: l_name,
            email: email,
            gender: gender,
            password: password,
            id: (id ? id : 0)
        };
    }

    static getAll(): Employees[] {
        return EmployeeAPI.db;
    }

    /**
     * single employee detail information
     * @param id
     *      employee id number
     */
    static employeeDetail(id: number): (Employees | null) {

        let result = EmployeeAPI.db.filter(e => (e.id == id));

        return (result.length > 0) ? result[0] : null;

    }

    static byEmailPassword(email: string, password: string): (Employees | null) {

        let result = EmployeeAPI.db.filter(e => (e.email == email && e.password == password));

        return (result.length > 0) ? result[0] : null;

    }

    static createEmployee(user: Employees): (Employees|null) {
        user.id = EmployeeAPI.current_id;
        EmployeeAPI.db.push(user);
        EmployeeAPI.current_id += 1;
        return user;
    }

    static updateEmployee(user: Employees): (Employees|null) {

        let found: (Employees | null) = EmployeeAPI.employeeDetail(user.id);

        if(found == null){
            return null;
        }

        let result = EmployeeAPI.db.filter(e => (e.id != user.id));

        result.push(user);

        return user;

    }

    static deleteEmployee(id: number) {
        EmployeeAPI.db = EmployeeAPI.db.filter(e => (e.id != id));
    }

}