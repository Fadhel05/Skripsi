// import logo from './logo.svg';
import './App.css';
import { Component,Fragment, useState, useEffect } from 'react';
// import fs from 'fs';
import axios from 'axios';
function App() {
    
    let state = {
        namaPelakuUsaha: "",
        myFile: null,
        myFile2:" "
    }
    useEffect(() => {
        // {'Access-Control-Allow-Origin': '*'}
        let reponse = async() => {
             await axios.get('http://127.0.0.1:8000/list/permohonan/skala/kecil').then((data) => { console.log(data); }
            ).catch((err) =>{
                console.log("error", err);
            }); 
            
        }
        let x
        let haduh = async () => {
            await axios.get('http://127.0.0.1:8000/test/').then((data) => { console.log("blob",data,data.blob)}
            ).catch((err) =>{
                console.log("error", err);
        });
        }
        state["namaPelakuUsaha"] = "f";
        reponse();
        haduh();
        // document.getElementById("myFile") = x;
    }
    , []);
    const saveFile = async (blob) => {
        // const formData = new FormData();
 
        // // Update the formData object
        // formData.append(
        //     "myFile",
        //     blob,
        //     blob.name
        // );
 
        // // Details of the uploaded file
 
        // // Request made to the backend api
        // // Send formData object
        // axios.post( formData);
        };
    let submit = async (e) => {
        const obj = {hello: 'world'};
        const blobs = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
        console.log(e, Number('1'),"\n",document.getElementById('myFile').files[0],blobs,document.getElementById("myFile").name,document.getElementById("myFile").value);
        saveFile(document.getElementById('myFile').files[0]);
        console.log("namapelau", state["namaPelakuUsaha"]);
        let forms ={
                "Permohonan":{
                    "id_pegawai" :1,
                    "sub_date":"2023-12-14",
                    "skala" :"Kecil",
                    "status_permohonan":"sdfsa",
                    "readTrue" :false
                },
                "Perusahaan": {
                    "nama_pelakuUsaha":document.getElementById('namaPelakuUsaha').value,
                    "nama_pbphh" :document.getElementById('namaPelakuUsaha').value,
                    "kbli":document.getElementById('namaPelakuUsaha').value,
                    "nib" :document.getElementById('namaPelakuUsaha').value,
                    "npwp" :document.getElementById('namaPelakuUsaha').value,
                    "alamat_kantor":document.getElementById('namaPelakuUsaha').value,
                    "alamat_usaha" :document.getElementById('namaPelakuUsaha').value,
                    "alamat_gudang" :document.getElementById('namaPelakuUsaha').value,
                    "jenis_produk_kecil" :[document.getElementById('namaPelakuUsaha').value,document.getElementById('namaPelakuUsaha').value,document.getElementById('namaPelakuUsaha').value,
                                            document.getElementById('namaPelakuUsaha').value,document.getElementById('namaPelakuUsaha').value],
                    "daftar_mesin_kecil" :[document.getElementById('namaPelakuUsaha').value,document.getElementById('namaPelakuUsaha').value,document.getElementById('namaPelakuUsaha').value,
                                            document.getElementById('namaPelakuUsaha').value,document.getElementById('namaPelakuUsaha').value],
                    "sumber_bahan":document.getElementById('namaPelakuUsaha').value,
                    "total_investasi": Number(document.getElementById('namaPelakuUsaha').value),
                    "status_permohonan" :document.getElementById('namaPelakuUsaha').value,
                    "jumlah_tenaga_kerja":Number(document.getElementById('namaPelakuUsaha').value)
                },
                "Dokumen": [
                    {
                        "nama_dokumen": "fsa",
                        "dataDokumen": "hjkj",
                        "tipe_dokumen" :"Besar",
                        "dokumen_path" :"dokumen path",
                        "kabid_phpl" :false,
                        "kadis" :false,
                        "pb" :false,
                        "read_true": false,
                        "note":null
                    }
                ]

        }
        let formData = new FormData();
        formData.append("dataDokumen", document.getElementById('myFile').files[0]);
        formData.append("namaDokumen", document.getElementById('myFile').value);
        state["myFile2"] = document.getElementById("myFile");
        console.log("file",state["myFile2"]);
        await axios.post('http://127.0.0.1:8000/test/',formData,Headers={"content-type": "multipart/form-data"}).then((data) => { console.log(data); }
            ).catch((err) =>{
                console.log("error", err);
            });
        
    }
    
    let submit1 = () => {
        document.getElementById('name').value = 'hehe';
        console.log(state["myFile2"]);
    }
    return (
      
      <Fragment>
            <form id="formId">
                
                <input type='button' id='submit' onClick={(e)=>submit(e)} value='Submit'></input>
                <input type='button' id='submit' onClick={submit1}></input>

            </form>
    </Fragment>

    /* <form id="loginForm">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>

        <button type="button" onclick="login()">Login</button>
    </form>

    <script>
        function login() {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;

            // Implement logic for checking username and password (e.g., send to server for verification)
            // For demonstration purposes, let's assume a simple check here
            if (username === 'user' && password === 'password') {
                alert('Login successful!');
            } else {
                alert('Invalid username or password. Please try again.');
            }
        }
    </script> */

  );
}

export default App;
