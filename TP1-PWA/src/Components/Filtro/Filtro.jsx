import React from 'react'
import styles from "./Filtro.module.css"
import Boton from '../Boton/Boton'
import BarraBusqueda from '../BarraBusqueda/BarraBusqueda'
import BotonFiltro from '../BotonFiltro/BotonFiltro'

export default function Filtro({ onToggleGenero, seleccionados, onToggleTipo, tiposSeleccionados, setSearchQuery, setOrden, ordenActual }) {
  const tipos = ["pelicula", "serie"];
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

      <div className={styles.orderWrapper}>
        <label htmlFor="orden">Ordenar por: </label>
        <select 
          id="orden"
          className={styles.selectOrden} 
          value={ordenActual} 
          onChange={(e) => setOrden(e.target.value)}
        >
          <option value="abc">Abecedario (A-Z)</option>
          <option value="anio-asc">Año (Más antiguo)</option>
          <option value="anio-desc">Año (Más reciente)</option>
          <option value="rating-asc">Rating (Menor a mayor)</option>
          <option value="rating-desc">Rating (Mayor a menor)</option>
        </select>
      </div>
      
    </div>
  );
}
