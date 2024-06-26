import { Fragment, useState, useEffect,useContext } from "react";
import axios from "axios";
import FileSaver from "file-saver";
import logo from "../../img/Untitled.png"
import { Auth } from "../authzzz/auth";
import { useNavigate } from "react-router-dom";
function CreateSkalaBesar(state) {
    const [jenisProduk, setJenisProduk] = useState(["", "", "", "", ""]);
    const [daftarMesin, setDaftarMesin] = useState(["", "", "", "", ""]);
    const [halaman, setHalaman] = useState(0);
    const [halaman1, setHalaman1] = useState(0);
    const [halaman2, setHalaman2] = useState(0);
    const [halaman3, setHalaman3] = useState(0);
    const [dokumenFile, setDokumenFile] = useState(["a", "b", "c", "d", "e"]);
    const navigate = useNavigate();
    const [jenisProdukAsli, setJenisProdukAsli] = useState([]);
    const [daftarMesinAsli, setDaftarMesinAsli] = useState([]);
    const auth = useContext(Auth);
    async function haduh () {
        await axios.get('http://127.0.0.1:8000/test/').then((data) => {
        }
            ).catch((err) =>{
        });
    }
    useEffect(() => {
        if (auth.token == null) {
            navigate('/login')
        }else if (auth.token != "fd") {
            navigate('/dashboard');
        }
        haduh();

    },[]) 
    useEffect(() => {
        var halaman1=0, halaman2=0, penanda=0;
        for (var r in state.data.state.Perusahaan) {
            if (penanda == 0) {
                if (r == "alamat_usaha") {
                    penanda = 1;
                }
                if(state.data.state.Perusahaan[r]){
                    halaman1 +=1
                }
            } else if (penanda==1) {
                if (r == "jenis_produk" && jenisProdukAsli.length>0) {
                    halaman2 += 1;
                }
                if (r == "daftar_mesin" && daftarMesinAsli.length > 0) {
                    halaman2 += 1;
                }
                if (state.data.state.Perusahaan[r]) {
                    halaman2 += 1;
                }
            }
        }
        
        setHalaman1(halaman1);
        setHalaman2(halaman2);
    }, [state.data.state.Perusahaan,halaman3,jenisProdukAsli,daftarMesinAsli])
    async function najis(formData) {
        await axios.post('http://127.0.0.1:8000/test/', formData, Headers = { "content-type": "multipart/form-data" }).then(e => {
            
        })
        // console.log(formData)
    }
    function submitDocument(id) {
        let shit = { "a": "surat_permohonan.pdf", "b": "NIB.pdf", "c": "dokumen_lingkungan.pdf", "d": "surat_pernyataan_pengelolaan.pdf", "e": "pernyataan_oss.pdf" };
        let kumpulanshi = [];
        for (let p in shit) {
            if (state.data.state.dokumenFile[p].bol) {
                let doks = new FormData();
                doks.append("namaDokumen", id+shit[p]);
                doks.append("dataDokumen", state.data.state.dokumenFile[p].file);
                console.log("idx",id);
                kumpulanshi.push(new Promise(resolve => {
                    najis(doks);
                    
                }))
                }
            
        }
        Promise.all(kumpulanshi);

    }
    async function submit() {
        const today = new Date();
        const yyyy = String(today.getFullYear());
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        let form = {
            "Perusahaan": { ...state.data.state.Perusahaan },
            "Permohonan": { ...state.data.state.Permohonan },
            "Dokumen":{...state.data.state.Dokumen}
        }
        form.Perusahaan.jenis_produk = jenisProdukAsli;
        form.Perusahaan.daftar_mesin = daftarMesinAsli;
        form.Permohonan.sub_date = yyyy;
        form.Permohonan.sub_date += "-";
        form.Permohonan.sub_date += mm < 10 ? "0" + String(mm + 1) : String(mm);
        form.Permohonan.sub_date += "-";
        form.Permohonan.sub_date += dd < 10 ? ("0" + dd) : String(dd);
        let shit = { "a": 0, "b": 1, "c": 2, "d": 3, "e":4 };
        for (let adohhh in state.data.state.dokumenFile) {
            if (state.data.state.dokumenFile[adohhh].bol) {
                form.Dokumen[shit[adohhh]].read_true = true;
            }
        }
        let idx;
        console.log("form",form)
        await axios.post('http://127.0.0.1:8000/create/permohonan/skala/besar', form).then((resp) => {
            console.log("data",resp.data,resp);
            idx = resp.data.data.id_request;
        }).catch(err => {
            console.log(err);
        })
        submitDocument(idx);
    }
    function viewpdf() {
        let sekkiya = document.getElementById("bgst");
        let pp = document.createElement("iframe");
        
        sekkiya.appendChild(pp);
    }
    // function Modal
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
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                nama_pelakuUsaha:e.target.value
                            }
                        })
                    }} ></input>
                <br></br>
                <label for='namaPBPHH'>Nama PBPHH</label>
                    <input type='text' id='namaPBPHH'
                        onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                nama_pbphh:e.target.value
                            }
                        })
                    }} 
                ></input><br></br>
                <label for='KBLI'>KBLI</label>
                <input type='text' id='KBLI'
                    onChange={(e) => {
                            state.data.setState({
                                Perusahaan: {
                                    ...state.data.state.Perusahaan,
                                    kbli:e.target.value
                                }
                            })
                        }} 
                ></input><br></br>
                <label for='NIB'>NIB</label>
                <input type='text' id='NIB'
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                nib:e.target.value
                            }
                        })
                    }} 
                ></input><br></br>
                <label for='NPWP'>NPWP</label>
                <input type='text' id='NPWP'
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                npwp:e.target.value
                            }
                        })
                    }} 
                ></input><br></br>
                <label for='alamatKantor'>Alamat Kantor</label>
                <input type='text' id='alamatKantor'
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                alamat_kantor:e.target.value
                            }
                        })
                    }} 
                ></input><br></br>
                <label for='aLamatUsaha'>ALamat Usaha</label>
                <input type='text' id='aLamatUsaha'
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                alamat_usaha:e.target.value
                            }
                        })
                    }} 
                    ></input>
                    
                </div>
                <div hidden={halaman==1?false:true}>

                
                <label for='alamatGudang'>Alamat Gudang</label>
                <input type='text' id='alamatGudang'
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                alamat_gudang:e.target.value
                            }
                        })
                    }} 
                    
                ></input><br></br>

                
                <input type="button"
                    onClick={() => {
                        document.getElementById("anjenglah").hidden = false;
                    }}
                    value={"Add"}
                ></input><br></br>
                <table>
                <tr>
                    <th>Jenis Pengelolahan</th>
                    <th>Ragam Produk</th>
                    <th>KBLI</th>
                    <th>Kapasitas Izin Produksi</th>
                    <th>Keterangan</th>
                    <th>Action</th>
                    </tr>
                    {jenisProdukAsli.map((e, i)=>{
                        return (<tr>
                            <td>{e[0]}</td>
                            <td>{e[1]}</td>
                            <td>{e[2]}</td>
                            <td>{e[3]}</td>
                            <td>{e[4]}</td>
                            <td><input type="button"
                                value={"Delete"}
                                onClick={() => {
                                    let prx = [...jenisProdukAsli];
                                    let shit = [];
                                    prx = prx.forEach((ex,ie) => {
                                        if (i == ie) {
                                            
                                        } else {
                                            shit.push(ex);
                                        }
                                    })
                                    
                                    setJenisProdukAsli(shit);
                                }}
                            ></input></td>
                        </tr>);
                    })}
                </table>

                <br></br>
                <div id="anjenglah" hidden={true}>
                <label for='jenisPengelolahan'>Jenis Pengelolahan</label>
                <input type='text' id='jenisPengelolahan'
                    onChange={(e) => {
                        // state.data.setState({
                        //     a:e.target.value
                        // })
                        var p = [...jenisProduk];
                        p[0] = e.target.value;
                        setJenisProduk(p);
                        }}
                        value={jenisProduk[0]}
                ></input><br></br>
                <label for='ragamProduk'>Ragam Produk</label>
                <input type='text' id='ragamProduk'
                    onChange={(e) => {

                        // state.data.setState({
                        //     b:e.target.value
                        // })
                        var p = [...jenisProduk];
                        p[1] = e.target.value;
                        setJenisProduk(p);
                        }}
                        
                        value={jenisProduk[1]}
                ></input><br></br>
                <label for='KBLI2'>KBLI</label>
                <input type='text' id='KBLI2'
                    onChange={(e) => {
                        // state.data.setState({
                        //     c:e.target.value
                        // })
                        var p = [...jenisProduk];
                        p[2] = e.target.value;
                        setJenisProduk(p);
                        }}
                        
                        value={jenisProduk[2]}
                ></input><br></br>
                <label for='kapasitasIzinProduksi'>Kapasitas Izin Produksi</label>
                <input type='text' id='kapasitasIzinProduksi'
                    onChange={(e) => {
                        // state.data.setState({
                        //     d:e.target.value
                        // })
                        var p = [...jenisProduk];
                        p[3] = e.target.value;
                        setJenisProduk(p);
                        }}
                        
                        value={jenisProduk[3]}
                ></input><br></br>
                <label for='keterangan'>Keterangan</label>
                <input type='text' id='keterangan'
                    onChange={(e) => {
                        // state.data.setState({
                        //     e:e.target.value
                        // })
                        var p = [...jenisProduk];
                        p[4] = e.target.value;
                        setJenisProduk(p);
                        }}
                        
                        value={jenisProduk[4]}
                    ></input><br></br>
                    <input type="button"
                        onClick={() => {
                            document.getElementById("anjenglah").hidden = true;
                        }}
                        value={"Cancel"}
                    ></input>
                    <input type="button"
                        onClick={() => {
                            document.getElementById("anjenglah").hidden = true;
                            let p = jenisProdukAsli;
                            p.push(jenisProduk);
                            setJenisProdukAsli(p);
                            setJenisProduk(["", "", "", "", ""]);
                            setHalaman3(halaman3 + 1);
                        }}
                        value={"Save"}
                    ></input>
                </div>

                    <input type="button"
                            onClick={() => {
                                document.getElementById("anjinglah").hidden = false;
                            }}
                            value={"Add"}
                        ></input><br></br>
                        <table>
                        <tr>
                            <th>Jenis Mesin</th>
                            <th>Spesifikasi</th>
                            <th>Kapasitas Produksi</th>
                            <th>Jumlah Unit</th>
                            <th>Keterangan</th>
                            <th>Action</th>
                            </tr>
                            {daftarMesinAsli.map((e, i)=>{
                                return (<tr>
                                    <td>{e[0]}</td>
                                    <td>{e[1]}</td>
                                    <td>{e[2]}</td>
                                    <td>{e[3]}</td>
                                    <td>{e[4]}</td>
                                    <td><input type="button"
                                        value={"Delete"}
                                        onClick={() => {
                                            let prx = [...daftarMesinAsli];
                                            let shit = [];
                                            prx = prx.forEach((ex,ie) => {
                                                if (i == ie) {
                                                    
                                                } else {
                                                    shit.push(ex);
                                                }
                                            })
                                            
                                            setDaftarMesinAsli(shit);
                                        }}
                                    ></input></td>
                                </tr>);
                            })}
                        </table>



                        <br></br>
                        <div id="anjinglah" hidden={true}>
                        <label for='jenisMesin'>Jenis Mesin</label>
                        <input type='text' id='jenisMesin'
                            onChange={(e) => {
                                var p = [...daftarMesin];
                                p[0] = e.target.value;
                                setDaftarMesin(p);
                            }}
                        value={daftarMesin[0]}
                        ></input><br></br>
                        <label for='spesifikasi'>Spesifikasi / Merk / Negara</label>
                        <input type='text' id='spesifikasi'
                            onChange={(e) => {
                                var p = [...daftarMesin];
                                p[1] = e.target.value;
                                setDaftarMesin(p);
                            }}
                        value={daftarMesin[1]}
                        ></input><br></br>
                        <label for='kapasitasProduksi'>Kapasitas Produksi</label>
                        <input type='text' id='kapasitasProduksi'
                            onChange={(e) => {
                                var p = [...daftarMesin];
                                p[2] = e.target.value;
                                setDaftarMesin(p);
                        }}
                        
                        value={daftarMesin[2]}
                        ></input><br></br>
                        <label for='jumlahUnit'>Jumlah Unit</label>
                        <input type='text' id='jumlahUnit'
                            onChange={(e) => {
                                var p = [...daftarMesin];
                                p[3] = e.target.value;
                                setDaftarMesin(p);
                            }}
                        value={daftarMesin[3]}
                        ></input><br></br>
                        <label for='keterangan'>Keterangan</label>
                        <input type='text' id='keterangan'
                            onChange={(e) => {
                                var p = [...daftarMesin];
                                p[4] = e.target.value;
                                setDaftarMesin(p);
                        }}
                        value={daftarMesin[4]}
                        ></input><br></br>
                            <input type="button"
                                onClick={() => {
                                    document.getElementById("anjinglah").hidden = true;
                                }}
                                value={"Cancel"}
                            ></input>
                            <input type="button"
                                onClick={() => {
                                    document.getElementById("anjinglah").hidden = true;
                                    let p = daftarMesinAsli;
                                    p.push(daftarMesin);
                                    setDaftarMesinAsli(p);
                                    setDaftarMesin(["", "", "", "", ""]);
                                    setHalaman3(halaman3 + 1);
                                }}
                                value={"Save"}
                            ></input>
                        </div>

                <label for='sumber'>Sumber Bahan Baku</label>
                <input type='text' id='sumber'
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                sumber_bahan:e.target.value
                            }
                        })
                    }}
                ></input><br></br>
                <label for='totalInvestasi'>Total Investasi</label>
                <input type='text' id='totalInvestasi'
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                total_investasi:Number(e.target.value)
                            }
                        })
                    }}></input><br></br>
                <label for='statusPenanamanModal'>Status Penanaman Modal</label>
                <input type='text' id='statusPenanamanModal'
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                status_permohonan:e.target.value
                            }
                        })
                    }}></input><br></br>
                <label for='jumlahTenagaKerja'>Jumlah Tenaga Kerja</label>
                <input type='text' id='jumlahTenagaKerja'
                    onChange={(e) => {
                        state.data.setState({
                            Perusahaan: {
                                ...state.data.state.Perusahaan,
                                jumlah_tenaga_kerja:Number(e.target.value)
                            }
                        })
                        }}></input>
                </div>
                <div hidden={halaman==2?false:true}>

               
                
                {   
                    dokumenFile.map((ae, i) => {
                    if (state.data.state.dokumenFile[ae].bol) {
                        return (
                            <div id="dokumen">
                                <div>
                                <button><img src={logo}></img></button>
                                <input type="button" value={"Delete"} id={ae} onClick={(e)=>state.data.setState({dokumenFile:{...state.data.state.dokumenFile,[e.target.id]:{file:[],bol:false}}})}></input>
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
                                        console.log([e.target.id]);
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
                {/* {viewpdf()};   */}
                <input type="button" onClick={submit} value={"Submit"}></input>
            <input type="button" onClick={()=>viewpdf()} value={"Cancel"}></input>
                    <input type="button" onClick={duh2} value={"Save"}></input>
                </div>
                <input type="button" onClick={() => {
                    setHalaman(halaman - 1);
                }} value={"Prev"}
                    hidden={halaman==0?true:false}
                ></input>
                <input type="button" onClick={() => {
                    setHalaman(halaman+1);
                    }} value={"Next"} hidden={halaman==2?true:false}></input>
                <br />
                {halaman1}
                <br />
                {halaman2}
            </form>
        </Fragment>
    )
}

export default CreateSkalaBesar;