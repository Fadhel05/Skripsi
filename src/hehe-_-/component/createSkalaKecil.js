import { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";
import FileSaver from "file-saver";
import { Document } from "react-pdf";
import { Auth } from "../authzzz/auth";
import logo from "../../img/Untitled.png"
import { useNavigate } from "react-router-dom";
function CreateSkalaKecil(state) {
    const [jenisProduk, setJenisProduk] = useState(["", "", "", "", ""]);
    const [daftarMesin, setDaftarMesin] = useState(["", "", "", "", ""]);
    const [dokumenFile, setDokumenFile] = useState(["a", "b", "c", "d", "e"]);
    const [halaman, setHalaman] = useState(1);
    const navigate = useNavigate()
    async function haduh () {
        await axios.get('http://127.0.0.1:8000/test/').then((data) => {
            

        }
            ).catch((err) =>{
        });
    }
    useEffect(() => {
        if (window.localStorage.getItem("role") != "fd") {
            navigate('/dashboard');
        }
        haduh();
        console.log("conte kecil", bagas.meneketehe);
    },[]) 
    
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
        form.Perusahaan.jenis_produk = jenisProduk;
        form.Perusahaan.daftar_mesin = daftarMesin;
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
    function hehway(ae) {
        const url = window.URL.createObjectURL(state.data.state.dokumenFile[ae].file);
        return (
            <div>
            <iframe src={url} width="100%" height="100%"></iframe>
            <input type="button" onClick={() => {document.getElementById("dokumen"+ae).hidden=true }} value={"cancel"}></input>
            <input type="button" onClick={() => { }} value={"save"}></input>
            </div>
        );
    }
    const bagas = useContext(Auth);
    return (
        <Fragment>
            <form name="form">

                

                <div hidden={halaman==1?false:true}>
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
                ></input><br></br>
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
                    
                ></input>
                <br></br>
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
                ></input>
                
                </div>
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                

                <div hidden={halaman==2?false:true}>
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
                ></input><br></br>
                <label for='jenisMesin'>Jenis Mesin</label>
                <input type='text' id='jenisMesin'
                    onChange={(e) => {
                        var p = [...daftarMesin];
                        p[0] = e.target.value;
                        setDaftarMesin(p);
                    }}
                ></input><br></br>
                <label for='spesifikasi'>Spesifikasi / Merk / Negara</label>
                <input type='text' id='spesifikasi'
                    onChange={(e) => {
                        var p = [...daftarMesin];
                        p[1] = e.target.value;
                        setDaftarMesin(p);
                    }}
                ></input><br></br>
                <label for='kapasitasProduksi'>Kapasitas Produksi</label>
                <input type='text' id='kapasitasProduksi'
                    onChange={(e) => {
                        var p = [...daftarMesin];
                        p[2] = e.target.value;
                        setDaftarMesin(p);
                    }}
                ></input><br></br>
                <label for='jumlahUnit'>Jumlah Unit</label>
                <input type='text' id='jumlahUnit'
                    onChange={(e) => {
                        var p = [...daftarMesin];
                        p[3] = e.target.value;
                        setDaftarMesin(p);
                    }}
                ></input><br></br>
                <label for='keterangan'>Keterangan</label>
                <input type='text' id='keterangan'
                    onChange={(e) => {
                        var p = [...daftarMesin];
                        p[4] = e.target.value;
                        setDaftarMesin(p);
                    }}
                ></input>
                
                </div>
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                <div hidden={halaman==3?false:true}>
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
                    }}></input><br></br>
                
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
                <input type="button" hidden={halaman == 1 ? true : false} onClick={() => {
                    setHalaman(halaman - 1);
                }} value={"Prev"}></input>
                <input type="button" hidden={halaman == 3 ? true : false} onClick={() => {
                    setHalaman(halaman + 1);
            }} value={"Next"}></input>
            </form>
        </Fragment>
    )
}

export default CreateSkalaKecil;