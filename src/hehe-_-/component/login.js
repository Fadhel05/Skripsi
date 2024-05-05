import React,{ Fragment, useContext, useEffect, useState } from "react"
import { Auth } from "../authzzz/auth"
import 'bootstrap/dist/css/bootstrap.css';
import main from "../../assets/images/Fingerprint-bro.svg";
import FileSaver from "file-saver";




function Login(arg) {
    const auth = useContext(Auth);
    const [cred, setCred] = useState({ "username": "", "password": "" })
    useEffect(() => {
        // window.localStorage.removeItem("role");
        // console.log("window",window.localStorage.getItem("role")); 
    },[])

    
    function logIn() {
        if (arg.data.state.username === "" && arg.data.state.password === "") {
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
            
            {/* <input type="button" onClick={() => {
                logIn();
            }}></input> */}


                <div className="root">
                <section className="login">
                <div className="login-card">
                        {/* <img src="./assets/images/Fingerprint-bro.svg" alt="" /> */}
                        <img src={main} alt="" />
                <h2>Log In</h2>
                <form action="">
                    <input placeholder="Username" type="text" onChange={(e) => {
                                    arg.data.setState({ username: e.target.value });
                                    setCred({...cred, username: e.target.value });
                                }
                                }></input>
                    <input placeholder="Password" type="text" onChange={(e) => {
                                    arg.data.setState({ password: e.target.value });
                                    setCred({...cred ,password: e.target.value });
                                }
                                }></input>
                    <a href="">Lupa Password?</a>
                            <button type="button" onClick={() => { logIn(); }}>Log in</button>
                    
                    </form>
                </div>
            </section>
        </div>
        </Fragment>
        
    )
}


export default Login;