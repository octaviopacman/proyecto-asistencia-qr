import axios from 'axios'
import { useState, useEffect } from 'react'

const URI = 'http://localhost:8001/blogs'

const CompShowBlogs = () => {
    const [blogs, setBlog] = useState([]);
    useEffect( () => {
        getBlogs();
    },[])

    const getBlogs = async () => {
        const res = await axios.get(URI);
        setBlog(res.data)
    }

    const deleteBlog =  async(id) => {
        axios.delete(`${URI}${id}`);
        getBlogs();
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>DNI</th>
                                <th>Telefono</th>
                                <th>Correo</th>
                                <th>Direccion</th>
                                <th>Contrasena</th>
                            </tr>
                        </thead>
                        <tbody>
                            { blogs.map ( (blog) => (
                                <tr key={blog.id}>
                                    <td>{blog.id}</td>
                                    <td> {blog.Nombre} </td>
                                    <td> {blog.Apellido} </td>
                                    <td> {blog.DNI} </td>
                                    <td> {blog.Telefono} </td>
                                    <td> {blog.Correo} </td>
                                    <td> {blog.Domicilio} </td>
                                    <td> {blog.ContrasenaHash} </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )

}
export default CompShowBlogs;