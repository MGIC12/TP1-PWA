import React from 'react';
import styles from './Boton.module.css';

export default function Boton( {texto, onClick, tipo="button"} ) {
    return (
        <button type={tipo} onClick={onClick} className={styles.boton}>
            {texto}
        </button>
    )
}