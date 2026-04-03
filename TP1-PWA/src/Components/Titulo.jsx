import React from "react";

export default function Titulo() {
  const text = "Titulo principal del sitio";
  return (
    <h1
      style={{
        color: "black",
        fontSize: "40px",
        textAlign: "center",
        margin: "10px",
        backgroundColor: "lightblue",
      }}
    >
      {text}
    </h1>
  );
}
