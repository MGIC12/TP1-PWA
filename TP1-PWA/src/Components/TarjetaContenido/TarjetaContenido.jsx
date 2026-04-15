import React from "react";
import styles from "./TarjetaContenido.module.css";
import Etiqueta from "../Etiqueta/Etiqueta";
import Boton from "../Boton/Boton";

export default function TarjetaContenido({
  objContenido,
  onDelete,
  //   onEdit,
  onCambiarEstado,
}) {
  const estado = objContenido.estado; // "vista" o "por-ver"

  return (
    <div className={styles.TarjetaContenido}>
      <div className={styles.contenedor}>
        <div>
          {/* Título y Año en la misma línea */}
          <div className={styles.encabezado}>
            <h3>
              {objContenido.titulo}
              <span className={styles.anio}> -({objContenido.anio})-</span>
            </h3>
          </div>

          {/* Director justo abajo del título */}
          <p className={styles.director}>
            Dirigido por {objContenido.director}
          </p>

          {/* Etiquetas de género */}
          <div className={styles.generos}>
            <Etiqueta nombre={objContenido.genero} />
          </div>
        </div>
        <div className={styles.acciones}>
          <Boton
            className={styles.btnBorrar}
            onClick={() => onDelete(objContenido.id, estado)}
          />

          <Boton
            className={styles.btnEditar}
            // onClick={() => onEdit(objContenido)}
          />

          <Boton
            className={estado === "vista" ? styles.btnVista : styles.btnPorVer}
            onClick={() => onCambiarEstado(objContenido.id, estado)}
          />
        </div>
      </div>
      {/* Rating y Tipo en la base de la tarjeta */}
      <div className={styles.infoInferior}>
        <p className={styles.rating}>
          <svg
            className={styles.svg}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#ffae00"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
          </svg>
          {objContenido.rating}/10
        </p>
        <p className={styles.tipo}>{objContenido.tipo}</p>
      </div>
    </div>
  );
}
