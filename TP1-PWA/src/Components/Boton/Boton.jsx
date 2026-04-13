import React from "react";
import styles from "./Boton.module.css";

// export default function Boton( {texto, onClick} ) {
//     return (
//         <button onClick={onClick} className={styles.boton}>
//             {texto}
//         </button>
//     )
// }

// Cambios sugeridos para el componente Boton, para mejorar su reutilizabilidad y mantenibilidad:
export default function Boton({ texto, className, ...props }) {
  // Concatenamos la clase base del botón con la clase extra (si existe)
  const clasesCombinadas = `${styles.boton} ${className || ""}`.trim();

  return (
    <button className={clasesCombinadas} {...props}>
      {texto}
    </button>
  );
}
