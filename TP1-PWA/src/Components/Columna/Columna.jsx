import React from "react";
import styles from "./Columna.module.css";

export default function Columna({  titulo, items =[], renderItem }) {
    return(
        <div className={styles.columna}>
            <h2 className={styles.titulo}>{titulo}</h2>
            {items.length === 0 ? (
                <p className={styles.empty}>No hay contenido</p>
            ) : (
                <ul className={styles.lista}>
                    {items.map(( item, index ) => (
                        <li key={index} className={styles.item}>
                            {renderItem ? renderItem(item) : item.titulo}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}