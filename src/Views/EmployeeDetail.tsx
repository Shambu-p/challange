import React, {useContext, useEffect, useState} from "react";
import EmployeeComponent from "../Components/EmployeeComponent";
import Employees from "../Models/Employees";
import EmployeeAPI from "../API.Interaction/EmployeeAPI";
import AlertContext from "../Contexts/AlertContext";
import AuthContext from "../Contexts/AuthContext";
import {useNavigate} from "react-router-dom";

export default function () {

    const {setAlert} = useContext(AlertContext);
    const {setLoggedUser, loggedUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const [employeeList, setEmployeeList] = useState<Employees[]>([]);

    useEffect(() => {

        if(!loggedUser){
            setAlert("login first", "warning");
            navigate("/");
            return;
        }

        setEmployeeList(EmployeeAPI.getAll());

    }, []);

    const empUpdate = (employee: Employees) => {
        let result = EmployeeAPI.updateEmployee(employee);
        if(!result){
            setAlert("not updated", "danger");
            return;
        }
    };

    const deleteAction = (id: number) => {
        EmployeeAPI.deleteEmployee(id);
    };

    return (
        <div className="bg-blue-black employee-detail-container">

            <h2 className="employee-detail-title">Employee Detail</h2>
            <div className="bg-antique p-3">
                {
                    employeeList.map(emp => (
                        <EmployeeComponent key={emp.id} change={empUpdate} employee={emp} onRemove={deleteAction} />
                    ))
                }
            </div>

        </div>
    );
}