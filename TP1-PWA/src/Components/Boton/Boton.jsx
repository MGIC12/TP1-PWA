import React from 'react';
import styles from './Boton.module.css';

export default function Boton( {texto, onClick} ) {
    return (
        <button onClick={onClick} className={styles.boton}>
            {texto}
        </button>
    )
}