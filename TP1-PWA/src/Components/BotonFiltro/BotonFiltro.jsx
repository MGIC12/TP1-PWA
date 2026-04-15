import React from 'react'
import styles from "./BotonFiltro.module.css"
import { useState } from 'react'

export default function BotonFiltro({ value, onClick, isSelected }) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`${styles.btnFiltro} ${isSelected ? styles.btnSeleccionado : ''}`}
    >
      {value}
    </button>
  );
}

