import Employees from "../Models/Employees";
import * as React from "react";
import EmployeeAPI from "../API.Interaction/EmployeeAPI";
import {useState} from "react";
import {useContext} from "react";
import AlertContext from "../Contexts/AlertContext";

export default function ({employee, change, onRemove} : {change: (param: Employees) => void, onRemove: (param: number) => void, employee: Employees}) {

    const {setAlert} = useContext(AlertContext);

    const [isDisplay, setIsDisplay] = useState<boolean>(true);
    const [inputs, setInputs] = useState<Employees>(employee);

    const changeInput = (event: any) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };

    const deleteAction = () => {
        onRemove(employee.id);
    };

    const changeAction = (event: any) => {

        event.preventDefault();

        change(inputs);
        setIsDisplay(true);

    };

    return isDisplay ? (
        <div className="d-flex justify-content-between employee-component shadow mb-3">
            <div className="user-image-container d-flex bg-accent">
                <i className="bi bi-person-fill text-white" style={{fontSize: "30px", margin: "auto auto"}} />
            </div>
            <span>{inputs.first_name}</span>
            <span>{inputs.last_name}</span>
            <span>{inputs.email}</span>
            <span>{inputs.gender}</span>
            <span className="d-flex justify-content-between">
                <i className="bi bi-pencil-fill text-success mr-3" onClick={() => setIsDisplay(false)} style={{fontSize: "25px"}} />
                <i className="bi bi-trash-fill text-danger" onClick={deleteAction} style={{fontSize: "25px"}} />
            </span>
        </div>
    ) : (
        <form onSubmit={changeAction} className="d-flex justify-content-between employee-component shadow mb-3">
            <div className="user-image-container d-flex bg-accent">
                <i className="bi bi-person-fill text-white" style={{fontSize: "30px", margin: "auto auto"}} />
            </div>
            <input type="text" value={inputs.first_name} name="first_name" onChange={changeInput}/>
            <input type="text" value={inputs.last_name} name="last_name" onChange={changeInput}/>
            <input type="text" value={inputs.email} name="email" onChange={changeInput}/>
            <select name="gender" onChange={changeInput} >
                <option value="male" selected={inputs.gender == "male"}>Male</option>
                <option value="female" selected={inputs.gender == "female"}>Female</option>
            </select>

            <span className="d-flex justify-content-between">
                <button type="submit" className="btn custom-button-flat btn-block" >
                    Update
                </button>
            </span>
        </form>
    );
}