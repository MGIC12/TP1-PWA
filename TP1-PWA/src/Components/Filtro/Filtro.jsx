import React from 'react'
import styles from "./Filtro.module.css"
import Boton from '../Boton/Boton'
import BarraBusqueda from '../BarraBusqueda/BarraBusqueda'
import BotonFiltro from '../BotonFiltro/BotonFiltro'

export default function Filtro({ onToggleGenero, seleccionados, onToggleTipo, tiposSeleccionados, setSearchQuery }) {
  const tipos = ["Película", "Serie"];
  const generos = ["Accion", "Comedia", "Drama", "Ciencia Ficcion", "Terror"];

  return (
    <div className={styles.filtro}>
      <div className={styles.searchWrapper}>
        <BarraBusqueda onSearch={(q) => setSearchQuery(q)} />
      </div>
      <div className={styles.btnsTipo}>
        {tipos.map((t) => (
          <BotonFiltro 
            key={t}
            value={t} 
            onClick={onToggleTipo}
            isSelected={tiposSeleccionados.includes(t)} 
          />
        ))}
      </div>
      <p className={styles.divider}></p>
      <div className={styles.btnsGenero}>
        {generos.map((g) => (
          <BotonFiltro 
            key={g}
            value={g} 
            onClick={onToggleGenero}
            isSelected={seleccionados.includes(g)} 
          />
        ))}
      </div>
    </div>
  );
}
