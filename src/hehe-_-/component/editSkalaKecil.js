import { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";
import FileSaver from "file-saver";
import { Document } from "react-pdf";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../img/Untitled.png"
import { Auth } from "../authzzz/auth";


function EditSkalaKecil(state) {
    const [id, setId] = useState();
    const [halaman,setHalaman] = useState(0);
    const [jenisProduk, setJenisProduk] = useState(["", "", "", "", ""]);
    const [daftarMesin, setDaftarMesin] = useState(["", "", "", "", ""]);
    const [dokumenFile, setDokumenFile] = useState(["a", "b", "c", "d", "e"]);
    const [hid, setHid] = useState(true);
    const auth = useContext(Auth);
    const navigate = useNavigate();
    async function haduh (ehem) {
        console.log(ehem);
        await axios.put('http://127.0.0.1:8000/edit/permohonan/skala/kecil/' + ehem + "/").then((data) => {
            setDaftarMesin(eval(data.data.perusahaan.daftar_mesin));
            setJenisProduk(eval(data.data.perusahaan.jenis_produk));
            state.data.setState({
                Permohonan: {
                    id_pegawai: data.data.id_pegawai,
                    sub_date: data.data.sub_date,
                    skala: data.data.skala,
                    status_permohonan: data.data.status_permohonan,
                    posisi: data.data.posisi,
                    readTrue:data.data.readTrue
                    
                }, Perusahaan: {
                    ...data.data.perusahaan
                }, Dokumen: [
                    ...data.data.dokumen
                ]
                ,
                dokumenFile: {
                    a: {
                        file: data.data.dokumen[0].read_true ? "http://127.0.0.1:8000/see/dokumen/"+data.data.id_request+"surat_permohonan"+"/" : 0,
                        bol : data.data.dokumen[0].read_true ? true : false,
                        note: data.data.dokumen[0].note ?data.data.dokumen[0].note: ""
                    },
                    b: {
                        file: data.data.dokumen[1].read_true ? "http://127.0.0.1:8000/see/dokumen/"+data.data.id_request+"NIB"+"/" : 0,
                        bol : data.data.dokumen[1].read_true ? true : false,
                        note:data.data.dokumen[1].note ?data.data.dokumen[1].note: ""
                    },
                    c: {
                        file: data.data.dokumen[2].read_true ? "http://127.0.0.1:8000/see/dokumen/"+data.data.id_request+"dokumen_lingkungan"+"/" : 0,
                        bol : data.data.dokumen[2].read_true ? true : false,
                        note:data.data.dokumen[2].note ?data.data.dokumen[2].note: ""
                    },
                    d: {
                        file: data.data.dokumen[3].read_true ? "http://127.0.0.1:8000/see/dokumen/"+data.data.id_request+"surat_pernyataan_pengelolaan"+"/" :0,
                        bol : data.data.dokumen[3].read_true ? true : false,
                        note:data.data.dokumen[3].note ?data.data.dokumen[3].note: ""
                    },
                    e: {
                        file: data.data.dokumen[4].read_true ? "http://127.0.0.1:8000/see/dokumen/"+data.data.id_request+"pernyataan_oss"+"/" : 0,
                        bol : data.data.dokumen[4].read_true ? true : false,
                        note:data.data.dokumen[4].note ?data.data.dokumen[4].note: ""
                    }
                    
                }
            })
        }
            ).catch((err) =>{
            });
        // console.log("database",state.data.state);
    }
    useEffect(() => {
        if (auth.token == null) {
            navigate('/login')
        }
        setId(window.location.pathname.split("/")[5]);
        haduh(window.location.pathname.split("/")[5]);
    },[]) 
    useEffect(() => {
        console.log("use", state.data.state);
    },[state.data.state])
    async function najis(formData) {
        await axios.post('http://127.0.0.1:8000/edit/dokumen/', formData, Headers = { "content-type": "multipart/form-data" }).then(e => {
            
        })
    }
    function submitDocument(id) {
        let shit = { "a": "surat_permohonan.pdf", "b": "NIB.pdf", "c": "dokumen_lingkungan.pdf", "d": "surat_pernyataan_pengelolaan.pdf", "e": "pernyataan_oss.pdf" };
        let kumpulanshi = [];
        for (let p in shit) {
            if (typeof(state.data.state.dokumenFile[p].file)=="object") {
                let doks = new FormData();
                doks.append("namaDokumen", id+shit[p]);
                doks.append("dataDokumen", state.data.state.dokumenFile[p].file);
                kumpulanshi.push(new Promise(resolve => {
                    najis(doks);
                    
                }))
                }
            
        }
        Promise.all(kumpulanshi);

    }
        useEffect(() => {
        if (state.data.state.Perusahaan.nama_pelakuUsaha.length > 0 && state.data.state.Perusahaan.sumber_bahan.length > 0) {
            setHid(false);
        }
    }, [state.data.state]);
    async function submit(submits) {
        const today = new Date();
        const yyyy = String(today.getFullYear());
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        let form = {
            "Perusahaan": { ...state.data.state.Perusahaan },
            "Permohonan": { ...state.data.state.Permohonan },
            "Dokumen": { ...state.data.state.Dokumen }
        };
        form.Perusahaan.jenis_produk = jenisProduk;
        form.Perusahaan.daftar_mesin = daftarMesin;
        form.Permohonan.sub_date = yyyy;
        form.Permohonan.sub_date += "-";
        form.Permohonan.sub_date += mm < 10 ? "0" + String(mm + 1) : String(mm);
        form.Permohonan.sub_date += "-";
        form.Permohonan.sub_date += dd < 10 ? ("0" + dd) : String(dd);
        form.Permohonan.posisi = submits;
        let shit = { "a": 0, "b": 1, "c": 2, "d": 3, "e": 4 };
        if(submits=="pb")
        for (let adohhh in state.data.state.dokumenFile) {
            if (state.data.state.dokumenFile[adohhh].bol) {
                form.Dokumen[shit[adohhh]].read_true = true;
                if (submits == "pb") {
                    form.Dokumen[shit[adohhh]].note = "";
                } else {
                    form.Dokumen[shit[adohhh]].note = state.data.state.dokumenFile[adohhh].note?state.data.state.dokumenFile[adohhh].note:"";
                }
                
            } else {
                form.Dokumen[shit[adohhh]].read_true = false;
                form.Dokumen[shit[adohhh]].note = "";
            }
        }
        let idx;
        console.log("form",form)
        await axios.put('http://127.0.0.1:8000/edit/permohonan/skala/kecils/'+id+'/', form).then((resp) => {
            console.log("data",resp.data,resp);
            idx = resp.data.data.id_request;
        }).catch(err => {
            console.log(err);
        })
        submitDocument(idx);
    }
     async function duh() {
        // console.log("dih", document.getElementById("file").files[0]);
        FileSaver('http://127.0.0.1:8000/test/');
                let formData = new FormData();
        formData.append("dataDokumen", document.getElementById('file').files[0]);
        formData.append("namaDokumen", document.getElementById('file').value);
        await axios.post('http://127.0.0.1:8000/test/',formData,Headers={"content-type": "multipart/form-data"}).then((data) => { console.log(data);  }
            ).catch((err) =>{
                console.log("error", err);
            });
    }
    function hehway(ae) {
        if (typeof (state.data.state.dokumenFile[ae].file) == "string") {
            return (
                <Fragment>
            <iframe src={state.data.state.dokumenFile[ae].file} width="100%" height="100%"></iframe>
                            <input type="text" defaultValue={state.data.state.dokumenFile[ae].note} id={ae+"_chat"}></input>
                        <input type="button" onClick={() => {document.getElementById("dokumen"+ae).hidden=true }} value={"cancel"}></input>
                <input type="button" onClick={() => {
                    document.getElementById("dokumen" + ae).hidden = true;
                    state.data.setState({ dokumenFile: { ...state.data.state.dokumenFile, [ae]: { ...state.data.state.dokumenFile[ae],note:document.getElementById(ae+"_chat").value } } });
            }} value={"save"}></input>
            </Fragment>
            )
        }
        const url = window.URL.createObjectURL(state.data.state.dokumenFile[ae].file);

        return (
            <div>
                <iframe src={url} width="100%" height="100%"></iframe>
                <input type="text" id={ae+"_chat"}></input>
            <input type="button" onClick={() => {document.getElementById("dokumen"+ae).hidden=true }} value={"cancel"}></input>
                <input type="button" onClick={() => {
                    document.getElementById("dokumen" + ae).hidden = true;
                    state.data.setState({ dokumenFile: { ...state.data.state.dokumenFile, [ae]: { ...state.data.state.dokumenFile[ae],note:document.getElementById(ae+"_chat").value } } });
            }} value={"save"}></input>
            </div>
        );
    }
    function duh2() {
        const data = { ...state.data.state };
        var p = "dokumenFile";
        console.log("data", state.data.state.file2);
        // window.open(state.data.state.file2)
                const url = window.URL.createObjectURL(
        state.data.state.file2
        );
                const link = document.createElement('a');
                link.href = url;
        window.open(link);
    }
    
    return (
        <div hidden={hid}>
        <Fragment>
            
            <form name="form">

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
                <div hidden={halaman==0?false:true}>

               
                <label for='namaPelakuUsaha'>Nama Pelaku Usaha</label>
                <input type='text' id="namaPelakuUsaha"
                    defaultValue={state.data.state.Perusahaan.nama_pelakuUsaha}
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                nama_pelakuUsaha:e.target.value
                            }
                        })
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input>
                <br></br>
                <label for='namaPBPHH'>Nama PBPHH</label>
                <input type='text' id='namaPBPHH'
                    defaultValue={state.data.state.Perusahaan.nama_pbphh}
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                nama_pbphh:e.target.value
                            }
                        })
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='KBLI'>KBLI</label>
                <input type='text' id='KBLI'
                    defaultValue={state.data.state.Perusahaan.kbli}
                    onChange={(e) => {
                            state.data.setState({
                                Perusahaan: {
                                    ...state.data.state.Perusahaan,
                                    kbli:e.target.value
                                }
                            })
                        }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='NIB'>NIB</label>
                <input type='text' id='NIB'
                    defaultValue={state.data.state.Perusahaan.nib}
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                nib:e.target.value
                            }
                        })
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='NPWP'>NPWP</label>
                <input type='text' id='NPWP'
                    defaultValue={state.data.state.Perusahaan.npwp}
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                npwp:e.target.value
                            }
                        })
                    }} 
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='alamatKantor'>Alamat Kantor</label>
                <input type='text' id='alamatKantor'
                    defaultValue={state.data.state.Perusahaan.alamat_kantor}
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                alamat_kantor:e.target.value
                            }
                        })
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='aLamatUsaha'>ALamat Usaha</label>
                <input type='text' id='aLamatUsaha'
                    defaultValue={state.data.state.Perusahaan.alamat_usaha}
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                alamat_usaha:e.target.value
                            }
                        })
                    }} 
                    disabled={auth.token=="fd"?false:true} 
                    ></input>
                </div>



                <div hidden={halaman==1?false:true}>

                
                <label for='alamatGudang'>Alamat Gudang</label>
                <input type='text' id='alamatGudang'
                    defaultValue={state.data.state.Perusahaan.alamat_gudang}
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                alamat_gudang:e.target.value
                            }
                        })
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='jenisPengelolahan'>Jenis Pengelolahan</label>
                <input type='text' id='jenisPengelolahan'
                    defaultValue={jenisProduk[0]}
                    onChange={(e) => {
                        // state.data.setState({
                        //     a:e.target.value
                        // })
                        var p = [...jenisProduk];
                        p[0] = e.target.value;
                        setJenisProduk(p);
                    }} 
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='ragamProduk'>Ragam Produk</label>
                <input type='text' id='ragamProduk'
                    defaultValue={jenisProduk[1]}
                    onChange={(e) => {

                        // state.data.setState({
                        //     b:e.target.value
                        // })
                        var p = [...jenisProduk];
                        p[1] = e.target.value;
                        setJenisProduk(p);
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='KBLI2'>KBLI</label>
                <input type='text' id='KBLI2'
                    defaultValue={jenisProduk[2]}
                    onChange={(e) => {
                        // state.data.setState({
                        //     c:e.target.value
                        // })
                        var p = [...jenisProduk];
                        p[2] = e.target.value;
                        setJenisProduk(p);
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='kapasitasIzinProduksi'>Kapasitas Izin Produksi</label>
                <input type='text' id='kapasitasIzinProduksi'
                    defaultValue={jenisProduk[3]}
                    onChange={(e) => {
                        // state.data.setState({
                        //     d:e.target.value
                        // })
                        var p = [...jenisProduk];
                        p[3] = e.target.value;
                        setJenisProduk(p);
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='keterangan'>Keterangan</label>
                <input type='text' id='keterangan'
                    defaultValue={jenisProduk[4]}
                    onChange={(e) => {
                        // state.data.setState({
                        //     e:e.target.value
                        // })
                        var p = [...jenisProduk];
                        p[4] = e.target.value;
                        setJenisProduk(p);
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='jenisMesin'>Jenis Mesin</label>
                <input type='text' id='jenisMesin'
                    defaultValue={daftarMesin[0]}
                    onChange={(e) => {
                        var p = [...daftarMesin];
                        p[0] = e.target.value;
                        setDaftarMesin(p);
                    }}
                    disabled={auth.token=="fd"?false:true}
                    ></input>
                </div>
                <div hidden={halaman==2?false:true}>
                <label for='spesifikasi'>Spesifikasi / Merk / Negara</label>
                <input type='text' id='spesifikasi'
                    defaultValue={daftarMesin[1]}
                    onChange={(e) => {
                        var p = [...daftarMesin];
                        p[1] = e.target.value;
                        setDaftarMesin(p);
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='kapasitasProduksi'>Kapasitas Produksi</label>
                <input type='text' id='kapasitasProduksi'
                    defaultValue={daftarMesin[2]}
                    onChange={(e) => {
                        var p = [...daftarMesin];
                        p[2] = e.target.value;
                        setDaftarMesin(p);
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='jumlahUnit'>Jumlah Unit</label>
                <input type='text' id='jumlahUnit'
                    defaultValue={daftarMesin[3]}
                    onChange={(e) => {
                        var p = [...daftarMesin];
                        p[3] = e.target.value;
                        setDaftarMesin(p);
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='keterangan'>Keterangan</label>
                <input type='text' id='keterangan'
                    defaultValue={daftarMesin[4]}
                    onChange={(e) => {
                        var p = [...daftarMesin];
                        p[4] = e.target.value;
                        setDaftarMesin(p);
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='sumber'>Sumber Bahan Baku</label>
                <input type='text' id='sumber'
                    defaultValue={state.data.state.Perusahaan.sumber_bahan}
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                sumber_bahan:e.target.value
                            }
                        })
                    }}
                    disabled={auth.token=="fd"?false:true}
                ></input><br></br>
                <label for='totalInvestasi'>Total Investasi</label>
                <input type='text' id='totalInvestasi'
                    defaultValue={state.data.state.Perusahaan.total_investasi}
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                total_investasi:Number(e.target.value)
                            }
                        })
                    }}
                    disabled={auth.token=="fd"?false:true}></input><br></br>
                <label for='statusPenanamanModal'>Status Penanaman Modal</label>
                <input type='text' id='statusPenanamanModal'
                    defaultValue={state.data.state.Perusahaan.status_permohonan}
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                status_permohonan:e.target.value
                            }
                        })
                        }}
                    disabled={auth.token=="fd"?false:true}></input>
                    
                </div>
                <div hidden={halaman==3?false:true}>

                
                <label for='jumlahTenagaKerja'>Jumlah Tenaga Kerja</label>
                <input type='text' id='jumlahTenagaKerja'
                    defaultValue={state.data.state.Perusahaan.jumlah_tenaga_kerja}
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                jumlah_tenaga_kerja:Number(e.target.value)
                            }
                        })
                    }}></input><br></br>
                
                {   
                    dokumenFile.map((ae, i) => {
                    if (state.data.state.dokumenFile[ae].bol) {
                        return (
                            <div id="dokumen">
                                <div>
                                <button><img src={logo}></img></button>
                                <input type="button" value={"Delete"} id={ae} onClick={(e)=>state.data.setState({dokumenFile:{...state.data.state.dokumenFile,[e.target.id]:{file:0,bol:false}}})}></input>
                                <input type="button" value={"Download"} id={ae} onClick={(e)=>FileSaver(state.data.state.dokumenFile[e.target.id].file)}></input>
                                <input type="button" value={"View"} id={ae}
                                    onClick={(e) => {
                                        const url = window.URL.createObjectURL(
                                            state.data.state.dokumenFile[e.target.id].file
                                            );
                                                    const link = document.createElement('a');
                                                    link.href = url;

                                                    // Append to html link element page
                                                    // document.body.appendChild(link);
                                            window.open(link);
                                    }}></input>
                                <input type="button" value={"Feedback"} onClick={()=>document.getElementById("dokumen"+ae).hidden=false} id={ae}></input>
                                </div>  
                                <div id={"dokumen"+ae} hidden={true}>
                                    {hehway(ae)}
                                    
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <input type="file"
                                    id={i}
                                    onChange={(e) => {
                                        // var temp = [...dokumenFile];
                                        // temp[0] = e.target.files[0];
                                        // setDokumenFile(temp);
                                        state.data.setState({ dokumenFile: { ...state.data.state.dokumenFile, [dokumenFile[e.target.id]]: { file: e.target.files[0], bol: true } } });
                                    
                                     }}></input>
                            </div>
                        )
                    }
                    // return(<button><img src={logo}></img></button>)
                    })}
                
                {/* {
                    filex()
                } */}
            
            {/* <input type="button" onClick={submit} value={"Delete"}></input> */}
            <input type="button" hidden={auth.token!="fd"?true:false} onClick={()=>{submit("pb")}} value={"Submit"}></input>
                        <input type="button" hidden={auth.token != "fd" ? false : true} onClick={() => {
                            axios.get('http://127.0.0.1:8000/approve/' + id + "/").then((data) => {
                                navigate('/list/permohonan/skala/kecil');
                            })
            }} value={"Approve"}></input>
                        <input type="button" hidden={auth.token != "fd" ? false : true} onClick={() => {
                            let shit = { "a": 0, "b": 1, "c": 2, "d": 3, "e": 4 };
                            let datas = [];
                            for (let adohhh in state.data.state.dokumenFile) {
                                datas.push(state.data.state.dokumenFile[adohhh]['note']?state.data.state.dokumenFile[adohhh]['note']:"");
                            }
                            let formdats = new FormData();
                            formdats.append("data", datas);
                            console.log("formdats", formdats,datas);
                            axios.post('http://127.0.0.1:8000/reject/' + id + "/",{"data":datas}).then((data) => {
                                navigate('/list/permohonan/skala/kecil');
                            })
            }} value={"Reject"}></input>
                        <input type="button" onClick={() => {
                            navigate('/list/permohonan/skala/kecil');
            }} value={"Cancel"}></input>
                <input type="button" hidden={auth.token!="fd"?true:false} onClick={()=>{submit("fd")}} value={"Save"}></input>
                <input type="button" hidden={auth.token!="fd"?false:true} onClick={()=>{submit(auth.token)}} value={"Save"}></input>
                <br></br>
            </div>
            <input type="button" onClick={() => {
                    setHalaman(halaman - 1);
                }} value={"Prev"}
                    hidden={halaman==0?true:false}
                ></input>
                <input type="button" onClick={() => {
                    setHalaman(halaman+1);
                    }} value={"Next"} hidden={halaman==3?true:false}></input>
                </form>
            </Fragment>
            </div>
    )
}

export default EditSkalaKecil;