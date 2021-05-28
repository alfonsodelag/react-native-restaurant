import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import { FirebaseContext } from '../../firebase';
import Platillo from '../ui/Platillo';

function Menu() {

    // Definir el State para los platillos
    const [platillos, guardarPlatillos] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    // Consultar la base de datos al cargar
    useEffect(() => {
        const obtenerPlatillos = async () => {
            const resultado = await firebase.db.collection("productos").onSnapshot(manejarSnapshot)
        }
        obtenerPlatillos();
    }, [])

    // onSnapShot nos permite utilizar (por ejemplo hacer un llamado "get") la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const platillos = snapshot.docs.map(doc => {
            return {
                // ! Necesitamos el id porque necesitamos que tengamos un Key
                id: doc.id,
                // Tomamos una copia del documento actual
                ...doc.data()
            }
        });

        guardarPlatillos(platillos);
    }

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Menu</h1>
            <Link to="/nuevo-platillo" className="bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">Agregar Platillo</Link>
            {platillos.map(platillo => (

                <Platillo
                    key={platillo.id}
                    platillo={platillo}
                />
            ))}
        </>
    )
}

export default Menu
