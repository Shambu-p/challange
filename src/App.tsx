import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {information} from "./API.Interaction/AuthAPI";
import AlertContext from "./Contexts/AlertContext";
import AuthContext from "./Contexts/AuthContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Error from "./Views/Error";
import Alert from "./Components/Alert";
import Waiting from "./Components/Waiting";
import Home from "./Views/Home";
import Register from "./Views/Register";
import EmployeeDetail from "./Views/EmployeeDetail";

function App() {

    const [loggedUser, setLoggedUser] = useState<any | null>(null);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [cookies, setCookie, removeCookie] = useCookies(["login_token"]);
    const [authWaiting, setAuthWaiting] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showWaiting, setWaiting] = useState<boolean>(false);
    const [alertType, setAlertType] = useState < "success" | "danger" | "warning" | "info" | "primary" > ("danger");
    const [alertMessage, setMessage] = useState<string>("");

    useEffect(() => {

        const checkAuth = async (token: string) => {

            setTimeout(() => {
                setAuthWaiting(true);
            }, 1);
            let response = await information(token);
            setLoggedUser(response.data);
            setAuthWaiting(false);
            setLoggedIn(response.status);

        };

        if (cookies.login_token && cookies.login_token != "") {
            checkAuth(cookies.login_token);
        }


    }, []);

    const setAlert = (
        message: string,
        type: "success"|"danger"|"warning"|"primary"|"info"
    ) => {

        setAlertType(type);
        setShowAlert(true);
        setMessage(message);

        setTimeout(() => {
            setShowAlert(false);
        }, 3000);

    };

    return (
        <AlertContext.Provider
            value={{
                showAlert,
                alertType,
                setAlertType,
                setAlert
            }}
        >
            <AuthContext.Provider
                value={{
                    isLoggedIn,
                    loggedUser,
                    setLoggedUser,
                    setLoggedIn,
                    authWaiting
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/register" element={<Register />}/>
                        <Route path="/list" element={<EmployeeDetail />}/>
                        <Route path="*" element={<Error/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
            {showAlert ? (<Alert message={alertMessage} color={alertType} />) : ""}
        </AlertContext.Provider>

    );
}

export default App;

//{SideBar ? (<SideBarComponent/>) : <></>}
//{isLoggedIn ? (<Route path="/items" element={<Items />} />) : (<></>)}

/*
{showAlert ? (<Alert message={alertMessage} color={alertType} />) : ""}
            {showWaiting ? (<Waiting/>) : ""}
*/