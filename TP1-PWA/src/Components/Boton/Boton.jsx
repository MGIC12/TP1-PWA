import React from 'react';
import './Boton.css';

export default function Boton(texto, onClick, tipo="button") {
    return (
        <button type={tipo} onClick={onClick} className={styles.boton}>
            {texto}
        </button>
    )
}