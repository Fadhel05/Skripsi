import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";




export function Dashboard() {
    const role = window.localStorage.getItem("role");
    const navigate = useNavigate();
    useEffect(() => {
        console.log("role", role); 
    },[])
    return (
        <Fragment>
            <a href="http://localhost:3000/dashboard"></a>
            <input onClick={() => {
                navigate('/list/permohonan/skala/besar');
            }} value={'Skala Besar'}></input>
            <input onClick={() => {
                navigate('/list/permohonan/skala/Kecil');
            }} value={'Skala Kecil'}></input>
            <input onClick={() => {
                navigate('');
            }} value={'Cetak Pertek'}
                hidden={role=="fd"?false:true}
            ></input>
        </Fragment>    
    );
}