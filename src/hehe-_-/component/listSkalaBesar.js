import axios from "axios";
import { Fragment, useEffect, useState,useContext } from "react";
import { Auth } from "../authzzz/auth";



function ListSkalaBesar(state) {
    const [dataBang, setDataBang] = useState([]);
    const [babilah, setBabilah] = useState(false);
    const [page, setPage] = useState(0);
    const jiing = useContext(Auth);
    async function getData(){
         await axios.get("http://127.0.0.1:8000/get/permohonan/skala/besar/fd/").then((data) => {
            // console.log(data.data)
            setDataBang(data.data);
            state.data.setState({data:data.data});
            // console.log("jeeng",pantek);
        })
    }
    function deletes(){
        console.log("apasih jing")
        window.localStorage.setItem("bgst", "babi");
        jiing.setBabi("anjeeng");
        jiing.funci();
    }
    useEffect(() => {
        console.log("context", jiing);
        getData();
        
        
    }, [])
    function test() {
        return (
            <div>
                <input type="button" value={"Create"}></input>
            <table>
                <tr>
                    <th>NIB</th>
                    <th>Nama PBPHH</th>
                    <th>Progress</th>
                    <th>Action</th>
                </tr>
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
                </table>
            </div>
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
            {babilah ? test() : null}
            {jiing.meneketehe}
            <input type="button" onClick={()=>deletes()}></input>
        </Fragment>
    )
}

export default ListSkalaBesar;