import React,{Fragment} from 'react';
import CreateSkalaKecil from './component/createSkalaKecil';
import { toHaveDisplayValue } from '@testing-library/jest-dom/matchers';


class Fd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
                Permohonan:{
                    id_pegawai :1,
                    sub_date:"2023-12-14",
                    skala :"Kecil",
                    status_permohonan:"sdfsa",
                    posisi:"fd",
                    readTrue:false

                },
                Perusahaan: {
                    nama_pelakuUsaha:"Fad",
                    nama_pbphh :"nama_pbphh",
                    kbli:"kbli",
                    nib :"nib",
                    npwp :"npwp",
                    alamat_kantor:"alamat_kantor",
                    alamat_usaha :"alamat Usaha",
                    alamat_gudang :"alamat gudang",
                    jenis_produk :["x","y","z","f","f"],
                    daftar_mesin :["x","y","z","f","f"],
                    sumber_bahan:"bahan",
                    total_investasi: 1,
                    status_permohonan :"test",
                    jumlah_tenaga_kerja:1
                },
                Dokumen: [
                    {
                        nama_dokumen :"surat_permohonan.pdf",
                        tipe_dokumen :"Kecil",
                        dokumen_path :"surat_permohonan",
                        read_true: false,
                        note:""
                    },
                    {
                        nama_dokumen :"NIB.pdf",
                        tipe_dokumen :"Kecil",
                        dokumen_path :"NIB",
                        read_true: false,
                        note:""
                    },
                    {
                        nama_dokumen :"dokumen_lingkungan.pdf",
                        tipe_dokumen :"Kecil",
                        dokumen_path :"dokumen_lingkungan",
                        read_true: false,
                        note:""
                    },
                    {
                        nama_dokumen :"surat_pernyataan_pengelolaan.pdf",
                        tipe_dokumen :"Kecil",
                        dokumen_path :"surat_pernyataan_pengelolaan",
                        read_true: false,
                        note:""
                    },
                    {
                        nama_dokumen :"pernyataan_oss.pdf",
                        tipe_dokumen :"Kecil",
                        dokumen_path :"pernyataan_oss",
                        read_true: false,
                        note:""
                    }
            ],
            file2: [],
            dokumenFile: {
                a:{
                    file: "",
                    bol:false,
                    note:""
                },
                b: {
                    file:"",
                    bol:false,
                    note:""
                },
                c: {
                    file:"",
                    bol:false,
                    note:""
                },
                d: {
                    file:"",
                    bol:false,
                    note:""
                },
                e: {
                    file:"",
                    bol:false,
                    note:""
                }
            }
        }
        
    }
    render(){
    return(
        <Fragment>
            <CreateSkalaKecil
                data={this}
            ></CreateSkalaKecil>
            
        </Fragment>
    )
    }
}
export default Fd;