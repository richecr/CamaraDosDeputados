import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../Partidos/partidos.css";

const Partidos = (props) => {
  const [partidos, setPartidos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async (page) => {
      const response = await axios.get("https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=nome&pagina=" + page + "&itens=20");
      const { dados } = response.data;

      setPartidos(dados);
      setPage(page);
  }

  useEffect(() => {
    fetchData(page)
  }, [page]);

  const prevPage = () => {
    if (page === 1) return;

    const pageNumber = page - 1;
    setPage(pageNumber);
  }

  const nextPage = () => {
    if (page === 2) return;

    const pageNumber = page + 1;
    setPage(pageNumber);
  }

  return (
      <div className="partidos-lista">
          { partidos.map(partido => (
              <article key={ partido.id } >
                  <strong>{ partido.nome } - { partido.sigla }</strong>
                  <br></br>
                  <Link to={ "/partido/"+partido.id }>Ver Detalhes</Link>
              </article>
          )) }
          <div>
              <button disabled={ page === 1 } onClick={ prevPage } >Anterior</button>
              <button disabled={ page === 2 } onClick={ nextPage } >Próxima</button>
          </div>
      </div>
  )
}

export default Partidos;
