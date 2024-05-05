import { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../authzzz/auth";
import "../../assets/dashboard.css";



export function Dashboard() {
    const auth = useContext(Auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.token == null) {
            navigate('/login');
        } 
    },[])
    return (
        <Fragment>
            <input type="button" onClick={() => {
                auth.setToken(null);
                window.localStorage.removeItem("role");
                navigate("/login");
            }} value={"Log Out"}></input>
            <input onClick={() => {
                navigate('/list/permohonan/skala/besar');
            }} value={'Skala Besar'}></input>
            <input onClick={() => {
                navigate('/list/permohonan/skala/kecil');
            }} value={'Skala Kecil'}></input>
            <input onClick={() => {
                navigate('');
            }} value={'Cetak Pertek'}
                hidden={auth.token=="fd"?false:true}
            ></input>


            <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="sidebar col-md-3 col-xl-2 px-sm-2 px-0 bg-white border-end">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
                <a href="/"
                    className="title-sidebar d-flex align-items-center px-4 pb-3 mb-md-0 me-md-auto text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline "><strong className="title-sidebar">DASHBOARD</strong></span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 px-4 pt-5 align-items-center align-items-sm-start"
                    id="menu">
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-5 bi-folder"></i> <span className="ms-1 d-none d-sm-inline">Dokumen ▼</span></a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li className="w-100">
                                <a  href="http://localhost:3000/list/permohonan/skala/kecil" className="ps-4 nav-link px-1"> <span
                                        className="d-none d-sm-inline">Skala Kecil</span></a>
                            </li>
                            <li>
                                <a href="http://localhost:3000/list/permohonan/skala/besar" className="ps-4 nav-link px-2"> <span
                                        className="d-none d-sm-inline">Skala Besar</span></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a hidden={auth.token=="fd"?false:true} href="#" className="nav-link px-0 align-middle">
                            <i className="fs-5 bi-file-text"></i> <span className="ms-1 d-none d-sm-inline">Cetak
                                Partek</span></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
        </Fragment>    
    );
}