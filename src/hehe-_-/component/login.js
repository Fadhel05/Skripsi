import React,{ Fragment, useContext, useEffect, useState } from "react"
import { Auth } from "../authzzz/auth"
import { useNavigate } from "react-router-dom";






function Login(arg) {
    const auth = useContext(Auth);
    const navigate = useNavigate()
    const [cred,setCred] = useState({"username":"","password":""})
    useEffect(() => {
        window.localStorage.removeItem("role");
        // console.log("window",window.localStorage.getItem("role")); 
    },[])
    function logIn() {
        if (arg.data.state.username == "" && arg.data.state.password == "") {
            console.log("gagal")
            return (
                <Fragment>
                    <p>Sumber Kejahatan</p>
                </Fragment>
            );
        } else {
            console.log("masuk");
            auth.authLogin(arg,cred);
           
        }
        
    }
    return (
        <Fragment>
            <input type="text" onChange={(e) => {
                arg.data.setState({ username: e.target.value });
                setCred({...cred, username: e.target.value });
            }
            }></input>
            <input type="text" onChange={(e) => {
                arg.data.setState({ password: e.target.value });
                setCred({...cred ,password: e.target.value });
            }
            }></input>
            <input type="button" onClick={() => {
                logIn();
            }}></input>
        </Fragment>
    )
}


export default Login;