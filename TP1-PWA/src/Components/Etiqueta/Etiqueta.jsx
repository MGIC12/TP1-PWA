import React from 'react'
import styles from "./Etiqueta.module.css";

export default function Etiqueta({ nombre }) {
  return (
    <div className={styles.etiqueta}>
      <p>{nombre}</p>
    </div>
  )
}
