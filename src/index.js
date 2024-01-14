import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Fd from './hehe-_-/props';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fdx from './hehe-_-/propseditSkalaKecil';
import Bangke from './hehe-_-/propsCreateSkalaBesar';
import PropsEditSkalaBesar from './hehe-_-/propsEditSkalaBesar';
import PropsListSkalaBesar from './hehe-_-/propsListSkalaBesar';
import { AuthProvider } from './hehe-_-/authzzz/auth';
import { Dashboard } from './hehe-_-/component/dashboard';
import Logins from './hehe-_-/propLogin';
import PropsListSkalaKecil from './hehe-_-/propsLisSkalaKecil';




export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/list/permohonan/skala/besar" element={<PropsListSkalaBesar />}></Route>  
        <Route path="/list/permohonan/skala/kecil" element={<PropsListSkalaKecil />}></Route>
        <Route path="/login" element={<Logins></Logins>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/edit/permohonan/skala/kecil/:id" element={<Fdx />}></Route>
        <Route path="/create/permohonan/skala/kecil" element={<Fd></Fd>}></Route>
        <Route path="/create/permohonan/skala/besar" element={<Bangke></Bangke>}></Route>
        <Route path="/edit/permohonan/skala/besar/:id" element={<PropsEditSkalaBesar></PropsEditSkalaBesar>}></Route>
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
