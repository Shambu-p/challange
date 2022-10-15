import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import AlertContext from "../Contexts/AlertContext";
import AuthContext from "../Contexts/AuthContext";
import Employees from "../Models/Employees";
import EmployeeAPI from "../API.Interaction/EmployeeAPI";

export default function () {

    const {setAlert} = useContext(AlertContext);
    const {setLoggedUser, loggedUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const [inputs, setInputs] = useState<Employees>({
        id: 0, first_name: "", last_name: "", gender: "male", email: "", password: "password"
    });

    const changeInput = (event: any) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };

    const formSubmit = (event: any) => {

        event.preventDefault();

        let result = EmployeeAPI.createEmployee(inputs);
        if(result == null) {
            setAlert("cannot create user", "danger");
            return;
        }

        setAlert("user created successfully!", "success");
        navigate("/");

    };

    return (
        <div className="row w-100 m-0">

            <div className="col bg-antique d-flex justify-content-center" style={{height: "100vh"}}>
                <img src="/developer.png" alt="image"/>
            </div>
            <div className="col bg-blue-black" style={{height: "100vh"}}>

                <form onSubmit={formSubmit} className="w-100 login-form pt-4" style={{margin: "auto 0"}}>
                    <h3 className="login-second-text acent_text">Hello!</h3>
                    <h3 className="login-second-text mb-4">Create your Employee account</h3>

                    <div className="input-group mb-3">
                        <span className="login-input-label">First Name</span>
                        <input onChange={changeInput} name="first_name" type="text" className="custom-input rounded" placeholder="First Name" required={true} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="login-input-label">Last Name</span>
                        <input onChange={changeInput} name="last_name" type="text" className="custom-input rounded" placeholder="Last Name" required={true} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="login-input-label">Email</span>
                        <input onChange={changeInput} name="email" type="email" className="custom-input rounded" placeholder="Email Address" required={true} />
                    </div>
                    <div className="input-group mb-4">
                        <span className="login-input-label">Gender</span>
                        <select className="custom-input rounded" onChange={changeInput} name="gender" required={true} >
                            <option value="male" selected={true}>Male</option>
                            <option value="female">FeMale</option>
                        </select>
                    </div>

                    <button type="submit" className="btn custom-button-flat btn-block mb-3" >
                        Register
                    </button>

                </form>
            </div>

        </div>
    );

};