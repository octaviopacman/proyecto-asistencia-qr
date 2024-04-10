import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function RegistroNuevo() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();

    const style = {
    error: {
      color: "red",
      fontSize:'11px'
    }
  };

  const onSubmit = (data) => {
    
    console.log("Inicio de Sesion");
    
    
    console.log(JSON.stringify(data));


    axios.post('http://localhost:8000/profesores', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Success:', response.data);
        // Aquí podrías redirigir al usuario o limpiar el formulario
    })
    .catch(error => {
        console.error('Error:', error);
        // Aquí podrías informar al usuario del error
    });
    }

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Nombre">
          <h4>NOMBRE:</h4>
          <input
            type="text"
            id="Nombre"
            {...register("Nombre", 
            { required: true,
                 minLength: 3,
                  maxLength: 25,
                  pattern: /^[A-Za-z]+$/,
                })}
            onChange={() => trigger("Nombre")}
          />
          {errors.Nombre && errors.Nombre.type === "minLength" && (
            <p style={style.error}>El nombre es demasiado corto (mínimo 3 caracteres).</p>
          )}
          {errors.Nombre && errors.Nombre.type === "maxLength" && (
            <p style={style.error}>Ingrese un nombre válido.</p>
          )}
          {errors.Nombre && errors.Nombre.type === "pattern" && (
    <p style={style.error}>Ingrese solo letras en el nombre.</p>
  )}
  {errors.Nombre && errors.Nombre.type === "maxLength" && (
            <p style={style.error}>Ingrese un nombre mas corto.</p>
          )}
         
     
        </label>
        <br />

        <label htmlFor="Apellido">
          <h4>APELLIDO:</h4>
          <input
            type="text"
            id="Apellido"
            {...register("Apellido", { required: true,
                minLength: 3,
                maxLength: 25,
                pattern: /^[A-Za-z]+$/,
            })}
          onChange={() => trigger("Apellido")}
          />
           {errors.Apellido && errors.Apellido.type === "minLength" && (
            <p style={style.error}>El apellido es demasiado corto (mínimo 3 caracteres).</p>
          )}
          {errors.Apellido && errors.Apellido.type === "maxLength" && (
            <p style={style.error}>Ingrese un apellido mas corto.</p>
          )}
          {errors.Apellido && errors.Apellido.type === "required" && (
    <p style={style.error}>El apellido es requerido.</p>
  )}
  {errors.Apellido && errors.Apellido.type === "pattern" && (
    <p style={style.error}>Ingrese solo letras en el apellido.</p>
  )}
        </label>
        <br />

        <label htmlFor="Telefono">
          <h4>TELEFONO:</h4>
          <input
            type="tel"
            id="Telefono"
            {...register("Telefono",{required:true,
                pattern: /^[0-9]+$/,
            minLength:10})}
            placeholder="ej: 1123456789"
            onChange={() => trigger("Telefono")}
          />
          {errors.Telefono && errors.Telefono.type === "pattern" && (
    <p style={style.error}>Ingrese solo números en el telefono.</p>
  )}
           {errors.Telefono && errors.Telefono.type === "minLength" && (
            <p style={style.error}>El numero de telefono es demasiado corto (mínimo 10 caracteres).</p>
          )}
           {errors.Telefono && errors.Telefono.type === "required" && (
    <p style={style.error}>El telefono es requerido.</p>
  )}
        </label>
        <br />

        <label htmlFor="Domicilio">
          <h4>DOMICILIO:</h4>
          <input
            type="text"
            id="Domicilio"
            {...register("Domicilio",{required:true})}
            onChange={() => trigger("domicilio")}
          />
           {errors.Domicilio && errors.Domicilio.type === "required" && (
    <p style={style.error}>El Domicilio es requerido.</p>
  )}
        </label>
        <br />

        <label htmlFor="Correo">
          <h4>CORREO:</h4>
          <input
            type="email"
            id="Correo"
            {...register("Correo",{required:true,
            pattern:/@/ // Verificar que al menos un símbolo '@' esté presente
        })}
            onChange={() => trigger("correo")}
          />
           {errors.Correo && errors.Correo.type === "required" && (
              <p style={style.error}>El Correo es requerido.</p>
           )}
           {errors.Correo && errors.Correo.type === "pattern" && (
              <p style={style.error}>Ingrese un correo válido (debe contener '@').</p>
           )}
        </label>
        <br />

        <label htmlFor="DNI">
  <h4>DNI:</h4>
  <input
    type="text"
    id="DNI"
    {...register("DNI", { 
      required: true,
      pattern: /^[0-9]+$/, // Expresión regular para permitir solo números
      minLength: 8,
      maxLength: 9,
      
    })}
    onChange={() => trigger("DNI")}
  />
  {errors.DNI && errors.DNI.type === "required" && (
    <p style={style.error}>El DNI es requerido.</p>
  )}
  {errors.DNI && errors.DNI.type === "pattern" && (
    <p style={style.error}>Ingrese solo números en el DNI.</p>
  )}
   {errors.DNI && errors.DNI.type === "minLength" && (
    <p style={style.error}>El DNI debe tener como minimo 8 caracteres.</p>
  )}
  {errors.DNI && errors.DNI.type === "maxLength" && (
    <p style={style.error}>El DNI debe tener como maximo 9 caracteres.</p>
  )}
</label>
<br />


        <label htmlFor="Contrasena">
          <h4>CONTRASEÑA:</h4>
          <input
            type="password"
            id="ContrasenaHash"
            {...register("ContrasenaHash",{required:true,
            minLength:8})}
            onChange={() => trigger("ContrasenaHash")}
          />
           {errors.Contrasena && errors.Contrasena.type === "required" && (
    <p style={style.error}>La contraseña es requerida.</p>
  )}
  {errors.Contrasena && errors.Contrasena.type === "minLength" && (
    <p style={style.error}>La contraseña debe tener 8 caracteres minimos.</p>
  )}
        </label>
        <br />

        <input type="submit" />
      </form>
    </div>
  );
}
