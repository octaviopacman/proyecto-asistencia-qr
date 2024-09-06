import Link from 'next/link';
import React from 'react';

const AdminPage = () => {
  return (
    <div className="container">
      <h1 className="my-4">Panel de Administración</h1>

      <div className="d-grid gap-2">
        <Link href="/admin/profesores" className="btn btn-primary btn-lg">
          Gestión de Profesores
        </Link>
        <Link href="/admin/horarios" className="btn btn-primary btn-lg">
          Gestión de Horarios
        </Link>
        <Link href="/admin/materias" className="btn btn-primary btn-lg">
          Gestión de Materias
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
