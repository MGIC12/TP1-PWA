import React, {useState} from 'react';
import styles from "./BarraBusqueda.module.css";
import Boton from "../Boton/Boton";

export default function BarraBusqueda( {onSearch} ){
    const [query, setQuery] = useState("");
    
    const manejoSubmit= (e) => {
        e.preventDefault();
        onSearch(query);
    };
    
    return(
        <form className={styles.formularioBusqueda} onSubmit={manejoSubmit}>
            <input className={styles.inputBusqueda} type="text" placeholder= "Buscar" value= {query} onChange= { (e) => setQuery(e.target.value) }/>
            <Boton texto="Buscar" type="submit"/>
        </form>
    )
}