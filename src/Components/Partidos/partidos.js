import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDadosAbertos } from '../../helpers';

import "../Partidos/partidos.css";
import { file } from "@babel/types";

const Partidos = (props) => {
  const {
      params,
      prevPage,
      setParam,
      lastPage,
      nextPage,
      firstPage,
      data: partidos,
  } = useDadosAbertos('partidos', {
          ordenarPor: 'nome',
      },
  );

  return (
      <div className="partidos-lista">
          <div className="partidos-ordenacao">
            <strong>Ordernar por</strong>
            <div className="buttons">
              <div>
                <button onClick={() => setParam('ordenarPor', 'id')}>Id</button>
                <button onClick={() => setParam('ordenarPor', 'sigla')}>Sigla</button>
                <button onClick={() => setParam('ordenarPor', 'nome')}>Nome</button>
              </div>
              <div>
                <button onClick={() => setParam('ordenarPor', 'dataInicio')}>Data de inicio</button>
                <button onClick={() => setParam('ordenarPor', 'dataFim')}>Data de fim</button>
              </div>
            </div>
          </div>
          { partidos.map(partido => (
              <article key={ partido.id } >
                  <strong>{ partido.nome } - { partido.sigla }</strong>
                  <br></br>
                  <Link to={ "/partido/"+partido.id }>Ver Detalhes</Link>
              </article>
          )) }
          <div className="partidos-buttons">
                <button disabled={params.pagina <= firstPage} onClick={prevPage} >Anterior</button>
                <button disabled={params.pagina >= lastPage} onClick={nextPage} >Próxima</button>
          </div>
      </div>
  ) 
}

export default Partidos;
