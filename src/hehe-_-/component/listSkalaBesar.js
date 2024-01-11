import axios from "axios";
import { Fragment, useEffect, useState } from "react";



function ListSkalaBesar(state) {
    const [dataBang, setDataBang] = useState([]);
    const [babilah, setBabilah] = useState(false);
    const [page, setPage] = useState(0);
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
    }
    useEffect(() => {
        

            getData();
            // console.log("anjenglah", state.data.state, dataBang);
        
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
    useEffect(() => {
        console.log("log");
    },[deletes])
    return (
        <Fragment>
            {babilah?test():null}
        </Fragment>
    )
}

export default ListSkalaBesar;