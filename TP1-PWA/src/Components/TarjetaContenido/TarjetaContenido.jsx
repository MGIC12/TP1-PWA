import React from 'react'
import styles from "./TarjetaContenido.module.css"
import Etiqueta from '../Etiqueta/Etiqueta'

export default function TarjetaContenido({ objContenido }) {
    const generos = objContenido.colGeneros.map((genero) => {
        return (<Etiqueta key={genero} nombre={genero}></Etiqueta>);
    });

    return (
        <div className={styles.TarjetaContenido}>
            <div className={styles.contenedor}>

                <div>

                    {/* Título y Año en la misma línea */}
                    <div className={styles.encabezado}>
                        <h3>
                            {objContenido.titulo} 
                            <span className={styles.anio}>  -({objContenido.anio})-</span>
                        </h3>
                    </div>

                    {/* Director justo abajo del título */}
                    <p className={styles.director}>Dirigido por {objContenido.director}</p>

                    {/* Etiquetas de género */}
                    <div className={styles.generos}>
                        {generos}
                    </div>

                </div>
                <div className={styles.acciones}>
                    <button className={styles.btnBorrar} title="Borrar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7h16" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /><path d="M10 12l4 4m0 -4l-4 4" /></svg>
                    </button>
                    <button className={styles.btnEditar} title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
                    </button>
                    <button className={styles.btnVisto} title="Marcar como visto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                    </button>
                </div>
            </div>
                {/* Rating y Tipo en la base de la tarjeta */}
            <div className={styles.infoInferior}>
                    <p className={styles.rating}>
                        <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffae00">
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
