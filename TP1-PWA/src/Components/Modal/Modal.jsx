import React from "react";
import styles from "./Modal.module.css";

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} title="Cerrar">
          &times;
        </button>

        <h2>Nuevo Ítem</h2>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label>
            Título:
            <input
              type="text"
              name="titulo"
              placeholder="Ej: Matrix"
              required
            />
          </label>

          <label>
            Director:
            <input
              type="text"
              name="director"
              placeholder="Ej: Hermanas Wachowski"
              required
            />
          </label>

          <div className={styles.row}>
            <label style={{ flex: 1 }}>
              Año:
              <input
                type="number"
                name="anio"
                min="1888"
                placeholder="Ej: 1999"
                required
              />
            </label>

            <label style={{ flex: 1 }}>
              Rating (1-10):
              <input
                type="number"
                name="rating"
                min="1"
                max="10"
                placeholder="1-10"
                required
              />
            </label>
          </div>

          <label>
            Género:
            <select name="genero" required defaultValue="">
              <option value="" disabled>
                Seleccione...
              </option>
              <option value="Accion">Acción</option>
              <option value="Comedia">Comedia</option>
              <option value="Drama">Drama</option>
              <option value="Ciencia Ficcion">Ciencia Ficción</option>
              <option value="Terror">Terror</option>
            </select>
          </label>

          <label>
            Tipo:
            <select name="tipo">
              <option value="pelicula">Película</option>
              <option value="serie">Serie</option>
            </select>
          </label>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              Guardar en la lista
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
