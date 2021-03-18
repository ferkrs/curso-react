import React, {Component, useState} from 'react'
import uniqid from 'uniqid'

export const ListadoNombres = () => {
    //Estados
    const [nombre, setNombre] = useState('')
    const [listanombres, setListanombres] = useState([])
    const [nombreEdicion, setNombreEdicion] = useState(false)
    const [id, setId]= useState('')
    const [error, setError] = useState(null)
    //Funcion add
    const addNombre= (e) =>{ 
        e.preventDefault()
        if(!nombre.trim()){ 
            setError('Tienes que agregar un nombre!')
            return
        }
        const nuevoNombre={ 
            id:uniqid(),
            identificador:nombre

        }
        setListanombres([...listanombres,nuevoNombre]) 
        setNombre('')
        setError(null)
    }
    //Funcion delete 
    const deleteNombre =(id) =>{ 
        const nuevoArray = listanombres.filter(item => item.id !== id)
        setListanombres(nuevoArray)

    }
    //Funcion edicion
    const editar = (item) =>{
        setNombreEdicion(true)
        setNombre(item.identificador)
        setId(item.id)

    }
    //editar nombre
    const editarNombre = (e) =>{
        e.preventDefault()
        const nuevoArray = listanombres.map(item => item.id === id ? {id:id, identificador:nombre}: item) 
        setListanombres(nuevoArray)
        setNombreEdicion(false)
        setNombre('')
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <h2>Listado de nombres</h2>
                    <ul className="list-group">
                        {
                            listanombres.map(item => 
                                <li  key="{item.id}" className="list-group-item">{item.identificador}
                                    <button 
                                    onClick={()=> {deleteNombre(item.id)}} 
                                    className="btn btn-danger float-right"
                                    > 
                                        Clear
                                    </button>
                                    <button
                                    onClick={()=> {editar(item)}} 
                                    className="btn btn-warning float-right"
                                    >
                                        Editar
                                    </button>
                                </li>
                                
                                )
                        }
                    </ul>
                </div>
                <div className="col">
                <h2>Formulario para agregar nombre</h2>
                    <form className="form-group" onSubmit={nombreEdicion ? editarNombre : addNombre}>
                        <label>Aleck un</label>
                        <input 
                        onChange={(e)=> (setNombre(e.target.value))} 
                        type="text" placeholder="Introduce el nombre" 
                        className="form-control mb-3"
                        value={nombre}
                        />
                        <input 
                        type="submit" 
                        value={nombreEdicion ? 'Editar nombre' :'Registrar nombre'}
                        className="btn btn-success btn-block"/>
                    </form>
                    {
                        error != null ? (
                            <div class="alert alert-danger" role="alert">
                                {error}
                            </div>
                        ): 
                        (
                            <div>  </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default ListadoNombres