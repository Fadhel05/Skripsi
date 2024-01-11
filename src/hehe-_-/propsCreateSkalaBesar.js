import React,{Fragment} from 'react';
import CreateSkalaBesar from './component/createSkalaBesar';
import { toHaveDisplayValue } from '@testing-library/jest-dom/matchers';
import { useParams, useSearchParams } from "react-router-dom";

class Bangke extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
                Permohonan:{
                    id_pegawai :1,
                    sub_date:"",
                    skala :"Besar",
                    status_permohonan:"hhehe",
                    posisi:"fd",
                    readTrue:false

                },
            Perusahaan: {
                    nama_pelakuUsaha:"",
                    nama_pbphh :"",
                    kbli:"",
                    nib :"",
                    npwp :"",
                    alamat_kantor:"",
                    alamat_usaha :"",
                    alamat_gudang :"",
                    jenis_produk :[],
                    daftar_mesin :[],
                    sumber_bahan:"",
                    total_investasi: null,
                    status_permohonan :"",
                    jumlah_tenaga_kerja:null
                },
                Dokumen: [
                    {
                        nama_dokumen :"surat_permohonan.pdf",
                        tipe_dokumen :"Besar",
                        dokumen_path :"surat_permohonan",
                        read_true: false,
                        note:"null"
                    },
                    {
                        nama_dokumen :"NIB.pdf",
                        tipe_dokumen :"Besar",
                        dokumen_path :"NIB",
                        read_true: false,
                        note:"null"
                    },
                    {
                        nama_dokumen :"dokumen_lingkungan.pdf",
                        tipe_dokumen :"Besar",
                        dokumen_path :"dokumen_lingkungan",
                        read_true: false,
                        note:"null"
                    },
                    {
                        nama_dokumen :"surat_pernyataan_pengelolaan.pdf",
                        tipe_dokumen :"Besar",
                        dokumen_path :"surat_pernyataan_pengelolaan",
                        read_true: false,
                        note:"null"
                    },
                    {
                        nama_dokumen :"pernyataan_oss.pdf",
                        tipe_dokumen :"Besar",
                        dokumen_path :"pernyataan_oss",
                        read_true: false,
                        note:"null"
                    }
            ],
            dokumenFile: {
                a:{
                    file: "",
                    bol:false
                },
                b: {
                    file:"",
                    bol:false
                },
                c: {
                    file:"",
                    bol:false
                },
                d: {
                    file:"",
                    bol:false
                },
                e: {
                    file:"",
                    bol:false
                }
            }
        }
        
    }
    render(){
    return(
        <Fragment>
            <CreateSkalaBesar
                data={this}
                param={this.props}
            ></CreateSkalaBesar>
            
        </Fragment>
    )
    }
}
export default Bangke;