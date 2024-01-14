import axios from "axios";
import { createContext, useContext, Component, useEffect, useState } from "react"
import React from 'react';
import { useNavigate } from "react-router-dom";



export const Auth = createContext();


export const AuthProvider = ({children}) => {
    const [meneketehe, setBabi] = useState();
    const [token, setToken] = useState(localStorage.getItem("role") || "")
    const navigate = useNavigate();
    function authLogin(cred,crid) {
        axios.post('http://127.0.0.1:8000/login', {
            "username": crid.username,
            "password": crid.password
        }).then((res) => {
            if (res.data.data != false) {
                console.log(res);
                setBabi("fasdf");
                window.localStorage.setItem("role", res.data.data);
                setToken(res.data.data);
                navigate('/dashboard');
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
        <Auth.Provider value={{token,meneketehe,setBabi,funci,funca,authLogin}}>
            {children}
        </Auth.Provider>
        
    )
}






