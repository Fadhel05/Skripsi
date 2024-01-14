import { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../authzzz/auth";




export function Dashboard() {
    const role = useContext(Auth).token;
    const navigate = useNavigate();
    useEffect(() => {
        if (role == null) {
            navigate('/login');
        } 
    },[])
    return (
        <Fragment>
            <input onClick={() => {
                navigate('/list/permohonan/skala/besar');
            }} value={'Skala Besar'}></input>
            <input onClick={() => {
                navigate('/list/permohonan/skala/kecil');
            }} value={'Skala Kecil'}></input>
            <input onClick={() => {
                navigate('');
            }} value={'Cetak Pertek'}
                hidden={role=="fd"?false:true}
            ></input>
        </Fragment>    
    );
}