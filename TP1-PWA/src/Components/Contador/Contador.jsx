import React from "react";
import styles from "./Contador.module.css";

export default function Contador({lista, items = []}) {
    const totalLista= items.length;

    //Agrupo por género
    const conteoPorGenero = items.reduce((acc, item) => {
        acc[item.genero] = (acc[item.genero] || 0) +1;
        return acc;
    }, {});

    const generos = Object.entries(conteoPorGenero); //[ ["accion",2] , ["drama",1] ...]
    return (
        <div className={styles.contenedor}>
            <h3 className= {styles.titulo}>Resumen: {lista}</h3>
            <p className= {styles.total}>Total: {totalLista}</p>

            {generos.length === 0 ? (
                <p className={styles.empty}>No hay contenido</p>
            ) : (
                <ul className={styles.lista}>
                    {generos.map(([genero, cantidad]) => (
                        <li key={genero} className={styles.item}>
                            <span className={styles.genero}>{genero}</span>
                            <span className={styles.valor}>{cantidad}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}