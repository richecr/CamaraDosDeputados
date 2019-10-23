import React from "react";

import "./paginacao.scss";

const Paginacao = ({ pagina, firstPage, lastPage, prevPage, nextPage }) => (
  <div className="pagination-buttons">
    <button disabled={pagina <= firstPage} onClick={prevPage}>
      Anterior
    </button>
    <button disabled={pagina >= lastPage} onClick={nextPage}>
      Próxima
    </button>
  </div>
);

export default Paginacao;
