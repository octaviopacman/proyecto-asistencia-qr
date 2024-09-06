'use client'
import React, { useEffect, useState } from 'react';

const CrudHorarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [form, setForm] = useState({
    ProfesorID: '',
    CursoID: '',
    MateriaID: '',
    Dia: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const apiUrl = 'http://localhost:8000/horarios'; // URL de la API para los horarios

  // Obtener todos los horarios del backend cuando el componente se monta
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setHorarios(data))
      .catch((error) => console.error('Error al obtener horarios:', error));
  }, []);

  // Manejadores de formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar el formulario (agregar o editar horario)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Actualizar un horario existente
      fetch(`${apiUrl}/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar la lista de horarios en el frontend
          setHorarios((prev) =>
            prev.map((horario) => (horario.HorarioID === currentId ? data : horario))
          );
          setIsEditing(false);
          setCurrentId(null);
        })
        .catch((error) => console.error('Error al actualizar horario:', error));
    } else {
      // Agregar un nuevo horario
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then((data) => {
          setHorarios([...horarios, data]);
        })
        .catch((error) => console.error('Error al agregar horario:', error));
    }

    // Limpiar formulario
    setForm({
      ProfesorID: '',
      CursoID: '',
      MateriaID: '',
      Dia: '',
    });
  };

  // Función para eliminar un horario
  const handleDelete = (id) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Actualizar la lista de horarios en el frontend
        setHorarios(horarios.filter((horario) => horario.HorarioID !== id));
      })
      .catch((error) => console.error('Error al eliminar horario:', error));
  };

  // Función para editar un horario
  const handleEdit = (id) => {
    const horarioToEdit = horarios.find((horario) => horario.HorarioID === id);
    setForm(horarioToEdit);
    setCurrentId(id);
    setIsEditing(true);
  };

  return (
    <div className="container">
      <h1 className="my-4">Gestión de Horarios</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Profesor ID</label>
            <input
              type="text"
              name="ProfesorID"
              className="form-control"
              value={form.ProfesorID}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Curso ID</label>
            <input
              type="text"
              name="CursoID"
              className="form-control"
              value={form.CursoID}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Materia ID</label>
            <input
              type="text"
              name="MateriaID"
              className="form-control"
              value={form.MateriaID}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Día</label>
            <input
              type="text"
              name="Dia"
              className="form-control"
              value={form.Dia}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Actualizar Horario' : 'Agregar Horario'}
        </button>
      </form>

      {/* Lista de Horarios */}
      <h2 className="my-4">Lista de Horarios</h2>
      {horarios.length === 0 ? (
        <p>No hay horarios registrados.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Profesor ID</th>
              <th>Curso ID</th>
              <th>Materia ID</th>
              <th>Día</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario) => (
              <tr key={horario.HorarioID}>
                <td>{horario.ProfesorID}</td>
                <td>{horario.CursoID}</td>
                <td>{horario.MateriaID}</td>
                <td>{horario.Dia}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(horario.HorarioID)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(horario.HorarioID)}
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

export default CrudHorarios;
