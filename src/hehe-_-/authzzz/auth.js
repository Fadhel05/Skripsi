import axios from "axios";
import { createContext, useContext, Component, useEffect, useState } from "react"
import React from 'react';
import { useNavigate } from "react-router-dom";



export const Auth = createContext();


export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("role") || null)
    const navigate = useNavigate();
    function authLogin(cred,crid) {
        axios.post('http://127.0.0.1:8000/login', {
            "username": crid.username,
            "password": crid.password
        }).then((res) => {
            if (res.data.data != false) {
                console.log(res);
                window.localStorage.setItem("role", res.data.data);
                setToken(res.data.data);
                navigate('/dashboard');
                console.log("masuk 2")
            } else {
                
            }
        })

    }
    const funci = () => {
        // setBabi("bastard");
        navigate("/create/permohonan/skala/besar");
    }
    const funca = () => {
        navigate("/create/permohonan/skala/kecil")
    }
    return (
        <Auth.Provider value={{token,setToken,funci,funca,authLogin}}>
            {children}
        </Auth.Provider>
        
    )
}






