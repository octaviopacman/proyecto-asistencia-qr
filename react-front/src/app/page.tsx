'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";
import Registro from "./components/registronuevo"
import Login from "./components/login"
import Admin from "./components/admin"
import Asistencias from "./components/admin/asistencias"
import Header from "./components/header"
import { BrowserRouter, Routes, Router, Route, Navigate } from "react-router-dom"

export default function Home() {
  const [estaLogeado, setestaLogeado] = useState(false);


  let contenido;

  //// ARREGLAR


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />}>
          <Route index element={<Admin />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/admin/asistencias" element={<Asistencias />}/>
        </Route>
      </Routes>
    </BrowserRouter>


    </div>
  );
}
