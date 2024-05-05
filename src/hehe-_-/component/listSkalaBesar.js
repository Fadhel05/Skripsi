import axios from "axios";
import { Fragment, useEffect, useState,useContext } from "react";
import { Auth } from "../authzzz/auth";
import { useNavigate } from "react-router-dom";



function ListSkalaBesar(state) {
    const [dataBang, setDataBang] = useState([]);
    const [babilah, setBabilah] = useState(false);
    const [x, t] = useState(false);
    const [page, setPage] = useState(0);
    const [length, setLength] = useState(0);
    const auth = useContext(Auth);
    const Navigate = useNavigate();
    async function getData(){
         await axios.get("http://127.0.0.1:8000/get/permohonan/skala/besar/"+auth.token+"/").then((data) => {
            
            setLength(data.data.length-1);
            setDataBang(data.data);
            state.data.setState({data:data.data});
            // console.log("jeeng",pantek);
        })
    }
    function deletes(){
    }
    useEffect(() => {
        if (auth.token === null) {
            Navigate('/login');
        }
        getData();
    }, [])
    function test() {
        return (
            <Fragment>
                

                {dataBang.length===0?null:dataBang[page].map((e) => {
                    return (
                        <tr>
                            <td> <a href={"http://localhost:3000/edit/permohonan/skala/besar/"+e["id_request"]}>{e["perusahaan"]["nib"]}</a></td>
                            <td>{e["perusahaan"]["nama_pbphh"]}</td>
                            <td>{e["posisi"]}</td>
                            <td>
                                <input type="button" value={"Edit"} />
                                <input type="button" value={"Delete"} onClick={() => {
                                    document.getElementById("modal").hidden = false;
                                    document.getElementById("yes").nami = e["id_request"];
                                }} />
                            </td>
                        </tr>
                    );
                })}
            </Fragment>
        )
    }
    useEffect((e)=>{
        if (dataBang.length > 0) {
            setBabilah(true);
        }
    }, [dataBang])
    return (
        <Fragment>
            <input type="button" onClick={() => {
                auth.setToken(null);
                window.localStorage.removeItem("role");
                Navigate("/login");
            }} value={"Log Out"}></input>
                        <input onClick={() => {
                Navigate('/list/permohonan/skala/besar');
            }} value={'Skala Besar'}></input>
            <input onClick={() => {
                Navigate('/list/permohonan/skala/kecil');
            }} value={'Skala Kecil'}></input>
            <input onClick={() => {
                Navigate('');
            }} value={'Cetak Pertek'}
                hidden={auth.token==="fd"?false:true}
            ></input>
                        <div>
                <input type="button" onClick={()=>{Navigate('/create/permohonan/skala/besar')}}  value={"Create"}></input>
            <table>
                <tr>
                    <th>NIB</th>
                    <th>Nama PBPHH</th>
                    <th>Progress</th>
                    <th>Action</th>
                </tr>
                {babilah ? test() : null}
                </table>
            </div>
            <div id={"modal"} hidden={true}>
                <input id={"no"} value={"No"} onClick={() => {
                    document.getElementById("modal").hidden = true;
                }} type="button"></input>
                <input id={"yes"} nami="anjay" value={"yes"} onClick={(e) => {
                    console.log("modal",e.target.nami)
                }} type="button"></input>
            </div>
            <input type="button" value={"Prev"} onClick={() => {
                setPage(page -1)
            }}
                hidden={page===0?true:false}
            ></input>
            <input type="button" value={"Next"} onClick={() => {
                setPage(page + 1)
            }}
                hidden={length<0?true:page===length?true:false}
            ></input>
            
        </Fragment>
    )
}

export default ListSkalaBesar;