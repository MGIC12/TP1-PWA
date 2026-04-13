import React from "react";
import styles from "./Contador.module.css";

import Etiqueta from "../Etiqueta/Etiqueta";

export default function Contador({ titulo, items = [] }) {
  const total = items.length;

  const conteoPorGenero = items.reduce((acumulador, item) => {
    const genero = item.genero || "Otro";
    acumulador[genero] = (acumulador[genero] || 0) + 1;
    return acumulador;
  }, {});

  const conteoPorTipo = items.reduce((acumulador, item) => {
    const tipo =
      item.tipo === "pelicula"
        ? "Película"
        : item.tipo === "serie"
          ? "Serie"
          : "Otro";
    acumulador[tipo] = (acumulador[tipo] || 0) + 1;
    return acumulador;
  }, {});

  return (
    <div className={styles.contadorContainer}>
      <div className={styles.headerPrincipal}>
        <h2 className={styles.titulo}>{titulo}</h2>
        <span className={styles.badgeTotal}>{total}</span>
      </div>

      {total > 0 && (
        <div className={styles.estadisticasContainer}>
          <div className={styles.grupoBadges}>
            {Object.entries(conteoPorTipo).map(([tipo, cantidad]) => (
              /* 2. Reutilizamos la Etiqueta pasándole el texto combinado */
              <Etiqueta key={tipo} nombre={`🎬 ${tipo}: ${cantidad}`} />
            ))}
          </div>

          <div className={styles.grupoBadges}>
            {Object.entries(conteoPorGenero).map(([genero, cantidad]) => (
              /* 3. Reutilizamos la Etiqueta para los géneros */
              <Etiqueta key={genero} nombre={`${genero}: ${cantidad}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
