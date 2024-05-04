'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";
import Registro from "./components/registro"
import Login from "./components/login"
import Admin from "./components/admin"
import { BrowserRouter, Routes, Router, Route } from "react-router-dom"

export default function Home() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/registro" element={<Registro />} />

        </Routes>
      </BrowserRouter>


    </div>
  );
}
