import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Paginacao = ({ pagina, firstPage, lastPage, prevPage, nextPage }) => (
  <div className="pagination-buttons">
    <button type="button" disabled={pagina <= firstPage} onClick={prevPage}>
      Anterior
    </button>
    <button type="button" disabled={pagina >= lastPage} onClick={nextPage}>
      Próxima
    </button>
  </div>
);

Paginacao.propTypes = {
  pagina: PropTypes.number.isRequired,
  firstPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  prevPage: PropTypes.number.isRequired,
  nextPage: PropTypes.number.isRequired,
};

export default Paginacao;
