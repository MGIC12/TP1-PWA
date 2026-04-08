import React from "react";
import "./Boton.css";

export default function Boton(texto, onClick, tipo= "button") {
  return (
    <button className="boton" onClick={onClick} type={tipo}>
      {texto}
    </button>
  );
}