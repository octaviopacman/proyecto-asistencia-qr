'use client'
import React, { useEffect, useState } from 'react';

const CrudMaterias = () => {
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({
    NombreMateria: '',
    Horario: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const apiUrl = 'https://backend-asistencia-qr.vercel.app/api/materias'; // URL de la API para las materias

  // Obtener todas las materias del backend cuando el componente se monta
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMaterias(data))
      .catch((error) => console.error('Error al obtener materias:', error));
  }, []);

  // Manejadores de formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar el formulario (agregar o editar materia)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Actualizar una materia existente
      fetch(`${apiUrl}/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar la lista de materias en el frontend
          setMaterias((prev) =>
            prev.map((materia) => (materia.MateriaID === currentId ? data : materia))
          );
          setIsEditing(false);
          setCurrentId(null);
        })
        .catch((error) => console.error('Error al actualizar materia:', error));
    } else {
      // Agregar una nueva materia
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then((data) => {
          setMaterias([...materias, data]);
        })
        .catch((error) => console.error('Error al agregar materia:', error));
    }

    // Limpiar formulario
    setForm({
      NombreMateria: '',
      Horario: '',
    });
  };

  // Función para eliminar una materia
  const handleDelete = (id) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Actualizar la lista de materias en el frontend
        setMaterias(materias.filter((materia) => materia.MateriaID !== id));
      })
      .catch((error) => console.error('Error al eliminar materia:', error));
  };

  // Función para editar una materia
  const handleEdit = (id) => {
    const materiaToEdit = materias.find((materia) => materia.MateriaID === id);
    setForm(materiaToEdit);
    setCurrentId(id);
    setIsEditing(true);
  };

  return (
    <div className="container">
      <h1 className="my-4">Gestión de Materias</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Nombre de la Materia</label>
            <input
              type="text"
              name="NombreMateria"
              className="form-control"
              value={form.NombreMateria}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Horario</label>
            <input
              type="text"
              name="Horario"
              className="form-control"
              value={form.Horario}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Actualizar Materia' : 'Agregar Materia'}
        </button>
      </form>

      {/* Lista de Materias */}
      <h2 className="my-4">Lista de Materias</h2>
      {materias.length === 0 ? (
        <p>No hay materias registradas.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Horario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.MateriaID}>
                <td>{materia.NombreMateria}</td>
                <td>{materia.Horario}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(materia.MateriaID)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(materia.MateriaID)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CrudMaterias;
