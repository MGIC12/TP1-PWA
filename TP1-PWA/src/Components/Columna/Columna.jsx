import React from "react";
import styles from "./Columna.module.css";
import Contador from "../Contador/Contador";

export default function Columna({  titulo, items =[], renderItem }) {
    return(
        <div className={styles.columna}>
            <h2 className={styles.titulo}>{titulo}</h2>
            {items.length === 0 ? (
                <p className={styles.empty}>No hay contenido</p>
            ) : (
                <>
                <ul className={styles.lista}>
                    {items.map(( item, index ) => (
                        <li key={index} className={styles.item}>
                            {renderItem ? renderItem(item) : item.titulo}
                        </li>
                    ))}
                </ul>
                //Integro contador
                <Contador lista={titulo} items={items}/>
                </>
            )}
        </div>
    );
}