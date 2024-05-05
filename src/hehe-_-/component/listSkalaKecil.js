import axios from "axios";
import { Fragment, useEffect, useState,useContext } from "react";
import { Auth } from "../authzzz/auth";
import { useNavigate } from "react-router-dom";



function ListSkalaKecil(state) {
    const [dataBang, setDataBang] = useState([]);
    const [datas, setDatas] = useState(false);
    const [page, setPage] = useState(0);
    const [length, setLength] = useState(0);
    const Navigate = useNavigate();
    const auth = useContext(Auth);
    async function getData(){
         await axios.get("http://127.0.0.1:8000/get/permohonan/skala/kecil/"+auth.token+"/").then((data) => {
            console.log("data",data.data)
            setLength(data.data.length-1);
            setDataBang(data.data);
            state.data.setState({data:data.data});
            // console.log("jeeng",pantek);
        })
    }
    function deletes(){
    }
    useEffect(() => {
        if (auth.token == null) {
            Navigate('/login');
        }
        getData();
        
        
    }, [])
    function test() {
        return (
            <Fragment>
                {dataBang[page].map((e) => {
                    return (
                        <tr>
                            <td> <a href={"http://localhost:3000/edit/permohonan/skala/kecil/"+e["id_request"]+"/"}>{e["perusahaan"]["nib"]}</a></td>
                            <td>{e["perusahaan"]["nama_pbphh"]}</td>
                            <td>{e["posisi"]}</td>
                            <td>
                                <input type="button" value={"Edit"} />
                                <input type="button" value={"Delete"} onClick={()=>deletes()} />
                            </td>
                        </tr>
                    );
                })}
            </Fragment>
        )
    }
    useEffect((e)=>{
        if (dataBang.length > 0) {
            console.log(dataBang, page);
            setDatas(true);
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
                hidden={auth.token=="fd"?false:true}
            ></input>
                        <div>
                <input type="button" onClick={() => {
                    Navigate('/create/permohonan/skala/kecil')
                }} value={"Create"}></input>
            <table>
                <tr>
                    <th>NIB</th>
                    <th>Nama PBPHH</th>
                    <th>Progress</th>
                    <th>Action</th>
                </tr>
                {datas ? test() : null}
                </table>
            </div>
            {/* {datas ? test() : null} */}
            {/* <input ></input> */}
            <input type="button" value={"Prev"} onClick={() => {
                setPage(page -1)
            }}
                hidden={page==0?true:false}
            ></input>
            <input type="button" value={"Next"} onClick={() => {
                setPage(page + 1)
            }}
                hidden={length<0?true:page==length?true:false}
            ></input>
        </Fragment>
    )
}

export default ListSkalaKecil;