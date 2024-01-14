import axios from "axios";
import { Fragment, useEffect, useState,useContext } from "react";
import { Auth } from "../authzzz/auth";
import { useNavigate } from "react-router-dom";



function ListSkalaKecil(state) {
    const [dataBang, setDataBang] = useState([]);
    const [babilah, setBabilah] = useState(false);
    const [page, setPage] = useState(0);
    const [length, setLength] = useState(0);
    const Navigate = useNavigate();
    const role = useContext(Auth).token;
    async function getData(){
         await axios.get("http://127.0.0.1:8000/get/permohonan/skala/kecil/"+role+"/").then((data) => {
            console.log(data.data)
            setLength(data.data.length-1);
            setDataBang(data.data);
            state.data.setState({data:data.data});
            // console.log("jeeng",pantek);
        })
    }
    function deletes(){
    }
    useEffect(() => {
        if (role == null) {
            Navigate('/login');
        }
        getData();
        
        
    }, [])
    function test() {
        return (
            <Fragment>
                {dataBang[page].map((e) => {
                    console.log(e);
                    return (
                        <tr>
                            <td> <a href={"http://localhost:3000/edit/permohonan/skala/kecil/"+e["id_request"]}>{e["perusahaan"]["nib"]}</a></td>
                            <td>{e["perusahaan"]["nama_pbphh"]}</td>
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
            setBabilah(true);
        }
    }, [dataBang])

    return (
        <Fragment>
            <input onClick={() => {
                Navigate('/list/permohonan/skala/besar');
            }} value={'Skala Besar'}></input>
            <input onClick={() => {
                Navigate('/list/permohonan/skala/kecil');
            }} value={'Skala Kecil'}></input>
            <input onClick={() => {
                Navigate('');
            }} value={'Cetak Pertek'}
                hidden={role=="fd"?false:true}
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
                {babilah ? test() : null}
                </table>
            </div>
            {/* {babilah ? test() : null} */}
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