import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import EmployeeAPI from "../API.Interaction/EmployeeAPI";
import AlertContext from "../Contexts/AlertContext";
import AuthContext from "../Contexts/AuthContext";

export default function () {


    const {setAlert} = useContext(AlertContext);
    const {setLoggedUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const [inputs, setInputs] = useState<{email: string, password: string}>({
        email: "", password: ""
    });

    const changeInput = (event: any) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };

    const submitForm = (event: any) => {

        event.preventDefault();

        let result = EmployeeAPI.byEmailPassword(inputs.email, inputs.password);

        if(result == null) {
            setAlert("user not found", "danger");
            return;
        }

        setLoggedUser(result);
        navigate("/list");

    };

    return (
        <div className="row w-100 m-0">
            
            <div className="col bg-antique d-flex justify-content-center" style={{height: "100vh"}}>
                <img src="./developer.png" alt="image"/>
            </div>
            <div className="col bg-blue-black" style={{height: "100vh", overflow: "auto"}}>

                <h3 className="login-register-text">
                    Not Registered? <span onClick={() => navigate("/register")} className="acent_text">Create an account</span>
                </h3>

                <form onSubmit={submitForm} className="w-100 login-form" style={{margin: "auto 0"}}>

                    <h3 className="login-second-text acent_text">Welcome back!</h3>
                    <h3 className="login-second-text mb-4">Login to your account</h3>

                    <div className="input-group mb-3">
                        <span className="login-input-label">Email</span>
                        <input type="email" onChange={changeInput} name="email" className="custom-input rounded" placeholder="Email Address"/>
                    </div>
                    <div className="input-group mb-4">
                        <span className="login-input-label">Password</span>
                        <input type="password" onChange={changeInput} className="custom-input rounded" name="password" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn custom-button-flat btn-block mb-3">
                        Sign In
                    </button>

                    <a href="#" className="acent_text login-forgot-password">Forget Password</a>

                    <div className="mt-5">
                        <h5 className="card-title">Login Using </h5>
                        <div className="d-flex">
                            <img src="./logos/google.jpg" className="mr-1" alt="logo" style={{width: "30px"}}/>
                            <img src="./logos/microsoft.png" className="mr-1" alt="logo" style={{width: "30px"}}/>
                            <img src="./logos/facebook.jpeg" className="mr-1" alt="logo" style={{width: "30px"}}/>
                        </div>
                    </div>

                </form>

            </div>

        </div>
    );

};