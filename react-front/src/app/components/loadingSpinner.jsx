"use client"
import React from 'react';
import './loadingSpinner.css';

const LoadingSpinner = () => (
    <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando datos...</p>
    </div>
);

export default LoadingSpinner;
