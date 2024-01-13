import React,{ Fragment, useContext, useEffect } from "react"
import { Auth } from "../authzzz/auth"
import { useNavigate } from "react-router-dom";






function Login(arg) {
    const auth = useContext(Auth);
    const navigate = useNavigate()
    function logIn() {
        if (arg.data.state.username && arg.data.state.password == "") {
            return (
                <Fragment>
                    <p>Sumber Kejahatan</p>
                </Fragment>
            );
        } else {
            auth.authLogin(arg);
            if (window.localStorage.getItem("role")!=false) {
                navigate('/dashboard');
            } else {
                
            }
        }
        
    }
    return (
        <Fragment>
            <input type="text" onChange={(e) => {
                arg.data.setState({ username: e.target.value });
            }
            }></input>
            <input type="text" onChange={(e) => {
                arg.data.setState({ password: e.target.value });
            }
            }></input>
            <input type="button" onClick={() => {
                logIn();
            }}></input>
        </Fragment>
    )
}


export default Login;