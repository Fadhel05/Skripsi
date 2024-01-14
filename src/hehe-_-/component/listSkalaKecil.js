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
    const role = window.localStorage.getItem("role");
    async function getData(){
         await axios.get("http://127.0.0.1:8000/get/permohonan/skala/kecil/"+role+"/").then((data) => {
            
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
                            <td>{e["perusahaan"]["nib"]}</td>
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
                        <div>
                <input type="button" value={"Create"}></input>
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
                hidden={page==length?true:false}
            ></input>
        </Fragment>
    )
}

export default ListSkalaKecil;